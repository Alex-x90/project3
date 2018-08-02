from django.urls import path
from django.contrib.auth.views import logout,login
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("login", views.login_view, name="login"),
    path("logout", views.logout_view, name="logout"),
    path("register", views.signup,name="register"),
    path("cart", views.cart,name="cart"),
    path("store_order", views.store_order,name="store_order"),
    path("orders", views.order,name="orders"),
]