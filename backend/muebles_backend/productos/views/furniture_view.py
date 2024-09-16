from rest_framework import generics
from ..models import FurnitureModel
from ..serializers import FurnitureSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from ..permissions import IsAdminUser, IsEditor, IsViewer

from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 10  # Número de elementos por página
    page_size_query_param = 'page_size'
    max_page_size = 100

class FurnitureListView(generics.ListCreateAPIView):
    queryset = FurnitureModel.objects.all()
    serializer_class = FurnitureSerializer
    pagination_class = CustomPagination
   
    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        elif self.request.method == 'POST':
            permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]

class FurnitureDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = FurnitureModel.objects.all()
    serializer_class = FurnitureSerializer
    pagination_class = CustomPagination

    def get_permissions(self):
        if self.request.method == 'GET':
            permission_classes = [AllowAny]
        elif self.request.method in ['PUT', 'PATCH']:
            permission_classes = [IsAuthenticated, IsEditor |  IsAdminUser]
        elif self.request.method == 'DELETE':
            permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]