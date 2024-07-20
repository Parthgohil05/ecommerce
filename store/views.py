# store/views.py
from django.shortcuts import render, redirect
from .models import Product
from django.http import JsonResponse
from django.template.loader import render_to_string
from django.views.decorators.http import require_POST

def add_to_cart(request):
    product_id = request.POST.get('product_id')
    product = Product.objects.get(id=product_id)
    cart = request.session.get('cart', {})
    
    if product_id in cart:
        cart[product_id]['quantity'] += 1
    else:
        cart[product_id] = {'name': product.name, 'price': product.price, 'quantity': 1, 'image_url': product.image_url}
    
    request.session['cart'] = cart
    return JsonResponse({'success': True, 'cart': cart})

def remove_from_cart(request):
    product_id = request.POST.get('product_id')
    cart = request.session.get('cart', {})

    if product_id in cart:
        del cart[product_id]
        request.session['cart'] = cart
        return JsonResponse({'success': True, 'cart': cart})
    return JsonResponse({'success': False})

def cart_view(request):
    cart = request.session.get('cart', {})
    orders = []
    total_price = 0

    for product_id, quantity in cart.items():
        product = Product.objects.get(id=product_id)
        total_price += product.price * quantity
        orders.append({
            'product': product,
            'quantity': quantity,
            'total': product.price * quantity
        })

    context = {
        'orders': orders,
        'total_price': total_price,
    }
    return render(request, 'store/cart.html', context)

def update_cart(request):
    product_id = request.POST.get('product_id')
    quantity = int(request.POST.get('quantity'))
    cart = request.session.get('cart', {})

    if quantity > 0:
        cart[product_id] = quantity
    else:
        cart.pop(product_id, None)

    request.session['cart'] = cart
    return JsonResponse({'success': True})

# store/views.py
@require_POST
def buy_now(request):
    cart = request.session.get('cart', {})
    # Simulate processing the purchase
    # In a real application, you would handle payment processing and order confirmation here

    # Clear the cart
    request.session['cart'] = {}
    return JsonResponse({'success': True})
