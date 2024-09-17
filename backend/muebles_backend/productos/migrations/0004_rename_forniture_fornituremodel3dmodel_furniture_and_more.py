# Generated by Django 5.1.1 on 2024-09-17 09:42

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('productos', '0003_remove_furnituremodel_images'),
    ]

    operations = [
        migrations.RenameField(
            model_name='fornituremodel3dmodel',
            old_name='forniture',
            new_name='furniture',
        ),
        migrations.RemoveField(
            model_name='fornitureimagemodel',
            name='color_variant',
        ),
        migrations.RemoveField(
            model_name='fornitureimagemodel',
            name='forniture',
        ),
        migrations.AddField(
            model_name='fornitureimagemodel',
            name='furniture',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='images', to='productos.furnituremodel'),
            preserve_default=False,
        ),
    ]
