from rest_framework import generics
from ..models import FornitureModel3DModel
from ..serializers import FurnitureModel3DSerializer

class FurnitureModel3DCreateView(generics.CreateAPIView):
    queryset = FornitureModel3DModel.objects.all()
    serializer_class = FurnitureModel3DSerializer