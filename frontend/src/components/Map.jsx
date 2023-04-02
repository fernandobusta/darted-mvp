import React, { useState, useRef } from "react";
import {
  GoogleMap,
  LoadScript,
  useJsApiLoader,
  Autocomplete,
} from "@react-google-maps/api";

const Map = () => {
  const mapStyles = {
    height: "100vh",
    width: "100%",
  };

  const defaultCenter = {
    lat: 53.349805,
    lng: -6.26031,
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    height: "100vh",
  };

  const searchBoxStyle = {
    boxSizing: "border-box",
    border: "1px solid transparent",
    width: "240px",
    height: "32px",
    marginTop: "27px",
    padding: "0 12px",
    borderRadius: "3px",
    boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
    fontSize: "14px",
    outline: "none",
    textOverflow: "ellipses",
    position: "absolute",
    left: "50%",
    marginLeft: "-120px",
    zIndex: 10, // add zIndex to place the search bar above the map
  };

  const [placeId, setPlaceId] = useState(null);
  const [autocomplete, setAutocomplete] = useState(null);
  const [mapCenter, setMapCenter] = useState(defaultCenter);
  const mapRef = useRef(null);

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries: ["places"],
  });

  const onAutocompleteLoad = (autocompleteInstance) => {
    setAutocomplete(autocompleteInstance);
  };

  const onPlaceSelected = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      const { geometry } = place;

      if (geometry) {
        const { location } = geometry;
        const newCenter = {
          lat: location.lat(),
          lng: location.lng(),
        };

        setPlaceId(place.place_id);
        setMapCenter(newCenter); // Update the map center state
      }
    }
  };
  const handleMapClick = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();

    const geocoder = new window.google.maps.Geocoder();
    const latLng = new window.google.maps.LatLng(lat, lng);

    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK && results) {
        const place = results.find((result) => result.place_id);
        if (place) {
          setPlaceId(place.place_id);
        } else {
          setPlaceId(null);
        }
      } else {
        setPlaceId(null);
      }
    });
  };

  return isLoaded ? (
    <div style={containerStyle}>
      <Autocomplete
        onLoad={onAutocompleteLoad}
        onPlaceChanged={onPlaceSelected}
      >
        <input type="text" placeholder="Search..." style={searchBoxStyle} />
      </Autocomplete>
      <GoogleMap
        ref={mapRef}
        mapContainerStyle={mapStyles}
        zoom={13}
        center={mapCenter} // Use the mapCenter state instead of defaultCenter
        onClick={handleMapClick}
      />
      {placeId && <p>Place ID: {placeId}</p>}
    </div>
  ) : (
    <>Loading...</>
  );
};

export default Map;
