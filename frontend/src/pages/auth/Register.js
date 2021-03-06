import { useForm } from "react-hook-form";
import React from 'react'
import axiosInstance from '../../plugins/interceptor'

import {
  Input,
  FormControl,
  FormLabel,
  FormHelperText,
  Container,
  FormErrorMessage,
  Button,
  Flex,
  Heading,
  Center,
  useToast
} from "@chakra-ui/react";

const RegisterPage = ({ history }) => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  const toast = useToast()

  const onSubmit = async (values) => {
    if (values.password !== values.confirmPassword) {
      console.log('Passwords do not match')
    } else {
      // dispatch(register(values))
      const userCreated = await axiosInstance.post('api/auth/register', values)
      if (userCreated) {
        toast({
          title: 'Successfully registered, please login to continue',
          status: 'success',
          isClosable: true,
        })
        history.push("/login")
      }
    }
  }
  return (
    <Container p={5}>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          REGISTER
        </Heading>
      </Center>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.username} mt={2}>
          <FormLabel htmlFor="name">Username</FormLabel>
          <Input
            id="username"
            placeholder="Your Username"
            {...register("username", {
              required: "Username field is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormHelperText>You need to have a unique username</FormHelperText>
          <FormErrorMessage>
            {errors.username && errors.username.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl mt={2}>
          <FormLabel htmlFor="firstName">First Name</FormLabel>
          <Input
            id="firstName"
            placeholder="First Name"
            {...register("firstName")}
          />
        </FormControl>

        <FormControl mt={2}>
          <FormLabel htmlFor="lastName">Last Name</FormLabel>
          <Input
            id="lastName"
            placeholder="Last Name"
            {...register("lastName")}
          />
        </FormControl>

        <FormControl isInvalid={errors.email} mt={2}>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            placeholder="Your Email"
            {...register("email", {
              required: "Email field is required",
              isEmail: "This must be valid email"
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
              required: "Password field is required"
            })}
          />
          <FormErrorMessage>
            {errors.password && errors.password.message}
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={errors.confirmPassword} mt={2}>
          <FormLabel htmlFor="email">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            placeholder="Confirm Your Password"
            {...register("confirmPassword", {
              required: "Confirm Password field is required"
            })}
          />
          <FormErrorMessage>
            {errors.confirmPassword && errors.confirmPassword.message}
          </FormErrorMessage>
        </FormControl>

        <Flex justify="center">
          <Button
            mt={4}
            colorScheme="teal"
            isLoading={isSubmitting}
            type="submit"
          >
            Sign Up
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default RegisterPage;
