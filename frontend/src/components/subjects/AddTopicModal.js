import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import React, { useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalCloseButton,
  ModalContent,
  Button,
  ModalHeader,
  ModalBody,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

const AddTopicModalComponent = ({
  isModalOpened,
  closeModal,
  confirmAction,
  modalTitle,
  selectedTopic
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedTopic) {
      reset({
        topicName: selectedTopic.topicName,
        topicDescription: selectedTopic.topicDescription,
      });
    }
  }, [selectedTopic, reset]);

  const onSubmit = async (values) => {
    confirmAction(values);
  };
  
  return (
    <>
      <Modal onClose={closeModal} isOpen={isModalOpened} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modalTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form onSubmit={handleSubmit(onSubmit)}>
              <FormControl isInvalid={errors.topicName} mt={2}>
                <FormLabel htmlFor="email">Topic Name</FormLabel>
                <Input
                  id="topicName"
                  type="text"
                  placeholder="Enter Topic Name"
                  {...register("topicName", {
                    required: "Topic name is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.topicName && errors.topicName.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.topicDescription} mt={2}>
                <FormLabel htmlFor="email">Topic Description</FormLabel>
                <Input
                  id="topicDescription"
                  type="text"
                  placeholder="Enter Topic Description"
                  {...register("topicDescription", {
                    required: "Topic description is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.topicDescription && errors.topicDescription.message}
                </FormErrorMessage>
              </FormControl>

              <Flex justify="center">
                <Button mt={4} colorScheme="teal" type="submit">
                  {selectedTopic ? 'Update Topic' : 'Add Topic'}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

AddTopicModalComponent.propTypes = {
  isModalOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  confirmAction: PropTypes.func,
  modalTitle: PropTypes.string,
  selectedTopic: PropTypes.object
};

export default AddTopicModalComponent;
