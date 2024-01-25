"use client";

import { Accordion, Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

import { useAppSelector } from "@/lib/redux/hooks";
import { selectClusterData } from "@/lib/redux/slices/cluster-data";
import { selectSelectedCoordinates } from "@/lib/redux/slices/selected-coordinates";
import ExpandableAccordionItem from "./common/ExpandableAccordionItem";
import ClusterConfiguration from "./sections/ClusterConfiguration";
import MapConfiguration from "./sections/FileMapConfiguration";
import FileUpload from "./sections/FileUpload";
import SelectedCoordinates from "./sections/SelectedCoordinates";

export default function InfoDrawer(): ReactElement {
  const clusterData = useAppSelector(selectClusterData);
  const selectedCoordinates = useAppSelector(selectSelectedCoordinates);

  return (
    <VStack
      width={"350px"}
      maxH={"100vh"}
      py={"20px"}
      spacing={"20px"}
      px={"20px"}
      alignItems={"flex-start"}
      justifyContent={"flex-start"}
      overflow={"auto"}
    >
      <Accordion allowMultiple width={"full"} padding={0}>
        <VStack spacing={"10px"} width={"full"} alignItems={"flex-start"}>
          <FileUpload />

          {clusterData?.data && (
            <>
              <ExpandableAccordionItem title={"Map configuration"}>
                <MapConfiguration />
              </ExpandableAccordionItem>

              <ExpandableAccordionItem title={"Cluster configuration"}>
                <ClusterConfiguration />
              </ExpandableAccordionItem>

              {selectedCoordinates.length > 0 ? (
                <SelectedCoordinates />
              ) : (
                <Text fontSize={"xs"} color={"gray.300"} position={"relative"} my={"20px"}>
                  Click the map to select coordinates
                </Text>
              )}
            </>
          )}
        </VStack>
      </Accordion>
    </VStack>
  );
}
