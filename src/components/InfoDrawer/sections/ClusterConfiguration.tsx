import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectClusterConfig, setClusterRadius } from "@/lib/redux/slices/map-configuration";
import {
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { ReactElement } from "react";

const MIN_CLUSTER_RADIUS = 1;
const MAX_CLUSTER_RADIUS = 500;

export default function ClusterConfiguration(): ReactElement {
  const { radius } = useAppSelector(selectClusterConfig);
  const dispatch = useAppDispatch();

  return (
    <VStack width={"full"} alignItems={"flex-start"}>
      <HStack width={"full"} alignItems={"center"}>
        <Text>Cluster radius</Text>

        <NumberInput
          defaultValue={radius}
          min={MIN_CLUSTER_RADIUS}
          max={MAX_CLUSTER_RADIUS}
          value={radius}
          onChange={(_, val: number) => {
            dispatch(setClusterRadius(val));
          }}
          width={"100px"}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </HStack>
      <Slider
        aria-label="slider-ex-1"
        defaultValue={radius}
        min={MIN_CLUSTER_RADIUS}
        max={MAX_CLUSTER_RADIUS}
        value={radius}
        onChange={(val: number) => {
          dispatch(setClusterRadius(val));
        }}
      >
        <SliderTrack>
          <SliderFilledTrack />
        </SliderTrack>
        <SliderThumb />
      </Slider>
    </VStack>
  );
}
