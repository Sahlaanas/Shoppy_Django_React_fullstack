# Generated by Django 5.1.6 on 2025-03-01 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0014_orderitems_price_orderitems_qty'),
    ]

    operations = [
        migrations.AddField(
            model_name='order',
            name='order_status',
            field=models.BooleanField(default=False),
        ),
    ]
