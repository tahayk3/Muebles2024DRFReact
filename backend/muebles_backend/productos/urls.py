from django.urls import path 
from .views import FurnitureListView, FurnitureDetailView, FurnitureImageView

urlpatterns = [
    path('furniture/', FurnitureListView.as_view(), name = 'furniture-list'),
    path('furniture/<int:pk>/', FurnitureDetailView.as_view(), name='furniture-detail'),
    path('furniture/<int:pk>/images/', FurnitureImageView.as_view(), name='furniture-images'),
]