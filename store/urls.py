# store/urls.py
from django.urls import path
from .views import cart_view, add_to_cart, remove_from_cart, update_cart, buy_now

urlpatterns = [
    # other paths...
    path('cart/', cart_view, name='cart'),
    path('add_to_cart/', add_to_cart, name='add_to_cart'),
    path('remove_from_cart/', remove_from_cart, name='remove_from_cart'),
    path('update_cart/', update_cart, name='update_cart'),
    path('buy_now/', buy_now, name='buy_now'),
]
