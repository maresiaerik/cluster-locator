"use client";

import ClusterLocatorMap from "@/components/ClusterLocatorMap";
import InfoDrawer from "@/components/InfoDrawer";

import { Flex, HStack } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function Page(): ReactElement {
  return (
    <Flex width={"100vw"} height={"100vh"}>
      <HStack width={"full"} height={"full"} alignItems={"flex-start"} spacing={0}>
        <InfoDrawer />
        <ClusterLocatorMap />
      </HStack>
    </Flex>
  );
}
