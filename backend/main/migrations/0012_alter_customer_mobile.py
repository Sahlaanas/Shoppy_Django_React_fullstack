# Generated by Django 5.1.6 on 2025-02-25 12:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0011_alter_customer_mobile'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='mobile',
            field=models.PositiveBigIntegerField(),
        ),
    ]
