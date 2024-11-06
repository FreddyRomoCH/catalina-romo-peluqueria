import React, { useState, useEffect } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  Marker,
} from "@vis.gl/react-google-maps";
import { ContactForm } from "@components/ContactForm";

const MapDirections = ({ customerAddress, error }) => {
  return (
    <div className="flex flex-col gap-2 bg-secondary p-3 m-1 rounded-sm">
      <span className="font-cinzel text-pretty tracking-wider text-2xl">
        Dirección
      </span>
      {error ? (
        "Por favor agregar una dirección"
      ) : (
        <>
          <span className="font-playfair text-lg">
            {customerAddress || "Av. Providencia 1234, Providencia"}
          </span>
          <span className="font-playfair text-lg">
            Peluquería: Pasaje Tacna 538, Pudahuel Sur
          </span>
        </>
      )}
    </div>
  );
};

export function MapLocation({
  API_KEY,
  customerAddress,
  peluqueriaCoords,
  error,
}) {
  const [originLatLng, setOriginLatLng] = useState(null);
  const [directions, setDirections] = useState(null);
  const [map, setMap] = useState(null);

  useEffect(() => {
    if (customerAddress) {
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: customerAddress }, (results, status) => {
        if (status === "OK" && results[0]) {
          const location = results[0].geometry.location;
          setOriginLatLng({ lat: location.lat(), lng: location.lng() });
          console.log("Geocoded address:", {
            lat: location.lat(),
            lng: location.lng(),
          });
        } else {
          console.error(
            "Geocode was not successful for the following reason:",
            status
          );
        }
      });
    }
  }, [customerAddress]);

  useEffect(() => {
    if (originLatLng) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originLatLng,
          destination: peluqueriaCoords,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === "OK") {
            setDirections(result);
            console.log("Directions result:", result);
          } else {
            console.error("Error retrieving directions:", status);
          }
        }
      );
    }
  }, [originLatLng, peluqueriaCoords]);

  useEffect(() => {
    if (map && directions) {
      const directionsRenderer = new window.google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(directions);
      console.log("DirectionsRenderer set on map with directions");
    }
  }, [map, directions]);

  const mapProps = {
    style: {
      width: "100%",
      height: "80vh",
    },
    zoom: 14,
    center: peluqueriaCoords,
    gestureHandling: "greedy",
    disableDefaultUI: false,
    onLoad: (mapInstance) => {
      setMap(mapInstance);
    },
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <Map {...mapProps}>
        <MapControl position={ControlPosition.INLINE_START_BLOCK_END}>
          <MapDirections error={error} customerAddress={customerAddress} />
        </MapControl>

        <MapControl position={ControlPosition.TOP_RIGHT}>
          <ContactForm />
        </MapControl>
        <Marker position={peluqueriaCoords} />
      </Map>
    </APIProvider>
  );
}
