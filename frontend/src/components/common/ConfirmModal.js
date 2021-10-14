import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Button,
  useDisclosure,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";

const ConfirmModalComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button onClick={onOpen}>Trigger modal</Button>

      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>A sample text</p>
          </ModalBody>
          <ModalFooter>
            <Button onClick={onClose}>Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ConfirmModalComponent;
