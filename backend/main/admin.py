from django.contrib import admin
from .models import Vendor, Product, ProductCategory, Customer, Order, OrderItems, CustomerAddress, ProductRating, ProductImage
# Register your models here.


admin.site.register(Vendor)
admin.site.register(ProductCategory)
admin.site.register(Customer)
admin.site.register(Order)
admin.site.register(OrderItems)
admin.site.register(CustomerAddress)
admin.site.register(ProductRating) 
admin.site.register(ProductImage)  

class ProductImagesInline(admin.StackedInline):
      model = ProductImage
      
class ProductAdmin(admin.ModelAdmin):
      inlines = [
            ProductImagesInline,
      ]


admin.site.register(Product,ProductAdmin)
