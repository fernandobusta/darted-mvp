import React, { useState } from "react";
import { GoogleMap, LoadScript, useJsApiLoader } from "@react-google-maps/api";
// GoogleMap, LoadScript, useJsApiLoader are react-google-maps components that allow us to use the google maps api

const Map = () => {
  // basic map styles
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  // set default center to Dublin
  const defaultCenter = {
    lat: 53.349805,
    lng: -6.26031,
  };

  // set placeId to null by default
  const [placeId, setPlaceId] = useState(null);

  // load google maps api
  const { isLoaded } = useJsApiLoader({
    // useJsApiLoader is a react-google-maps component that loads the google maps api
    // isLoaded is a boolean that is true if the api is loaded
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"], // TODO: this should be changed
  });

  // handle map click
  const handleMapClick = (e) => {
    const lat = e.latLng.lat(); // get lat and lng of clicked location
    const lng = e.latLng.lng();

    const geocoder = new window.google.maps.Geocoder(); // create new geocoder (which allows us to get place id from lat and lng)
    const latLng = new window.google.maps.LatLng(lat, lng); // create new latLng object
    // latLng is a google maps object that allows us to store lat and lng

    geocoder.geocode({ location: latLng }, (results, status) => {
      // geocode the latLng object
      if (status === window.google.maps.GeocoderStatus.OK && results) {
        // if geocode is successful
        const place = results.find((result) => result.place_id); // find the place id from the results
        if (place) {
          // if place id is found
          setPlaceId(place.place_id); // set place id
        } else {
          // if place id is not found
          setPlaceId(null);
        }
      } else {
        // if geocode is not successful
        setPlaceId(null);
      }
    });
  };

  // return map if api is loaded
  return isLoaded ? (
    <div>
      <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center={defaultCenter}
        onClick={handleMapClick}
      />
      {placeId ? (
        <p>Place ID: {placeId}</p>
      ) : (
        <p>No Place ID found for the clicked location</p>
      )}
    </div>
  ) : (
    // return loading message if api is not loaded
    <>Loading...</>
  );
};

export default Map;
