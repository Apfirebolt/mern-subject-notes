import React from "react";
import { Spinner, Center } from "@chakra-ui/react";

const LoaderComponent = () => {
  return (
    <Center m={4}>
      <Spinner
      thickness="4px"
      speed="0.65s"
      emptyColor="gray.200"
      color="blue.500"
      size="xl"
      />
    </Center>
  );
};

export default LoaderComponent;
