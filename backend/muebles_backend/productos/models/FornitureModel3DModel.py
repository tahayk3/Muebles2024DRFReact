from django.db import models
from .FurnitureModel import FurnitureModel

class FornitureModel3DModel(models.Model):
    forniture = models.OneToOneField(FurnitureModel, related_name='model_3d', on_delete=models.CASCADE)
    model_file_url = models.URLField()

    def __str__(self):
        return f"Modelo 3D de {self.forniture.name}"