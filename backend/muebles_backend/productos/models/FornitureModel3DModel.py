from django.db import models
from .FurnitureModel import FurnitureModel

class FornitureModel3DModel(models.Model):
    furniture = models.OneToOneField(FurnitureModel, related_name='model_3d', on_delete=models.CASCADE)
    model_file_url = models.URLField(max_length=500)
    

    def __str__(self):
        return f"3D Model of {self.furniture.name}"