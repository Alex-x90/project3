from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render, redirect
from django.contrib.auth.views import logout,login
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from orders.models import menu_items, toppings, orders
from django.utils.safestring import mark_safe
import json
import time
from django_ajax.decorators import ajax

# renders the main page
def index(request):
    if not request.user.is_authenticated:
        context = {
        "user": None,
        "menu_items": menu_items.objects.all(),
        "toppings": toppings.objects.all(),
        "message":None
    }
        return render(request,"orders/user.html",context)
    else:
        context = {
        "user": request.user,
        "menu_items": menu_items.objects.all(),
        "toppings": toppings.objects.all(),
        "message":None
    }
    return render(request, "orders/user.html", context)

# sign-up page
def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('index')
    else:
        form = UserCreationForm()
    return render(request, "orders/signup.html", {'form': form})

# log in page
def login_view(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "orders/login.html", {"message": "Invalid credentials."})

# log out page
def logout_view(request):
    logout(request)
    return render(request, "orders/login.html", {"message": "Logged out."})

# checks if the user is logged in. if they are renders their cart. If they aren't loads the menu and sends a message
def cart(request):
    if not request.user.is_authenticated:
        context = {
            "user": None,
            "menu_items": menu_items.objects.all(),
            "toppings": toppings.objects.all(),
            "message": "You must be logged in to view your cart."
        }
        return render(request, "orders/user.html", context)
    return render(request, "orders/cart.html")

# gets the user's order from javascript and stores it to the database
def store_order(request):
    if request.method == "POST":
        currentOrder = json.loads(request.POST.get('input'))
        user = request.POST.get('user')

        for x in currentOrder:
            db_order = orders.objects.create()
            if 'topping1' in x:
                db_order.toppings += x['topping1']
                if 'topping2' in x:
                    if not 'topping3' in x:
                        db_order.toppings += " and "
                    else:
                        db_order.toppings += ", "
                    db_order.toppings += x['topping2']
                    if 'topping3' in x:
                        db_order.toppings += ", and " + x['topping3']
            else:
                db_order.toppings = "None"
            db_order.user = user
            db_order.items = x['itemName']
            db_order.save()
        # redirect is done in javascript so no return is needed

# if the user has permision renders the page with all the orders
def order(request):
    if request.user.is_superuser:
        context = {
            "orders": orders.objects.all()
        }
        return render(request, "orders/orders.html", context)
    else:
        context = {
            "user": request.user,
            "menu_items": menu_items.objects.all(),
            "toppings": toppings.objects.all(),
            "message": "You don't have permission to view that!"
        }
        return render(request, "orders/user.html", context)