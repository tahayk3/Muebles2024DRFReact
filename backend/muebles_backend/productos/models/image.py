from django.db import models
from .furniture import Furniture

class FornitureImage(models.Model):
    forniture = models.ForeignKey(Furniture, related_name='image', on_delete=models.CASCADE)
    image_url = models.URLField() 
    #Variantes de color 
    color_variant = models.CharField(max_length=50, blank= True, null = True)

    def __str__(self):
        return f"Imange de {self.forniture.name}"

