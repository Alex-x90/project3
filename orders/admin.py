from django.contrib import admin
from .models import menu_items , toppings,orders

# Register your models here.

admin.site.register(menu_items)
admin.site.register(toppings)
admin.site.register(orders)