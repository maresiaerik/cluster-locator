import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { PropsWithChildren, ReactElement } from "react";

export default function ExpandableAccordionItem({
  title,
  children,
}: PropsWithChildren<{ title: string }>): ReactElement {
  return (
    <AccordionItem border={"none"} width={"full"} padding={0}>
      <AccordionButton px={0} _hover={{ bg: "inherit" }}>
        <Box as="span" flex="1" textAlign="left" fontSize={"lg"} fontWeight={600}>
          {title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel pb={4} px={0}>
        {children}
      </AccordionPanel>
    </AccordionItem>
  );
}
