# Generated by Django 5.1.7 on 2025-03-17 16:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0025_product_publish_status'),
    ]

    operations = [
        migrations.AddField(
            model_name='productcategory',
            name='cat_img',
            field=models.ImageField(null=True, upload_to='category_img'),
        ),
    ]
