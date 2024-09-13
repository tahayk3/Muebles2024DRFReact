from django.db import models
from .furniture import Furniture

class FornitureModel3D(models.Model):
    forniture = models.OneToOneField(Furniture, related_name='model_3d', on_delete=models.CASCADE)
    model_file_url = models.URLField()

    def __str__(self):
        return f"Modelo 3D de {self.forniture.name}"