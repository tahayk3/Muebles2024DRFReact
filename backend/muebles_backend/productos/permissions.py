from rest_framework.permissions import BasePermission

class IsAdminUser(BasePermission):
    """
    Permite el acceso solo a administradores.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_staff

class IsEditor(BasePermission):
    """
    Permite el acceso solo a editores.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Editors').exists()

class IsViewer(BasePermission):
    """
    Permite el acceso solo a visores.
    """
    def has_permission(self, request, view):
        return request.user and request.user.groups.filter(name='Viewers').exists()
