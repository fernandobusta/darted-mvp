from django.db import models

# Create your models here.
class PlaceSearches(models.Model):
    id = models.AutoField(primary_key=True)
    placeId = models.CharField(max_length=1000)
    placeInfo = models.JSONField()
    reviews = models.JSONField()
    rating = models.DecimalField(max_digits=3)