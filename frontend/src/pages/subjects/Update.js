import { useForm } from "react-hook-form";
import React, { useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/common/Loader";
import {
  updateSubjectAction,
  detailSubjectAction,
} from "../../actions/subjectActions.js";
import { UPDATE_SUBJECT_RESET } from "../../constants/subjectConstants";
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

const UpdateSubjectPage = ({ history, match }) => {

  const toast = useToast();
  const dispatch = useDispatch();

  const detailSubject = useSelector((state) => state.detailSubject);
  const { error, subject, loading } = detailSubject;

  const updateSubject = useSelector((state) => state.updateSubject);
  const { 
    error: updateError, loading: updateLoading, success: updateSuccess 
  } = updateSubject;

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (subject) {
      reset({
        name: subject.name,
      });
    }
  }, [subject, reset]);

  useEffect(() => {
    if (updateSuccess) {
      toast({
        title: "Subject successfully updated",
        status: "success",
        isClosable: true,
      });
      history.push('/subjects');
      dispatch({ type: UPDATE_SUBJECT_RESET });
    }
    if (error || updateError) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
      dispatch({ type: UPDATE_SUBJECT_RESET });
    }
    dispatch(detailSubjectAction(match.params.id));
  }, [dispatch, history, match, error, updateError, toast, updateSuccess]);

  const onSubmit = async (values) => {
    const payload = {
      id: subject._id,
      name: values.name
    }
    dispatch(updateSubjectAction(payload));
  };

  return (
    <Container p={5}>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Center color="tomato">
            <Heading as="h4" size="lg" my={2}>
              Update Subject
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
                })}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <Flex justify="center">
              <Button
                mt={4}
                colorScheme="teal"
                isLoading={updateLoading}
                type="submit"
              >
                Update Subject
              </Button>
            </Flex>
          </form>
        </Fragment>
      )}
    </Container>
  );
};

export default UpdateSubjectPage;
