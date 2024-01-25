import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  removeSelectedCoordinatesAtIdx,
  selectSelectedCoordinates,
} from "@/lib/redux/slices/selected-coordinates";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex, HStack, IconButton, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function SelectedCoordinates(): ReactElement {
  const selectedCoordinates = useAppSelector(selectSelectedCoordinates);

  return (
    <VStack width={"full"} fontSize={"sm"} alignItems={"flex-start"}>
      <Text fontSize={"lg"} fontWeight={600}>
        Selected coordinates
      </Text>
      <VStack width={"full"} overflow={"auto"}>
        {selectedCoordinates.map((coordinates, coordIdx) => (
          <CoordinateBox
            key={coordIdx}
            coordinatesIdx={coordIdx}
            latitude={coordinates.latitude.toFixed(6)}
            longitude={coordinates.longitude.toFixed(6)}
          />
        ))}
      </VStack>
    </VStack>
  );
}

function CoordinateBox({
  latitude,
  longitude,
  coordinatesIdx,
}: {
  latitude: string;
  longitude: string;
  coordinatesIdx: number;
}): ReactElement {
  const dispatch = useAppDispatch();

  const coordinatesId = coordinatesIdx + 1;

  return (
    <HStack spacing={0} width={"full"}>
      <HStack spacing={0} alignItems={"center"} height={"62px"}>
        <Flex
          px={"5px"}
          bg={"green.700"}
          color={"white"}
          height={"full"}
          alignItems={"center"}
          justifyContent={"center"}
          borderLeftRadius={"xl"}
          width={"30px"}
          maxWidth={"30px"}
          fontSize={coordinatesId > 99 ? "10px" : "sm"}
        >
          {coordinatesId}
        </Flex>

        <VStack spacing={0}>
          <Flex
            width={"40px"}
            maxW={"40px"}
            paddingY={"5px"}
            paddingX={"10px"}
            bg={"green.700"}
            color={"white"}
          >
            <Text fontSize={"sm"}>Lat</Text>
          </Flex>

          <Flex
            width={"40px"}
            maxW={"40px"}
            paddingY={"5px"}
            paddingX={"10px"}
            bg={"green.700"}
            color={"white"}
          >
            <Text fontSize={"sm"}>Lng</Text>
          </Flex>
        </VStack>
      </HStack>

      <VStack spacing={0}>
        <Flex
          bg={"green.500"}
          color={"white"}
          paddingY={"5px"}
          paddingX={"10px"}
          width={"100px"}
          maxW={"100px"}
        >
          <Text fontSize={"sm"}>{latitude}</Text>
        </Flex>
        <Flex
          bg={"green.500"}
          color={"white"}
          paddingY={"5px"}
          paddingX={"10px"}
          width={"100px"}
          maxW={"100px"}
        >
          <Text fontSize={"sm"}>{longitude}</Text>
        </Flex>
      </VStack>

      <IconButton
        height={"62px"}
        bg={"green.500"}
        color={"white"}
        _hover={{ bg: "green.500" }}
        sx={{ "&:hover > svg": { color: "green.700" } }}
        borderLeftRadius={0}
        borderRightRadius={"xl"}
        icon={<CloseIcon />}
        aria-label={"Remove coordinates"}
        onClick={() => {
          dispatch(removeSelectedCoordinatesAtIdx(coordinatesIdx));
        }}
      />
    </HStack>
  );
}
