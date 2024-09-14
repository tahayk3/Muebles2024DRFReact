from rest_framework import serializers
from ..models import FurnitureModel
from . import FurnitureImageSerializer, FurnitureSerializer, FurnitureModel3DSerializer

class FurnitureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FurnitureModel
        fields = '__all__'