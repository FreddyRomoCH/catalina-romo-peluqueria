import { APIProvider, Map } from "@vis.gl/react-google-maps";
const API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;

export function MapLocation() {
  return (
    <APIProvider apiKey={API_KEY}>
      <Map
        style={{
          width: "80%",
          height: "50vw",
          margin: "0 auto",
          aspectRatio: "1 / 1",
        }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={18}
        gestureHandling={"greedy"}
        disableDefaultUI={true}
        center={{ lat: -33.4543932, lng: -70.7567109 }}
      />
    </APIProvider>
  );
}
