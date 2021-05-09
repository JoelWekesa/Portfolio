from rest_framework import serializers
from .models import *

class ImagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Images
        fields = '__all__'

class  MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model =  Messages
        fields = '__all__'