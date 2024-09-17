from django.db import models
from .FurnitureModel import FurnitureModel

class FornitureImageModel(models.Model):
    furniture = models.ForeignKey(FurnitureModel, related_name='images', on_delete=models.CASCADE)
    image_url = models.URLField(max_length=500)

    def __str__(self):
        return f"Image of {self.furniture.name}"

