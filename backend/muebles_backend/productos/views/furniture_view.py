from rest_framework import generics
from ..models import FurnitureModel, FornitureImageModel, FornitureModel3DModel
from ..serializers import FurnitureSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from ..permissions import IsAdminUser, IsEditor, IsViewer

from rest_framework.pagination import PageNumberPagination


class CustomPagination(PageNumberPagination):
    page_size = 3
    page_size_query_param = 'page_size'
    max_page_size = 3

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

    def perform_create(self, serializer):
        furniture = serializer.save()

        # Crear registros para imágenes
        images = self.request.data.get('images', [])
        for image_url in images:
            print("URL de imagen recibida:", image_url)
            FornitureImageModel.objects.create(furniture=furniture, image_url=image_url)

        # Crear registro para el modelo 3D
        model_urls = self.request.data.get('model_3d', [])
        for model_url in model_urls:
            FornitureModel3DModel.objects.create(furniture=furniture, model_file_url=model_url)


#Vista para obtener los detalles de un mueble especifico
class FurnitureDetailView(generics.RetrieveAPIView):
    queryset = FurnitureModel.objects.all()
    serializer_class = FurnitureSerializer
    persmission_classes = [AllowAny]

    def get_permissions(self):
        if self.request.method == "GET":
            permission_classes = [AllowAny]
        elif self.request.method in ['PUT', 'PATCH', 'DELETE']:
            permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]