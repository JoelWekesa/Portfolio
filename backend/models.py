from django.db import models

from django.db import models

class Images(models.Model):
    name = models.CharField(max_length = 255)
    image = models.ImageField(upload_to = 'images')

    class Meta:
        verbose_name_plural = 'Images'
        ordering = ['-id']

    def __str__(self):
        return self.name

class Messages(models.Model):
    name = models.CharField(max_length=255)
    email = models.EmailField(blank=True)
    subject = models.CharField(max_length = 255, blank=True)
    message = models.TextField()
    date = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Messages'
        ordering = ['-id']

    def __str__(self):
        return f'Name: {self.name}, Subject: {self.subject}'
