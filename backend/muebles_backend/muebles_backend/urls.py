from django.contrib import admin
from django.urls import path, include
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('productos.urls')),

    # Ruta para obtener el token de autenticación
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    # Ruta para refrescar el token
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]
