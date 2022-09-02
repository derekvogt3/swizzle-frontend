import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap({ lat, lng, h, w }) {
  const defaultProps = {
    center: {
      lat: 10.99835602,
      lng: 77.01502627,
    },
    zoom: 11,
  };

  return (
    // Important! Always set the container height explicitly
    <div style={{ height: h, width: w }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
        onChange={(obj) => console.log(obj)}
      ></GoogleMapReact>
    </div>
  );
}
