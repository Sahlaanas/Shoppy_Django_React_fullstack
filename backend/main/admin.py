from django.contrib import admin
from .models import Vendor, Product, ProductCategory, Customer, Order, OrderItems, CustomerAddress, ProductRating, ProductImage, Wishlist
# Register your models here.


admin.site.register(Vendor)
admin.site.register(ProductCategory)
admin.site.register(Customer)
admin.site.register(CustomerAddress)
admin.site.register(ProductRating) 
admin.site.register(ProductImage)  

class ProductImagesInline(admin.StackedInline):
      model = ProductImage
      
class ProductAdmin(admin.ModelAdmin):
      list_display=['title','price','usd_price'] 
      list_editable = ['usd_price'] 
      inlines = [
            ProductImagesInline,
      ]


admin.site.register(Product,ProductAdmin)

class OrderAdmin(admin.ModelAdmin):
      list_display=['id','customer','order_time','order_status']

admin.site.register(Order, OrderAdmin)

class OrderItemsAdmin(admin.ModelAdmin):
      list_display=['id','order','product','qty','price','usd_price'] 

admin.site.register(OrderItems, OrderItemsAdmin)

class WishlistAdmin(admin.ModelAdmin):
      list_display=['id','product','customer'] 

admin.site.register(Wishlist, WishlistAdmin)
