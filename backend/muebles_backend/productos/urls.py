from django.urls import path 
from .views import FurnitureListView, FurnitureDetailView

urlpatterns = [
    path('furniture/', FurnitureListView.as_view(), name = 'furniture-list'),
    path('furniture/<int:pk>/', FurnitureDetailView.as_view(),  name='furniture-detail'),
]