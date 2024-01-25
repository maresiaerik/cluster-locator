import { useAppSelector } from "@/lib/redux/hooks";
import { selectSelectedCoordinates } from "@/lib/redux/slices/selected-coordinates";
import {
  createExportableGeoJsonAsEncodedUriComponent,
  exportCoordinatesAsCsv,
} from "@/lib/utils/file-exporter";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Button, Flex, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function ExportSelectedCoordinates(): ReactElement {
  const selectedCoordinates = useAppSelector(selectSelectedCoordinates);

  return (
    <Flex
      width={"full"}
      justifyContent={"center"}
      position={"relative"}
      top={"calc(100vh - 50px)"}
      zIndex={"1000"}
    >
      <Menu closeOnSelect placement="top-end">
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} bg={"blue.500"} color={"white"}>
          Export Selected Coordinates
        </MenuButton>
        <MenuList width={"full"}>
          <MenuItem onClick={() => exportCoordinatesAsCsv(selectedCoordinates)}>CSV</MenuItem>
          <MenuItem
            as={"a"}
            href={`data:' + text/json;charset=utf-8,${createExportableGeoJsonAsEncodedUriComponent(
              selectedCoordinates,
            )}`}
            download={"coordinates.json"}
          >
            GeoJSON
          </MenuItem>
        </MenuList>
      </Menu>
    </Flex>
  );
}
