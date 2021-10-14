import React from "react";
import { useForm } from "react-hook-form";
import {
  Input,
  FormControl,
  FormLabel,
  Container,
  FormErrorMessage,
  Button,
  Heading,
  Center,
} from "@chakra-ui/react";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm();

  function onSubmit(values) {
    return new Promise((resolve) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      });
    });
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

        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </Container>
  );
};

export default LoginPage;
