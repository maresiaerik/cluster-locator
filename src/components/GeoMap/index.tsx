"use client";

import mapboxgl from "mapbox-gl";
import { PropsWithChildren, ReactElement, Ref, forwardRef } from "react";
import { Map, MapProps, MapRef } from "react-map-gl";

function GeoMap(props: PropsWithChildren<MapProps>, ref: Ref<MapRef>): ReactElement {
  return (
    <Map
      ref={ref}
      mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      onRender={(e): mapboxgl.Map => e.target.resize()}
      style={{ width: "100%", height: "100%" }}
      {...props}
    >
      {props.children}
    </Map>
  );
}

export default forwardRef(GeoMap);
