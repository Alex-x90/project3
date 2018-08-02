from django.db import models

# Create your models here.

class menu_items(models.Model):
    item = models.CharField(max_length=64)
    price_small = models.FloatField(null=True,blank=True)
    price_large = models.FloatField()
    num_toppings = models.IntegerField()

class toppings(models.Model):
    topping = models.CharField(max_length=64)

class orders(models.Model):
    user = models.CharField(max_length=64)
    items = models.CharField(max_length=64)
    toppings = models.CharField(max_length=64)