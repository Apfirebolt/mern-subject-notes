import PropTypes from 'prop-types';
import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Button,
  ModalHeader,
  ModalBody,
  Flex,
} from "@chakra-ui/react";

const ConfirmModalComponent = ({ isModalOpened, openModal, closeModal, confirmAction, confirmMessage, modalTitle }) => {

  return (
    <>
      <Modal onClose={closeModal} isOpen={isModalOpened} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <p>{confirmMessage}</p>
          </ModalBody>
          <Flex justify="center" p={4}>
            <Button onClick={confirmAction} m={1}>Confirm</Button>
            <Button onClick={closeModal} m={1}>Close</Button>
          </Flex>
        </ModalContent>
      </Modal>
    </>
  );
};

ConfirmModalComponent.propTypes = {
  isModalOpened: PropTypes.bool,
  openModal: PropTypes.func,
  closeModal: PropTypes.func,
  confirmAction: PropTypes.func,
  confirmMessage: PropTypes.string,
  modalTitle: PropTypes.string
}

export default ConfirmModalComponent;
