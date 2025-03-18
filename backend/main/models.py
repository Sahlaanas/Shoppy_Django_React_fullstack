from django.db import models
from django.contrib.auth.models import User
from django.utils.text import slugify
from django.db.models import Count,Sum
import datetime

# Create your models here.

class Vendor(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    address = models.TextField(null=True, blank = True)
    profile_img = models.ImageField(upload_to='vendor/imgs', null=True)
    mobile = models.PositiveBigIntegerField(unique=True, null=True)
    
    def __str__(self):
        return self.user.username
    
    @property
    def categories(self):
        cats=Product.objects.filter(vendor=self).values('category__title','category__id').order_by('category__title').distinct()
        return cats 
        
    
    @property
    def show_chart_daily_orders(self):
        orders = OrderItems.objects.filter(product__vendor=self).values('order__order_time__date').annotate(count=Count('id'))
        dateList = []
        countList = []
        dataSet = {}
        if orders:
            for order in orders:
                dateList.append(order['order__order_time__date'])
                countList.append(order['count'])
        dataSet = {'dates':dateList, 'count':countList}
        return dataSet
    
    @property
    def show_chart_monthly_orders(self):
        orders = OrderItems.objects.filter(product__vendor=self).values('order__order_time__month').annotate(count=Count('id'))
        dateList = []
        countList = []
        dataSet = {}
        
        if orders:
            for order in orders:
                monthinteger = order['order__order_time__month']
                # Make sure monthinteger is not None before using it
                if monthinteger is not None:
                    month = datetime.date(1900, monthinteger, 1).strftime('%B')
                    dateList.append(month)  # This should now have a valid value
                    countList.append(order['count'])
        
        dataSet = {'dates': dateList, 'count': countList}
        return dataSet
    
    @property
    def show_chart_yearly_orders(self):
        orders = OrderItems.objects.filter(product__vendor=self).values('order__order_time__year').annotate(count=Count('id'))
        dateList = []
        countList = []
        dataSet = {}
        if orders:
            for order in orders:
                dateList.append(order['order__order_time__year'])
                countList.append(order['count'])
        dataSet = {'dates':dateList, 'count':countList}
        return dataSet
    
    @property
    def total_products(self):
        product_count = Product.objects.filter(vendor=self).count()
        return product_count
            
    
class ProductCategory(models.Model):
    title = models.CharField(max_length=100)
    details = models.TextField(null=True, blank=True)
    cat_img = models.ImageField(upload_to='category_img', null=True)
    
    def __str__(self):
        return self.title
    
    @property
    def total_downloads(self):
        totalDownloads=0
        products = Product.objects.filter(category=self)
        for product in products:
            if product.downloads:
                totalDownloads += int(product.downloads)
        return totalDownloads
    
    class Meta:
        verbose_name_plural = 'Product Categories'
    
class Product(models.Model):
    category = models.ForeignKey(ProductCategory, on_delete=models.SET_NULL, null=True, related_name='category_product')
    vendor = models.ForeignKey(Vendor, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=200)
    details = models.TextField(null=True, blank=True)
    price = models.FloatField()
    usd_price=models.DecimalField(max_digits=10, decimal_places=2,default=80)
    slug = models.SlugField(unique=True,null=True,blank=True)
    tags = models.TextField(null=True)
    image = models.ImageField(upload_to='product_imgs/', null=True)
    demo_url = models.URLField(null=True, blank=True)
    product_file = models.FileField(upload_to='product_files/', null=True)
    downloads=models.CharField(max_length=200, default=0, null=True)
    publish_status = models.BooleanField(default=False) 
    
    
    def __str__(self):
        return self.title
    
    def tag_list(self):
        if self.tags is not None:
            tagList = self.tags.split(',')
            return tagList
        
    def calculated_usd_price(self):
        pass
    
    def save(self, *args, **kwargs):
        if self.slug == "" or self.slug == None:
            self.slug = slugify(self.title)
        super(Product, self).save(*args, **kwargs)
    
class Customer(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    mobile = models.PositiveBigIntegerField(unique=True)
    profile_img = models.ImageField(upload_to='customer_imgs/', null=True)
    
    def __str__(self):
        return self.user.username
    
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_orders')
    order_time = models.DateTimeField(auto_now_add=True)
    order_status=models.BooleanField(default=False)
    total_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    total_usd_amount=models.DecimalField(max_digits=10,decimal_places=2,default=0)
    
    def __unicode__(self):
        return '%s' % (self.order_time)
    
    
class OrderItems(models.Model):
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='order_items')
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    qty = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    usd_price = models.DecimalField(max_digits=10, decimal_places=2,default=0)
    
    def __str__(self):
        return self.product.title
    
    class Meta:
        verbose_name_plural = 'Order Items'
    
class CustomerAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='customer_address')
    address = models.TextField()
    default_address = models.BooleanField(default=False)
    
    def __str__(self):
        return self.address
    
    class Meta:
        verbose_name_plural = 'Customer Addresses'
    
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
    
class Wishlist(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    
    def __str__(self):
        return f"{self.product.title}-{self.customer.user.first_name}"
    