# Generated by Django 2.0.7 on 2018-07-29 03:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0005_auto_20180729_0318'),
    ]

    operations = [
        migrations.CreateModel(
            name='toppings',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('topping', models.CharField(max_length=64)),
            ],
        ),
    ]
