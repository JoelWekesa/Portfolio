from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
from users.models import *

class BlockGetRequests(permissions.BasePermission):
    def has_permission(self, request, view):
        ip_addr = request.META['REMOTE_ADDR']
        if request.method == 'POST': # Returns True if POST request
            return True
        if ip_addr == "105.162.21.42":
            return True
        else:
            raise AuthenticationFailed(f'{ip_addr}', 403)