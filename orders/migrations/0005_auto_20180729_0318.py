# Generated by Django 2.0.7 on 2018-07-29 03:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_auto_20180729_0316'),
    ]

    operations = [
        migrations.AlterField(
            model_name='menu_item',
            name='price_small',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
