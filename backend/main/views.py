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
from rest_framework import generics
from django.db.models import Count
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.exceptions import NotFound
from django.contrib.auth.hashers import make_password
# Create your views here.


class VendorList(generics.ListCreateAPIView):
    queryset = Vendor.objects.all()
    serializer_class = serializers.VendorSerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'fetch_limit' in self.request.GET:
            limit=self.request.GET['fetch_limit']
            limit= int(limit)
            qs=qs.annotate(downloads=Count('product')).order_by('-downloads','-id')
            qs=qs[:limit]
        return qs
    
class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Vendor.objects.all()
    serializer_class = serializers.VendorDetailSerializer
    

class VendorProductsList(generics.ListAPIView):
    serializer_class = serializers.ProductListSerializer
    queryset = Product.objects.all()
    
    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['vendor_id']
        qs = qs.filter(vendor__id=vendor_id).order_by('id')
        return qs
    
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
            
        if 'popular' in self.request.GET:
            limit=self.request.GET['popular']
            limit= int(limit)
            qs=qs.order_by('-downloads','-id') 
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
    
class OrderModify(generics.RetrieveUpdateAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderSerializer
  
class CustomerOrderItemList(generics.ListCreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer  
    
    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs
    
class VendorOrderItemList(generics.ListCreateAPIView):
    queryset = OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer  
    
    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs
    
# class VendorDailyReport(generics.ListCreateAPIView):
#     queryset = OrderItems.objects.all()
#     serializer_class=serializers.OrderItemSerializer  
    
#     def get_queryset(self):
#         qs = super().get_queryset()
#         vendor_id = self.kwargs['pk']
#         qs=qs.filter(product__vendor__id=vendor_id).values('order__order_time__date').annotate(Count('id'))
#         return qs
    

class VendorCustomerList(generics.ListAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        qs = qs.distinct('order__customer')
        return qs  
    
class VendorCustomerOrderitemsList(generics.ListAPIView):
    queryset = OrderItems.objects.all()
    serializer_class = serializers.OrderItemSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        vendor_id = self.kwargs['vendor_id']
        customer_id = self.kwargs['customer_id']
        qs=qs.filter(order__customer__id=customer_id,product__vendor__id=vendor_id) 
        return qs   
    
class OrderDetail(generics.ListAPIView):
    # queryset = OrderItems.objects.all()
    serializer_class = serializers.OrderDetailSerializer
    
    def get_queryset(self):
        order_id = self.kwargs['id']
        order = Order.objects.get(id=order_id)
        order_items = OrderItems.objects.filter(order=order)
        return order_items
    
class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = Order.objects.all()
    serializer_class = serializers.OrderDetailSerializer

class CustomerAddAddress(generics.ListCreateAPIView):
    serializer_class = serializers.CustomerAdressSerializer
    queryset = CustomerAddress.objects.all()
    
    def get_serializer_context(self):
        return {'request': self.request}
    


class CustomerAddressList(generics.ListAPIView):
    serializer_class = serializers.CustomerAdressSerializer
    queryset = CustomerAddress.objects.all()
    
    def get_queryset(self):
        qs = super().get_queryset()
        customer_id = self.kwargs['pk']
        qs = qs.filter(customer__id=customer_id)
        return qs
    

class AddressDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = CustomerAddress.objects.all()
    serializer_class = serializers.CustomerAdressSerializer
    

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ProductRatingSerializer
    queryset = ProductRating.objects.all() 
    
class CategoryList(generics.ListCreateAPIView):
    queryset = ProductCategory.objects.all()
    serializer_class = serializers.CategorySerializer
    # permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        qs = super().get_queryset()
        if 'popular' in self.request.GET:
            limit=int(self.request.GET['popular'])
            qs=qs.annotate(downloads=Count('category_product')).order_by('-downloads','-id')
            qs = qs[:limit]
        return qs       
    
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

@csrf_exempt
def mark_default_adress(request,pk):
    if request.method == 'POST':
        address_id = request.POST.get('address_id')
        CustomerAddress.objects.all().update(default_address=False)
        res = CustomerAddress.objects.filter(id=address_id).update(default_address=True)
        msg = {
            'bool' : False
        }
        if res:
            msg = {
                'bool' : True
            }
    return JsonResponse(msg)

def customer_dashboard(request,pk):
    customer_id = pk
    totalAddress = CustomerAddress.objects.filter(customer__id=customer_id).count()
    totalOrders = Order.objects.filter(customer__id=customer_id).count()
    totalWishlist = Wishlist.objects.filter(customer__id=customer_id).count()
    msg = {
            'totalOrders' : totalOrders,
            'totalAddress' : totalAddress,
            'totalWishlist' : totalWishlist,
        }
    return JsonResponse(msg)

def vendor_dashboard(request,pk):
    vendor_id = pk
    totalProducts = Product.objects.filter(vendor__id=vendor_id).count()
    totalOrders = OrderItems.objects.filter(product__vendor__id=vendor_id).count()
    totalCustomers = OrderItems.objects.filter(product__vendor__id=vendor_id).values('order__customer').count()
    msg = {
            'totalOrders' : totalOrders,
            'totalProducts' : totalProducts,
            'totalCustomers' : totalCustomers,
        }
    return JsonResponse(msg)
    
@csrf_exempt
def vendor_register(request):
    first_name = request.POST.get('first_name')
    last_name = request.POST.get('last_name')
    username = request.POST.get('username')
    email = request.POST.get('email')
    mobile = request.POST.get('mobile')
    address = request.POST.get('address')
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
                vendor = Vendor.objects.create(
                    user=user,
                    mobile=mobile,
                    address=address
                )
                msg={
                    'bool' : True,
                    'user' : user.id,
                    'vendor': vendor.id,
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
def vendor_login(request):
    username = request.POST.get('username')
    password = request.POST.get('password')
    user = authenticate(username=username, password=password)
    if user:
        vendor = Vendor.objects.get(user=user)
        msg={
            'bool' : True,
            'user' : user.username,
            'vendor_id' : vendor.id
        }
    else:
        msg={
            'bool' : False,
            'msg' : 'Invalid username or password'
        }
    return JsonResponse(msg)

@csrf_exempt   
def delete_customer_orders(request, customer_id):
    if request.method == 'DELETE':
        orders = Order.objects.filter(customer__id=customer_id).delete()
        msg = {
            'bool' : False
        }
        if orders:
            msg = {
                'bool':True
            }
    return JsonResponse(msg)

@csrf_exempt
def vendor_change_password(request, pk):
    password=request.POST.get('password')
    vendor = Vendor.objects.get(id=pk)
    user = vendor.user
    user.password=make_password(password)
    user.save()
    msg = {
        'bool' : True,
        'msg' : 'Password has been changed'
    }
    return JsonResponse(msg)


@csrf_exempt
def customer_change_password(request, pk):
    password=request.POST.get('password')
    vendor = Customer.objects.get(id=pk)
    user = vendor.user
    user.password=make_password(password)
    user.save()
    msg = {
        'bool' : True,
        'msg' : 'Password has been changed'
    }
    return JsonResponse(msg)
    