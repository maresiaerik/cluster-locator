import { ClusterData } from "@/lib/redux/slices/cluster-data";
import { Flex } from "@chakra-ui/react";
import { ReactElement } from "react";
import { Marker } from "react-map-gl";

export default function AllDatapointsMapMarkers({
  clusterData,
}: {
  clusterData: ClusterData;
}): ReactElement {
  return (
    <>
      {clusterData?.data?.features.map((feature, featureIdx) => (
        <Marker
          key={featureIdx}
          longitude={feature.geometry.coordinates[0]}
          latitude={feature.geometry.coordinates[1]}
          style={{
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          <Flex
            width={"10px"}
            height={"10px"}
            borderRadius={"50%"}
            bg={"blue.500"}
            justifyContent={"center"}
            alignItems={"center"}
            opacity={0.7}
          />
        </Marker>
      ))}
    </>
  );
}
