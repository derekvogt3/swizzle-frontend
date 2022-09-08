import React from "react";
import GoogleMapReact from "google-map-react";

export default function SimpleMap({ latLng, h, w, loadingScript }) {
  const defaultProps = {
    center: {
      lat: 40.71286868686868686868686,
      lng: -74.0066868686868686868686,
    },
    zoom: 13,
  };

  const AnyReactComponent = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="absolute -left-8 -top-16 w-16 h-16 text-swizpurp "
    >
      <path
        fillRule="evenodd"
        d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z"
        clipRule="evenodd"
      />
    </svg>
  );
  return (
    // Important! Always set the container height explicitly
    <>
      {!loadingScript ? (
        <div style={{ height: h, width: w }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API }}
            defaultCenter={defaultProps.center}
            defaultZoom={defaultProps.zoom}
            center={latLng}
          >
            {latLng ? (
              <AnyReactComponent
                lat={latLng.lat}
                lng={latLng.lng}
                text="My Marker"
              />
            ) : (
              <></>
            )}
          </GoogleMapReact>
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
