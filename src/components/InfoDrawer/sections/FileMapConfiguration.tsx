import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import {
  selectMapConfig,
  setShowAllDatapointsOnMap,
  setShowClustersOnMap,
} from "@/lib/redux/slices/map-configuration";
import { Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { ChangeEvent, ReactElement } from "react";

export default function MapConfiguration(): ReactElement {
  return (
    <VStack width={"full"} spacing={"10px"}>
      <ShowClustersOnMap />
      <ShowAllDatapointsCheckbox />
    </VStack>
  );
}

function ShowAllDatapointsCheckbox(): ReactElement {
  const { showAllDatapointsOnMap } = useAppSelector(selectMapConfig);
  const dispatch = useAppDispatch();

  return (
    <VStack width={"full"}>
      <HStack width={"full"}>
        <Checkbox
          defaultChecked={showAllDatapointsOnMap}
          checked={showAllDatapointsOnMap}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            dispatch(setShowAllDatapointsOnMap(e.target.checked));
          }}
        />
        <Text>Show all datapoints on map</Text>
      </HStack>
    </VStack>
  );
}

function ShowClustersOnMap(): ReactElement {
  const { showClustersOnMap } = useAppSelector(selectMapConfig);
  const dispatch = useAppDispatch();

  return (
    <VStack width={"full"}>
      <HStack width={"full"}>
        <Checkbox
          checked={showClustersOnMap}
          defaultChecked={showClustersOnMap}
          onChange={(e: ChangeEvent<HTMLInputElement>): void => {
            dispatch(setShowClustersOnMap(e.target.checked));
          }}
        />
        <Text>Show clusters on map</Text>
      </HStack>
    </VStack>
  );
}
