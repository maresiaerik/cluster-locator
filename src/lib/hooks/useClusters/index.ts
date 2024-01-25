import { ClusterData } from "@/lib/redux/slices/cluster-data";
import { MapConfiguration } from "@/lib/redux/slices/map-configuration";
import { BBox } from "geojson";
import useSupercluster from "use-supercluster";

export type Cluster = {
  coordinates: {
    latitude: number;
    longitude: number;
  };
  properties: ReturnType<typeof useSupercluster>["clusters"][0]["properties"];
};

type UseClustersOptions = {
  clusterData: ClusterData;
  mapBoundingBox: BBox | undefined;
  mapZoomLevel: number | undefined;
  clusterConfig: MapConfiguration["clusters"];
};

export default function useClusters({
  clusterData,
  mapBoundingBox,
  mapZoomLevel,
  clusterConfig,
}: UseClustersOptions): Cluster[] {
  const { clusters: superclusters } = useSupercluster({
    points: clusterData?.data?.features || [],
    bounds: mapBoundingBox,
    zoom: mapZoomLevel || 0,
    options: {
      radius: clusterConfig.radius,
      maxZoom: 20,
    },
  });

  const clusters: Cluster[] = [];

  if (superclusters.length > 0) {
    superclusters.forEach((cluster) => {
      clusters.push({
        coordinates: {
          latitude: cluster.geometry.coordinates[1],
          longitude: cluster.geometry.coordinates[0],
        },
        properties: cluster.properties,
      });
    });
  }

  return clusters;
}
