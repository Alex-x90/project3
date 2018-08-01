from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render, redirect
from django.contrib.auth.views import logout,login
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from orders.models import menu_items, toppings
from django.utils.safestring import mark_safe
import json

# Create your views here.
def index(request):
    if not request.user.is_authenticated:
        context = {
        "user": None,
        "menu_items": menu_items.objects.all(),
        "toppings": toppings.objects.all()
    }
        return render(request,"orders/user.html",context)
    else:
        context = {
        "user": request.user,
        "menu_items": menu_items.objects.all(),
        "toppings": toppings.objects.all()
    }
    return render(request, "orders/user.html", context)

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

def login_view(request):
    username = request.POST.get("username")
    password = request.POST.get("password")
    user = authenticate(request, username=username, password=password)
    if user is not None:
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "orders/login.html", {"message": "Invalid credentials."})

def logout_view(request):
    logout(request)
    return render(request, "orders/login.html", {"message": "Logged out."})

def cart(request):
    if not request.user.is_authenticated:
        return render(request, "orders/login.html", {"message": None})
    return render(request, "orders/cart.html")
