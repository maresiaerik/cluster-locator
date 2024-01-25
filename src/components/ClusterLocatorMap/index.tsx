"use client";

import useClusters from "@/lib/hooks/useClusters";
import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectClusterData } from "@/lib/redux/slices/cluster-data";
import {
  selectClusterConfig,
  selectMapConfig,
  selectMapInstance,
  setMapInstance,
} from "@/lib/redux/slices/map-configuration";
import {
  addSelectedCoordinates,
  selectSelectedCoordinates,
} from "@/lib/redux/slices/selected-coordinates";
import bbox from "@turf/bbox";
import type { BBox } from "geojson";
import { ReactElement, useEffect, useState } from "react";
import {
  LngLatBoundsLike,
  MapLayerMouseEvent,
  MapboxEvent,
  ViewStateChangeEvent,
} from "react-map-gl";
import GeoMap from "../GeoMap";
import CenterMapOnClusterData from "./CenterMapOnClusterData";
import ExportSelectedCoordinates from "./ExportSelectedCoordinates";
import AllDatapointsMapMarkers from "./MapMarkers/AllDatapointsMapMarkers";
import ClusterMapMarkers from "./MapMarkers/ClusterMapMarkers";
import SelectedCoordinatesMapMarkers from "./MapMarkers/SelectedCoordinatesMapMarkers";

export default function ClusterLocatorMap(): ReactElement {
  const dispatch = useAppDispatch();

  const mapRef = useAppSelector(selectMapInstance);
  const [mapZoomLevel, setMapZoomLevel] = useState<number>();

  const { showAllDatapointsOnMap, showClustersOnMap } = useAppSelector(selectMapConfig);
  const clusterConfig = useAppSelector(selectClusterConfig);
  const clusterData = useAppSelector(selectClusterData);
  const selectedCoordinates = useAppSelector(selectSelectedCoordinates);

  const showSelectedCoordinatesOnMap = selectedCoordinates.length > 0;

  const [mapBoundingBox, setMapBoundingBox] = useState<BBox>();

  const clusters = useClusters({
    clusterData,
    clusterConfig,
    mapBoundingBox,
    mapZoomLevel,
  });

  useEffect(() => {
    if (clusterData?.data != null) {
      const newBbox: BBox = bbox(clusterData.data);

      setMapBoundingBox(newBbox);
      mapRef?.fitBounds(newBbox as LngLatBoundsLike, {
        padding: 80,
        maxDuration: 0,
      });
    }
  }, [clusterData?.data]);

  return (
    <GeoMap
      onLoad={(e: MapboxEvent): void => {
        setMapBoundingBox(e.target.getBounds().toArray().flat() as BBox);
        setMapZoomLevel(e.target.getZoom());
        dispatch(setMapInstance(e.target));
      }}
      onMove={(e: ViewStateChangeEvent): void =>
        setMapBoundingBox(e.target.getBounds().toArray().flat() as BBox)
      }
      onZoom={(e: ViewStateChangeEvent): void => setMapZoomLevel(e.target.getZoom())}
      onClick={(e: MapLayerMouseEvent): void => {
        const [longitude, latitude] = e.lngLat.toArray();

        dispatch(
          addSelectedCoordinates({
            latitude,
            longitude,
          }),
        );
      }}
    >
      {showAllDatapointsOnMap && <AllDatapointsMapMarkers clusterData={clusterData} />}
      {showClustersOnMap && <ClusterMapMarkers clusters={clusters} />}
      {showSelectedCoordinatesOnMap && <SelectedCoordinatesMapMarkers />}

      {showSelectedCoordinatesOnMap && <ExportSelectedCoordinates />}

      <CenterMapOnClusterData />
    </GeoMap>
  );
}
