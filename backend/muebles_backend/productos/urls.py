from django.urls import path 
from .views import FurnitureListView, FurnitureImageView

urlpatterns = [
    path('furniture/', FurnitureListView.as_view(), name = 'furniture-list'),
    path('furniture/<int:pk>/images/', FurnitureImageView.as_view(), name='furniture-images'),
]