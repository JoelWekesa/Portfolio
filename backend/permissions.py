from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
from users.models import *

class BlockGetRequests(permissions.BasePermission):
     def has_permission(self, request, view):
        if request.method == 'POST': # Returns True if POST request
            return True
        else:
            raise AuthenticationFailed('You are not allowed to read my messages', 403)
