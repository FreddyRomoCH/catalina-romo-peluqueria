import { useState, useEffect } from "react";
import {
  APIProvider,
  ControlPosition,
  Map,
  MapControl,
  AdvancedMarker,
  Pin,
  InfoWindow,
  useMap,
  useMapsLibrary,
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
  MAP_ID,
  customerAddress,
  peluqueriaCoords,
  error,
}) {
  const [open, setOpen] = useState(false);

  const mapProps = {
    zoom: 13,
    center: peluqueriaCoords,
    disableDefaultUI: true,
    mapId: MAP_ID,
  };

  return (
    <APIProvider apiKey={API_KEY}>
      <div style={{ height: "80vh", width: "100%" }}>
        <Map {...mapProps}>
          {/* <MapControl position={ControlPosition.TOP_RIGHT}>
            <MapDirections error={error} customerAddress={customerAddress} />
          </MapControl> */}

          {/* <MapControl position={ControlPosition.TOP_LEFT}>
            <ContactForm />
          </MapControl> */}

          <AdvancedMarker
            position={peluqueriaCoords}
            onClick={() => setOpen(true)}
          >
            <Pin
              background={"black"}
              borderColor={"grey"}
              glyphColor={"grey"}
            />

            {open && (
              <InfoWindow
                position={peluqueriaCoords}
                onCloseClick={() => setOpen(false)}
              >
                <div className="flex flex-col gap-2 bg-secondary p-3 m-1 rounded-sm">
                  <span className="font-cinzel text-pretty tracking-wider text-2xl">
                    Peluquería
                  </span>
                  <span className="font-playfair text-lg">
                    Pasaje Tacna 538, Pudahuel Sur
                  </span>
                  <span className="font-playfair text-lg">+56 9 1234 5678</span>
                </div>
              </InfoWindow>
            )}
          </AdvancedMarker>
          {!error && <Directions customerAddress={customerAddress} />}
        </Map>
      </div>
    </APIProvider>
  );
}

function Directions({ customerAddress }) {
  console.log(customerAddress);
  const map = useMap();
  const routesLibrary = useMapsLibrary("routes");
  const [directionsService, setDirectionsService] = useState();
  const [directionsRenderer, setDirectionsRenderer] = useState();
  const [routes, setRoutes] = useState([]);
  const [routeIndex, setRouteIndex] = useState(0);
  const selectedRoute = routes[routeIndex];
  const leg = selectedRoute?.legs[0];

  useEffect(() => {
    if (!routesLibrary || !map) return;
    setDirectionsService(new routesLibrary.DirectionsService());
    setDirectionsRenderer(new routesLibrary.DirectionsRenderer({ map }));
  }, [routesLibrary, map, customerAddress]);

  useEffect(() => {
    if (!directionsRenderer || !directionsService) return;

    directionsService
      .route({
        origin: customerAddress,
        destination: "Pasaje Tacna 538, Pudahuel Sur",
        travelMode: google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true,
      })
      .then((response) => {
        directionsRenderer.setDirections(response);
        setRoutes(response.routes);
      });
  }, [directionsRenderer, directionsService]);

  useEffect(() => {
    if (!directionsRenderer) return;
    directionsRenderer.setRouteIndex(routeIndex);
  }, [routeIndex, directionsRenderer]);

  if (!leg) return null;

  return (
    <div className="absolute top-0 bg-button m-3 p-3 flex flex-col gap-5">
      <div>
        <h2>{selectedRoute.summary}</h2>
        <p>
          {leg.start_address.split(",")[0]} to {leg.end_address.split(",")[0]}
        </p>
        <p>Distancia: {leg.distance?.text}</p>
        <p>Duración: {leg.duration?.text}</p>
      </div>

      {routes.length > 1 && (
        <div>
          <h2>Otras rutas</h2>
          <ul>
            {routes.map((route, index) => (
              <li key={route.summary}>
                <button onClick={() => setRouteIndex(index)}>
                  {route.summary}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
