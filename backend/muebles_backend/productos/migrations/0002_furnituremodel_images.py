# Generated by Django 5.1.1 on 2024-09-17 07:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='furnituremodel',
            name='images',
            field=models.JSONField(default=list),
        ),
    ]