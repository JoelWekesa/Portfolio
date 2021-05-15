from rest_framework import viewsets
from .models import *
from .serializers import *
from .permissions import *

class ImagesViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Images.objects.all()
    serializer_class = ImagesSerializer

class MessagesViewSet(viewsets.ModelViewSet):
    permission_classes = [BlockGetRequestsIP]
    queryset = Messages.objects.all()
    serializer_class = MessagesSerializer