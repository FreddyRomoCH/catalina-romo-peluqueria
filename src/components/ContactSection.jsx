import { MapLocation } from "@components/MapLocation.jsx";
import { useRef, useState } from "react";

export function ContactSection() {
  const API_KEY = import.meta.env.PUBLIC_GOOGLE_MAPS_API_KEY;
  const MAP_ID = import.meta.env.PUBLIC_GOOGLE_MAP_ID;
  const [error, setError] = useState(false);
  const [customerAddress, setCustomerAddress] = useState("");
  const addressRef = useRef();

  const handleOnGetDirection = () => {
    if (addressRef.current.value !== "") {
      setCustomerAddress(addressRef.current.value);
      setError(false);
    } else {
      setError(true);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-2">
      <h5 className="font-cinzel text-pretty tracking-wider text-2xl">
        Cómo llegar
      </h5>
      <div className="flex flex-row justify-between items-center gap-2">
        <input
          className={`border-2 rounded px-4 py-2 ${
            error ? "border-red-500" : "border-secondary"
          }`}
          type="text"
          placeholder="Agrega tu dirección"
          name="address"
          ref={addressRef}
          onChange={() => setError(false)}
        />
        <button
          onClick={handleOnGetDirection}
          className="bg-button px-4 py-2 rounded font-playfair"
        >
          Ir
        </button>
      </div>
      <div className="flex w-screen md:w-full p-2 bg-button rounded">
        <MapLocation
          customerAddress={customerAddress}
          API_KEY={API_KEY}
          MAP_ID={MAP_ID}
          peluqueriaCoords={{ lat: -33.4543932, lng: -70.7567109 }}
          error={error}
        />
      </div>
    </div>
  );
}
