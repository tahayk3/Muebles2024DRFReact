from rest_framework import generics
from ..models import FornitureImageModel
from ..serializers import FurnitureImageSerializer

class FurnitureImageView(generics.ListCreateAPIView):
    queryset = FornitureImageModel.objects.all()
    serializer_class = FurnitureImageSerializer