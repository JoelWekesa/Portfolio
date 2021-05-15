from rest_framework import permissions
from rest_framework.exceptions import AuthenticationFailed
from users.models import *

# class BlockGetRequests(permissions.BasePermission):
#     def has_permission(self, request, view):
#         x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
#         if x_forwarded_for:
#             ip_addr = x_forwarded_for.split(',')[0]
#             if ip_addr == "127.0.0.1":
#                 return True
#         else:
#             ip_addr = request.META.get('REMOTE_ADDR')
#             if ip_addr == "127.0.0.1":
#                 return True
#         if request.method == 'POST': # Returns True if POST request
#             return True
#         else:
#             raise AuthenticationFailed(f'{ip_addr}', 403)


class BlockGetRequests(permissions.BasePermission):
    def has_permission(self, request, view):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
            if ip == "105.162.21.42":
                return True
        elif request.method == 'POST': # Returns True if POST request
            return True
        else:
            raise AuthenticationFailed(f'{x_forwarded_for}', 403)