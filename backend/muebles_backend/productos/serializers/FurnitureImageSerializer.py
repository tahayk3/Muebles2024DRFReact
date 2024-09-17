from rest_framework import serializers
from ..models import FornitureImageModel

class FurnitureImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = FornitureImageModel
        fields = ['id', 'image_url']