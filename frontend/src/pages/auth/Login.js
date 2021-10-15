import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../actions/authActions';

import {
  Input,
  FormControl,
  FormLabel,
  Container,
  FormErrorMessage,
  Button,
  Flex,
  Heading,
  Center,
  useToast,
} from "@chakra-ui/react";

const LoginPage = ({ history }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const toast = useToast();
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, success } = userLogin

  useEffect(() => {
    if (success) {
      toast({
        title: 'Successfully logged in',
        status: 'success',
        isClosable: true,
      })
      history.push('/')
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
    dispatch(login({...values}))
  }

  return (
    <Container p={5}>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          LOGIN
        </Heading>
      </Center>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mt={2}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email field is required",
              isEmail: "This must be valid email",
            })}
          />
          <FormErrorMessage>
            {errors.email && errors.email.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.password} mt={2}>
          <FormLabel htmlFor="email">Password</FormLabel>
          <Input
            id="password"
            type="password"
            placeholder="Your Password"
            {...register("password", {
              required: "Password field is required",
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <Flex justify="center">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={loading}
            type="submit"
          >
            Sign In
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default LoginPage;