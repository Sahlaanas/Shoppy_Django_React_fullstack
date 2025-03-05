from django.shortcuts import render
from . import serializers
from rest_framework import generics, viewsets, pagination
from .models import Vendor, Product, Customer, Order, OrderItems, Wishlist, CustomerAddress, ProductRating, ProductCategory
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from django.db import IntegrityError
from rest_framework import viewsets
from .models import Order
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.response import Response
from rest_framework import generics, status

# Create your views here.


class VendorList(generics.ListCreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer
    
class ProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination
    
    def get_queryset(self):
        qs = super().get_queryset()
        category_id = self.request.GET.get('category')
        if category_id:  # Ensure category_id is not None
            try:
                category = ProductCategory.objects.get(id=category_id)
                qs = qs.filter(category=category)
            except ObjectDoesNotExist:
                raise NotFound("Category does not exist.")  # Return 404 instead of server error
        else:
            print("No category ID provided in request.")
            
        if 'fetch_limit' in self.request.GET:
            limit=self.request.GET['fetch_limit']
            limit= int(limit)
            qs=qs[:limit]
        return qs
    
class TagProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    pagination_class = pagination.PageNumberPagination
    
    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs
    
class RelatedProductList(generics.ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductListSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        product_id = self.kwargs['pk']
        product = Product.objects.get(id=product_id)
        qs = qs.filter(category=product.category).exclude(id=product_id)
        return qs
    
    
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Product.objects.all()
    serializer_class = serializers.ProductDetailSerializer
    
class CustomerList(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = serializers.CustomerDetailSerializer
    
class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = serializers.UserSerializer
    

    
    
class OrderList(generics.ListCreateAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
    # permission_classes = [permissions.IsAuthenticated]
    def perform_create(self, serializer):
        customer = self.request.data.get("customer")

        if not customer:
            raise serializers.ValidationError({"customer": "Customer ID is required"})

        serializer.save(customer_id=customer)
        
class OrderItemList(generics.ListCreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
  
class CustomerOrderItemList(generics.ListCreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer  
    
    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs
        
    
    
class OrderDetail(generics.ListAPIView):
    # queryset = OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer
    
    def get_queryset(self):
        order_id = self.kwargs['id']
        order = Order.objects.get(id=order_id)
        order_items = OrderItems.objects.filter(order=order)
        return order_items
    
class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.CustomerAdressSerializer
    queryset = CustomerAddress.objects.all()
    
class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = ProductRating.objects.all() 
    
class CategoryList(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]
    
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = serializers.CategoryDetailSerializer
 
@csrf_exempt    
def customer_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        customer = Customer.objects.get(user=user)
        msg={
            'bool' : True,
            'user' : user.username,
            'customer_id' : customer.id
        }
    else:
        msg={
            'bool' : False,
            'msg' : 'Invalid username or password'
        }
    return JsonResponse(msg)

@csrf_exempt    
def customer_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    username = request.POST.get('username')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    password = request.POST.get('password')
    try:
        user = User.objects.create(
            first_name=first_name,
            last_name=last_name,
            username=username,
            email=email,
            password=password
        )
        if user:
            try:
                #Create customer
                customer = Customer.objects.create(
                    user=user,
                    mobile=mobile
                )
                msg={
                    'bool' : True,
                    'user' : user.id,
                    'customer': customer.id,
                    'msg' : 'Thank you for your registration! Please login now!'
                }
            except IntegrityError:
                msg={
                'bool' : False,
                'msg' : 'Mobile already exists!!'
            }
        else:
            msg={
                'bool' : False,
                'msg' : 'Oops....Something went wrong'
            }
    except IntegrityError:
        msg={
                'bool' : False,
                'msg' : 'Username already exists!!'
            }
    return JsonResponse(msg)

@csrf_exempt 
def update_order_status(request,order_id):
    if request.method == 'POST':
        updateResponse = Order.objects.filter(id=order_id).update(order_status=True)
        msg = {
            'bool' : False,
        }
        if updateResponse:
            msg = {
                'bool' : True
            }
    return JsonResponse(msg)

@csrf_exempt 
def update_download_count(request, product_id):
    if request.method =='POST':
        product = Product.objects.get(id=product_id)
        totalDownloads=product.downloads
        totalDownloads=int(totalDownloads)
        totalDownloads += 1
        if totalDownloads == 0:
            totalDownloads = 1
        updateResponse = Product.objects.filter(id=product_id).update(downloads=totalDownloads)
        msg = {
            'bool' : False,
        }
        if updateResponse:
            msg = {
                'bool' : True
            }
    return JsonResponse(msg)

class WishList(generics.ListCreateAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer
    
@csrf_exempt
def check_in_wishlist(request):
    if request.method == 'POST':
        product_id = request.POST.get('product')
        customer_id = request.POST.get('customer')
        checkWishlist=Wishlist.objects.filter(product__id=product_id, customer__id=customer_id).count()
        msg = {
            'bool':False
        }
        if checkWishlist > 0:
            msg={
                'bool' : True
            }
        return JsonResponse(msg)
        
        
class WishItemList(generics.ListAPIView):
    queryset = Wishlist.objects.all()
    serializer_class = serializers.WishlistSerializer
    
    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id)
        return qs
    
@csrf_exempt  
def remove_from_wishlist(request):
    if request.method == 'POST':
        wishlist_id = request.POST.get('wishlist_id')
        response = Wishlist.objects.filter(id=wishlist_id).delete()
        
        msg= {
            'bool': False
        }
        if response:
            msg={
                'bool' : True
            }
    return JsonResponse(msg)
