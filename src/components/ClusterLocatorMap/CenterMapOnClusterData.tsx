import { useAppSelector } from "@/lib/redux/hooks";
import { selectClusterData } from "@/lib/redux/slices/cluster-data";
import { selectMapInstance } from "@/lib/redux/slices/map-configuration";
import { Icon, IconButton } from "@chakra-ui/react";
import bbox from "@turf/bbox";
import { ReactElement } from "react";
import { MdCenterFocusWeak } from "react-icons/md";

export default function CenterMapOnClusterData(): ReactElement | null {
  const mapRef = useAppSelector(selectMapInstance);
  const mapData = useAppSelector(selectClusterData)?.data || null;
  const boundingBox = bbox(mapData);

  return (
    <>
      {mapData !== null ? (
        <IconButton
          position={"absolute"}
          right={"10px"}
          top={"10px"}
          borderRadius={"50%"}
          zIndex={"100"}
          aria-label="Center map on cluster data"
          bg={"blue.500"}
          _hover={{ bg: "blue.600" }}
          boxShadow={"md"}
          color={"white"}
          icon={<Icon as={MdCenterFocusWeak} boxSize={4} />}
          onClick={() =>
            mapRef?.fitBounds(boundingBox, {
              padding: 80,
              maxDuration: 0,
            })
          }
        />
      ) : null}
    </>
  );
}
