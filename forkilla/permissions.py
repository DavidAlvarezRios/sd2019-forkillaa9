from rest_framework import permissions


class IsCommercialOrReadOnly(permissions.BasePermission):
    """
    Custom permission to only allow commercials edit, add or delete the restaurants.
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True

        # Write permissions are only allowed to the owner of the snippet.
        if request.user.groups.filter(name='Commercials').exists():
            return True

        return False

    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request,
        # so we'll always allow GET, HEAD or OPTIONS requests.
        return True

