from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
from users.models import *

class BlockGetRequests(permissions.BasePermission):
     def has_permission(self, request, view):
        if request.method == 'POST': # Returns True if POST request
            return True
        else:
            raise AuthenticationFailed(f'{ip_addr}', 403)


class BlockGetRequestsIP(permissions.BasePermission):
    def has_permission(self, request, view):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
            if ip == AllowedIP.objects.first():
                return True
        else:
            raise AuthenticationFailed(f'{x_forwarded_for}', 403)