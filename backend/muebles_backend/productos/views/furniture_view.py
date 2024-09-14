from rest_framework import generics
from ..models import FurnitureModel
from ..serializers import FurnitureSerializer

class FurnitureListView(generics.ListCreateAPIView):
    queryset = FurnitureModel.objects.all()
    serializer_class = FurnitureSerializer

class FurnitureDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FurnitureModel.objects.all()
    serializer_class = FurnitureSerializer