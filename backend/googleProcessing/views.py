from django.shortcuts import render
from .api_call import getPlaceData
from .models import PlaceSearches

def reviewsJSON(place_id):
    place_info = PlaceSearches.objects.filter(placeId=place_id)
    reviews = place_info['reviews']
    

