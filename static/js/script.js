'use strict';



/**
 * Mobile navbar toggle
 */

const navbar = document.querySelector("[data-navbar]");
const navToggler = document.querySelector("[data-nav-toggler]");

navToggler.addEventListener("click", function () {
  navbar.classList.toggle("active");
});



/**
 * Header active
 */

const header = document.querySelector("[data-header]");

window.addEventListener("scroll", function () {
  header.classList[this.scrollY > 50 ? "add" : "remove"]("active");
});

// static/js/script.js
$(document).ready(function() {
  function updateCartTotal() {
      let total = 0;
      $('.order').each(function() {
          let quantity = parseInt($(this).find('.quantity').val());
          let price = parseFloat($(this).find('.order-total').text());
          total += quantity * price;
      });
      $('#cart-total-price').text(total.toFixed(2));
  }

  $('.quantity').on('change', function(event) {
      event.preventDefault();
      let quantity = $(this).val();
      let productId = $(this).data('id');

      $.ajax({
          type: 'POST',
          url: '{% url "update_cart" %}',
          data: {
              'product_id': productId,
              'quantity': quantity,
              'csrfmiddlewaretoken': '{{ csrf_token }}'
          },
          success: function(response) {
              if (response.success) {
                  let orderElement = $('.order[data-order-id="' + productId + '"]');
                  let price = parseFloat(orderElement.find('.order-total').text());
                  orderElement.find('.order-total').text((price * quantity).toFixed(2));
                  updateCartTotal();
              } else {
                  alert('Failed to update the product quantity.');
              }
          },
          error: function() {
              alert('An error occurred while trying to update the product quantity.');
          }
      });
  });

  $('.buy-now').on('click', function(event) {
      event.preventDefault();
      alert('Buy Now functionality not implemented yet.');
  });

  $('.remove-from-cart').on('click', function(event) {
      event.preventDefault();
      var orderElement = $(this).closest('.order');
      var productId = $(this).data('id');

      $.ajax({
          type: 'POST',
          url: '{% url "remove_from_cart" %}',
          data: {
              'product_id': productId,
              'csrfmiddlewaretoken': '{{ csrf_token }}'
          },
          success: function(response) {
              if (response.success) {
                  orderElement.remove();
                  updateCartTotal();
              } else {
                  alert('Failed to remove the product from the cart.');
              }
          },
          error: function() {
              alert('An error occurred while trying to remove the product from the cart.');
          }
      });
  });

  $('.buy-now-cart').on('click', function(event) {
      event.preventDefault();

      $.ajax({
          type: 'POST',
          url: '{% url "buy_now" %}',
          data: {
              'csrfmiddlewaretoken': '{{ csrf_token }}'
          },
          success: function(response) {
              if (response.success) {
                  alert('Purchase successful!');
                  $('.cart-container').empty();
                  $('#cart-total-price').text('0.00');
              } else {
                  alert('Failed to complete the purchase.');
              }
          },
          error: function() {
              alert('An error occurred while trying to complete the purchase.');
          }
      });
  });
});
