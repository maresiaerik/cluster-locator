import type { Cluster } from "@/lib/hooks/useClusters";
import { Flex } from "@chakra-ui/react";

import { ReactElement } from "react";
import { Marker } from "react-map-gl";

const MAX_CLUSTER_RADIUS_SIZE_IN_PX = 200;

export default function ClusterMapMarkers({ clusters }: { clusters: Cluster[] }): ReactElement {
  return (
    <>
      {clusters.map((cluster, clusterIdx) => (
        <ClusterMapMarker cluster={cluster} key={clusterIdx} noOfClusters={clusters.length} />
      ))}
    </>
  );
}

function ClusterMapMarker({
  cluster,
  noOfClusters,
}: {
  cluster: Cluster;
  noOfClusters: number;
}): ReactElement {
  const { cluster: isCluster, point_count: pointCount } = cluster.properties;

  if (isCluster) {
    const relativeClusterSize = 20 + (pointCount / noOfClusters) * 20;
    const clusterSize = Math.min(relativeClusterSize, MAX_CLUSTER_RADIUS_SIZE_IN_PX);

    return (
      <Marker
        longitude={cluster.coordinates.longitude}
        latitude={cluster.coordinates.latitude}
        style={{
          zIndex: 1,
          cursor: "pointer",
        }}
      >
        <Flex
          width={`${clusterSize}px`}
          height={`${clusterSize}px`}
          borderRadius={"50%"}
          bg={"red.400"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {pointCount}
        </Flex>
      </Marker>
    );
  }

  return (
    <Marker
      longitude={cluster.coordinates.longitude}
      latitude={cluster.coordinates.latitude}
      style={{
        zIndex: 1,
        cursor: "pointer",
      }}
    >
      <Flex
        width={"10px"}
        height={"10px"}
        borderRadius={"50%"}
        bg={"red.400"}
        justifyContent={"center"}
        alignItems={"center"}
      />
    </Marker>
  );
}
