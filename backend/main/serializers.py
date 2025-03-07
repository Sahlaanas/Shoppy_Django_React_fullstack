from rest_framework import serializers
from .models import Vendor, Product, Wishlist, ProductCategory, Customer, Order, OrderItems, CustomerAddress, ProductRating, ProductImage
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name', 'last_name', 'username', 'email']

class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address', 'profile_img','mobile']
        
    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        
class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vendor
        fields = ['id', 'user', 'address', 'profile_img','mobile']
        
    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        
class ProductListSerializer(serializers.ModelSerializer):
    product_rating = serializers.StringRelatedField(many=True, read_only=True)    
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor', 'title','slug','tag_list', 'details', 'price', 'product_rating',
                  'demo_url', 'image','product_file', 'downloads', 'usd_price']
        
    def __init__(self, *args, **kwargs):
        super(ProductListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
 
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields=['id','product','image']
                
class ProductDetailSerializer(serializers.ModelSerializer):
    product_rating = serializers.StringRelatedField(many=True, read_only=True)
    product_imgs = ProductImageSerializer(many=True, read_only=True)
    class Meta:
        model = Product
        fields = ['id', 'category', 'vendor', 'title','slug', 'details','image', 'price','tag_list', 'product_rating',
                  'product_imgs','demo_url','product_file','downloads','usd_price']
        
    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile', 'profile_img']
        
    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        
class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['id', 'user', 'mobile','customer_orders','profile_img']
        
    def to_representation(self, instance):
        response =  super().to_representation(instance)
        response['user'] = UserSerializer(instance.user).data
        return response
        
        
    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1
        
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = ['id','order_time','customer','order_status','total_amount','total_usd_amount']
        
    def __init__(self, *args, **kwargs):
        super(OrderSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1
        
class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=OrderItems
        fields=['id','order','product','qty','price','usd_price']
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['order'] = OrderSerializer(instance.order).data
        response['product'] = ProductDetailSerializer(instance.product).data
        return response
        
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderItems
        fields = ['id', 'order', 'product']
        
    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1
        
class CustomerAdressSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerAddress
        fields = ['id', 'customer', 'address', 'default_address']
    
    def __init__(self, *args, **kwargs):
        super(CustomerAdressSerializer, self).__init__(*args, **kwargs)
        # Only set depth for GET requests, not for POST
        request = kwargs.get('context', {}).get('request')
        if request and request.method == 'GET':
            self.Meta.depth = 1
        else:
            self.Meta.depth = 0
        
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRating
        fields = ['id', 'customer', 'product', 'rating', 'review', 'add_time']
        
    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1 
        
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'details']
        
    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        
class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = ['id', 'title', 'details']
        
    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
        

class WishlistSerializer(serializers.ModelSerializer):
    class Meta:
        model=Wishlist
        fields = ['id', 'product', 'customer']
        
    def __init__(self,*args,**kwargs):
        super(WishlistSerializer, self).__init__(*args, **kwargs)
        
        
    def to_representation(self, instance):
        response = super().to_representation(instance)
        response['customer'] = CustomerSerializer(instance.customer).data
        response['product'] = ProductDetailSerializer(instance.product).data
        return response