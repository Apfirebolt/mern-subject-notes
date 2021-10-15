import { useForm } from "react-hook-form";
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addSubjectAction } from '../../actions/subjectActions.js'
import {
  Input,
  FormControl,
  FormLabel,
  Container,
  Button,
  Flex,
  Heading,
  Center,
  FormErrorMessage,
  useToast,
} from "@chakra-ui/react";

const AddSubjectPage = ({ history }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const dispatch = useDispatch();
  const addSubject = useSelector((state) => state.addSubject)
  const { success, error, loading } = addSubject

  useEffect(() => {
    if (success) {
      toast({
        title: 'New Subject added successfully',
        status: 'success',
        isClosable: true,
      })
      history.push('/subjects')
    } 
    if (error) {
      toast({
        title: error,
        status: 'error',
        isClosable: true,
      })
    }
  }, [history, success, error, toast])

  const onSubmit = async (values) => {
    dispatch(addSubjectAction({...values}))
  }

  return (
    <Container p={5}>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          Add Subject
        </Heading>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.name} mt={2}>
          <FormLabel htmlFor="email">Subject Name</FormLabel>
          <Input
            id="name"
            type="name"
            placeholder="Enter Subject Name"
            {...register("name", {
              required: "Subject name is required",
              isEmail: "This must be valid email",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <Flex justify="center">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            type="submit"
          >
            Add Subject
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default AddSubjectPage;
