from rest_framework import serializers
from ..models import FornitureModel3DModel

class FurnitureModel3DSerializer(serializers.ModelSerializer):
    class Meta:
        model = FornitureModel3DModel
        fields = '__all__'