from django.contrib import admin
from .models import FurnitureModel, FornitureImageModel, FornitureModel3DModel

# Registrando modelos para que esten en djangoAdmin
admin.site.register(FurnitureModel)
admin.site.register(FornitureImageModel)
admin.site.register(FornitureModel3DModel)
