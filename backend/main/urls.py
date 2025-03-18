from django.urls import path
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
# router.register(r'address', views.CustomerAddressViewSet)
router.register(r'productrating', views.ProductRatingViewSet) 


urlpatterns = [
    path('vendors/', views.VendorList.as_view()),
    path('vendor/<int:pk>/', views.VendorDetail.as_view()),
    path('vendor-products/<int:vendor_id>/', views.VendorProductsList.as_view()), 
    path('vendor-change-password/<int:pk>/', views.vendor_change_password, name='vendor_change_password'),
    path('vendor/<int:pk>/dashboard/', views.vendor_dashboard, name='vendor_dashboard'),
    path('vendor/register/', views.vendor_register, name='vendor_register'),
    path('vendor/login/', views.vendor_login, name='vendor_login'),
    path('vendor/<int:pk>/orderitems/', views.VendorOrderItemList.as_view()),
    path('vendor/<int:pk>/customers/', views.VendorCustomerList.as_view()),
    path('vendor/<int:vendor_id>/customer/<int:customer_id>/orderitems/', views.VendorCustomerOrderitemsList.as_view()),
    
    path('address/', views.CustomerAddAddress.as_view()),
    path('address/<int:pk>/', views.AddressDetail.as_view()),
    
    path('products/', views.ProductList.as_view()),
    path('products/<str:tag>/', views.TagProductList.as_view()),
    path('product/<int:pk>/', views.ProductDetail.as_view()),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    
    path('categories/', views.CategoryList.as_view()),
    path('category/<int:pk>/', views.CategoryDetail.as_view()), 
    
    path('customers/', views.CustomerList.as_view()),
    path('customer/<int:pk>/', views.CustomerDetail.as_view()),
    path('user/<int:pk>/', views.UserDetail.as_view()),
    path('customer/login/', views.customer_login, name='customer_login'),
    path('customer/register/', views.customer_register, name='customer_register'),
    path('customer-change-password/<int:pk>/', views.customer_change_password, name='customer_change_password'),
    
    path('orders/', views.OrderList.as_view()),
    path('order/<int:pk>', views.OrderDetail.as_view()),
    path('delete-customer-orders/<int:customer_id>/', views.delete_customer_orders, name='delete_customer_orders'),
    path('order-modify/<int:pk>/', views.OrderModify.as_view()),
    path('orderitems/', views.OrderItemList.as_view()),
    path('customer/<int:pk>/orderitems/', views.CustomerOrderItemList.as_view()),
    path('update-order-status/<int:order_id>/', views.update_order_status, name='update_order_status'), 
    path('update-download-count/<int:product_id>/', views.update_download_count, name='update_download_count'), 
    
    path('wishlist/', views.WishList.as_view()), 
    path('check-in-wishlist/', views.check_in_wishlist, name='check_in_wishlist'),
    path('customer/<int:pk>/wishitems/', views.WishItemList.as_view()),
    path('remove-from-wishlist/', views.remove_from_wishlist, name = 'remove_from_wishlist'),
    path('customer/<int:pk>/address-list/', views.CustomerAddressList.as_view()),
    path('mark-default-address/<int:pk>/', views.mark_default_adress, name='mark_default_address'),
    path('customer/dashboard/<int:pk>/', views.customer_dashboard, name='customer_dashboard')

    
]
urlpatterns += router.urls