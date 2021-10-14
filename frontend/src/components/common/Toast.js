import React from "react";
import { Wrap, WrapItem, Button, useToast } from "@chakra-ui/react";

const ToastComponent = () => {
  const toast = useToast();
  const statuses = ["success", "error", "warning", "info"];

  return (
    <Wrap>
      {statuses.map((status, i) => (
        <WrapItem key={i}>
          <Button
            onClick={() =>
              toast({
                title: `${status} toast`,
                status: status,
                isClosable: true,
              })
            }
          >
            Show {status} toast
          </Button>
        </WrapItem>
      ))}
    </Wrap>
  );
};

export default ToastComponent;
