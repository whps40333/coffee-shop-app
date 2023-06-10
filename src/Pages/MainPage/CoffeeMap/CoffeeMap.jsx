import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import styles from "../../../styles/pages/MainPage/CoffeeMap/CoffeeMap.module.scss";
import InfoWindowComponent from "./InfoWindow";

function CoffeeMap() {
  const [stores, setStores] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [selectedMarker, setSelectedMarker] = useState(null);
  const apiKey = "AIzaSyBxol_vebXa90e1VtfWoGXjASEg3Hjn1lA";
  const mapStyles = {
    height: "100%",
    width: "100%",
  };

  const defaultCenter = {
    lat: 24.9861391,
    lng: 121.5773635,
  };

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const response = await fetch(
          "https://coffee-shop-30b10-default-rtdb.firebaseio.com/features.json"
        );
        const responseData = await response.json();

        const loadedStores = [];

        for (const key in responseData) {
          loadedStores.push({
            id: key,
            name: responseData[key].properties.name,
            score: responseData[key].properties.score,
            site: responseData[key].properties.site,
            time: responseData[key].properties.time,
            lat: responseData[key].properties.lat,
            lng: responseData[key].properties.lng,
          });
        }
        setStores(loadedStores);
        setIsLoading(false);
      } catch (error) {
        setHttpError(error.message);
        setIsLoading(false);
      }
    };

    fetchStores();
  }, []);

  const markerHandler = (marker) => {
    setSelectedMarker(marker);
  };

  if (isLoading) {
    return (
      <section className={styles.StoresLoading}>
        <p>Loading...</p>
      </section>
    );
  }

  if (httpError) {
    return (
      <section className={styles.MealsError}>
        <p>{httpError}</p>
      </section>
    );
  }

  return (
    <div className={styles.map}>
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          center={defaultCenter}
          zoom={15}
        >
          {stores.map((store) => (
            <Marker
              key={store.id}
              position={{
                lat: store.lat,
                lng: store.lng,
              }}
              onClick={markerHandler.bind(null, store)}
            >
              {selectedMarker && selectedMarker.id === store.id && (
                <InfoWindowComponent feature={store} />
              )}
            </Marker>
          ))}
          <Marker position={defaultCenter} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}

export default CoffeeMap;
