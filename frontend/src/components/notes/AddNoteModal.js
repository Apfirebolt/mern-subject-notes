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
  Textarea
} from "@chakra-ui/react";

const AddNoteModalComponent = ({
  isModalOpened,
  closeModal,
  confirmAction,
  modalTitle,
  selectedNote
}) => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (selectedNote) {
      reset({
        heading: selectedNote.heading,
        content: selectedNote.content,
      });
    }
  }, [selectedNote, reset]);

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
              <FormControl isInvalid={errors.heading} mt={2}>
                <FormLabel htmlFor="heading">Heading</FormLabel>
                <Input
                  id="heading"
                  type="text"
                  placeholder="Enter Heading"
                  {...register("heading", {
                    required: "Heading is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.heading && errors.heading.message}
                </FormErrorMessage>
              </FormControl>

              <FormControl isInvalid={errors.content} mt={2}>
                <FormLabel htmlFor="content">Content</FormLabel>
                <Textarea
                  id="content"
                  type="text"
                  placeholder="Enter Content"
                  size="md"
                  {...register("content", {
                    required: "Content is required",
                  })}
                />
                <FormErrorMessage>
                  {errors.content && errors.content.message}
                </FormErrorMessage>
              </FormControl>

              <Flex justify="center">
                <Button mt={4} colorScheme="teal" type="submit">
                  {selectedNote ? 'Update Note' : 'Add Note'}
                </Button>
              </Flex>
            </form>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

AddNoteModalComponent.propTypes = {
  isModalOpened: PropTypes.bool,
  closeModal: PropTypes.func,
  confirmAction: PropTypes.func,
  modalTitle: PropTypes.string,
  selectedNote: PropTypes.object
};

export default AddNoteModalComponent;
