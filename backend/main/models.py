from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify

# Create your models here.

class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(null=True, blank = True)
    
    def __str__(self):
        return self.user.username
    
class ProductCategory(models.Model):
    title = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    
class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, related_name='category_product')
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    details = models.TextField(null=True, blank=True)
    price = models.FloatField()
    slug = models.SlugField(unique=True,null=True,blank=True)
    tags = models.TextField(null=True)
    image = models.ImageField(upload_to='product_imgs/', null=True)
    demo_url = models.URLField(null=True, blank=True)
    
    def __str__(self):
        return self.title
    
    def tag_list(self):
        if self.tags is not None:
            tagList = self.tags.split(',')
            return tagList
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Product, self).save(*args, **kwargs)
    
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField(unique=True)
    
    def __str__(self):
        return self.user.username
    
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_orders')
    order_time = models.DateTimeField(auto_now_add=True)
    
    def __unicode__(self):
        return '%s' % (self.order_time)
    
    
class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    
    def __str__(self):
        return self.product.title
    
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_address')
    address = models.TextField()
    default_address = models.BooleanField(default=False)
    
    def __str__(self):
        return self.address
    
class ProductRating(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_rating')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_rating')
    rating = models.IntegerField()
    review = models.TextField()
    add_time = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f'{self.rating} - {self.review}'
    
class ProductImage(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name='product_imgs')
    image = models.ImageField(upload_to='product_imgs/', null=True)
    
    def __str__(self):
        return self.product.title
    