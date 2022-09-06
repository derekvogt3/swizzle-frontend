import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap({ latLng, h, w }) {
  const defaultProps = {
    center: {
      lat: 40.7128,
      lng: -74.006,
    },
    zoom: 13,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: h, width: w }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        center={latLng}
        onChange={(obj) => console.log(obj)}
      ></GoogleMapReact>
    </div>
  );
}
