from rest_framework import serializers
from ..models import FurnitureModel
from .FurnitureImageSerializer import FurnitureImageSerializer
from .FurnitureModel3DSerializer import FurnitureModel3DSerializer

class FurnitureSerializer(serializers.ModelSerializer):
    images = FurnitureImageSerializer(many=True, read_only=True)
    model_3d = FurnitureModel3DSerializer(read_only=True)

    class Meta:
        model = FurnitureModel
        fields = ['id', 'name', 'description', 'price', 'stock', 'images', 'model_3d', 'created_at', 'updated_at']