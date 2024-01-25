import { useAppSelector } from "@/lib/redux/hooks";
import { selectSelectedCoordinates } from "@/lib/redux/slices/selected-coordinates";
import { Flex, Icon } from "@chakra-ui/react";
import { ReactElement } from "react";
import { FaMapMarker } from "react-icons/fa";
import { Marker } from "react-map-gl";

export default function SelectedCoordinatesMapMarkers(): ReactElement {
  const selectedCoordinates = useAppSelector(selectSelectedCoordinates);

  return (
    <>
      {selectedCoordinates.map((coordinates, coordIdx) => (
        <Marker
          key={coordIdx}
          longitude={coordinates.longitude}
          latitude={coordinates.latitude}
          offset={[15, -15]}
          style={{
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          <Flex>
            <Icon as={FaMapMarker} color={"green.500"} boxSize={"32px"} />
            <Flex
              position={"relative"}
              left={"-32px"}
              justifyContent={"center"}
              top={"2px"}
              color={"white"}
              fontWeight={600}
              fontSize={coordIdx + 1 > 99 ? "10px" : "xs"}
              width={"32px"}
            >
              {coordIdx + 1}
            </Flex>
          </Flex>
        </Marker>
      ))}
    </>
  );
}
