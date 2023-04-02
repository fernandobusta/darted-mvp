import googlemaps
from decouple import config 
from .models import PlaceSearches

def getPlaceData(placeid):
    # Make the API call
    # Define our clients and authenticate to make request
    gmaps = googlemaps.Client(key = config('API_KEY'))

    # page to see fields: https://developers.google.com/maps/documentation/places/web-service/details
    my_fields = ['business_status', 'formatted_address', 'name', 'opening_hours', 'plus_code', 
                 'price_level', 'rating','review', 'type', 'url', 'user_ratings_total', 'vicinity', 'website']
    
    # make a request for the details
    place_details = gmaps.place(place_id = placeid, fields = my_fields)

    # Returns a JSON with all data from a place -> we only care about the 'result' of the JSON
    # Instead of return -> save into models
    place = PlaceSearches(placeId=placeid, placeInfo=place_details['result'])
    place.save()