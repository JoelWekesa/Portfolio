from django.db import models

class AllowedIP(models.Model):
    ip_addresses = models.CharField(max_length=15)

    def __str__(self):
        return self.ip_addresses
