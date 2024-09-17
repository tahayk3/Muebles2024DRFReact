from django.contrib import admin
from .models import FurnitureModel, FornitureImageModel, FornitureModel3DModel



# Registrando modelos para que esten en djangoAdmin
class FornitureImageAdmin(admin.ModelAdmin):
    readonly_fields = ('image_url',)  # Hacer que sea de solo lectura para evitar modificaciones accidentales

    def image_url(self, obj):
        return obj.image_url  # Devuelve la URL tal cual está en la base de datos, sin decodificación

    image_url.short_description = "URL de la Imagen"  # Etiqueta para el campo en el admin


class FornitureModel3DAdmin(admin.ModelAdmin):
    readonly_fields = ('model_file_url',)  # Hacer que sea de solo lectura para evitar modificaciones accidentales

    def model_file_url(self, obj):
        return obj.model_file_url  # Devuelve la URL tal cual está en la base de datos, sin decodificación

    model_file_url.short_description = "URL del modelo 3D"  # Etiqueta para el campo en el admin


admin.site.register(FurnitureModel)
admin.site.register(FornitureModel3DModel, FornitureModel3DAdmin)
admin.site.register(FornitureImageModel, FornitureImageAdmin)