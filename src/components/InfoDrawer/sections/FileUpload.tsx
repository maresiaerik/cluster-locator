import FileUploader from "@/components/FileUpload";
import { Text, VStack } from "@chakra-ui/react";
import { ReactElement } from "react";

export default function FileUpload(): ReactElement {
  return (
    <VStack width={"full"} fontSize={"sm"} alignItems={"flex-start"} mb={"20px"}>
      <Text fontSize={"lg"} fontWeight={600}>
        Dataset
      </Text>
      <FileUploader />
    </VStack>
  );
}
