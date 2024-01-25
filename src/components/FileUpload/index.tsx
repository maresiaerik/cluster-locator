import { useAppDispatch, useAppSelector } from "@/lib/redux/hooks";
import { selectClusterData, setClusterData } from "@/lib/redux/slices/cluster-data";
import readAndValidateUploadedFile from "@/lib/utils/file-reader";
import { CloseIcon } from "@chakra-ui/icons";
import { Flex, HStack, Input, InputProps, Text, VStack } from "@chakra-ui/react";
import { ReactElement, useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const ACCEPTED_FILE_TYPES = [".json", ".geojson"];

export default function FileUploader(): ReactElement {
  const [errorMessage, setErrorMessage] = useState<string>();
  const clusterData = useAppSelector(selectClusterData);
  const dispatch = useAppDispatch();

  const onDrop = useCallback(
    (files: File[]) => {
      if (files.length > 0) {
        const file = files[0];

        readAndValidateUploadedFile({
          file,
          onRead: (readFile) => {
            setErrorMessage(undefined);
            dispatch(setClusterData(readFile));
          },
          onError: (error) => {
            setErrorMessage(error);
          },
        });
      }
    },
    [dispatch],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "text/json": ACCEPTED_FILE_TYPES },
    maxFiles: 1,
  });

  return (
    <VStack width={"full"} fontSize={"sm"} alignItems={"flex-start"}>
      {clusterData !== null ? (
        <HStack
          justifyContent={"space-between"}
          borderRadius={"lg"}
          padding={"10px"}
          bg={"orange.500"}
          color={"white"}
          width={"full"}
        >
          <Text>{clusterData.name}</Text>
          <CloseIcon
            onClick={() => {
              dispatch(setClusterData(null));
            }}
            cursor={"pointer"}
          />
        </HStack>
      ) : (
        <>
          <Flex
            {...getRootProps()}
            cursor={"pointer"}
            border={"1px solid"}
            borderColor={"blue.300"}
            bg={"blue.200"}
            borderRadius={"md"}
            padding={"20px"}
            color={"white"}
            width={"full"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100px"}
          >
            <Input {...(getInputProps() as InputProps)} />
            {isDragActive ? <Text>Drop the files here ...</Text> : <Text>Select file</Text>}
          </Flex>
          {errorMessage && <Text color={"red"}>{errorMessage}</Text>}
        </>
      )}
    </VStack>
  );
}
