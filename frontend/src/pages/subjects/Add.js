import { useForm } from "react-hook-form";
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import Message from '../components/Message'
import Loader from '../../components/common/Loader'
import { addSubject } from '../../actions/subjectActions.js'
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
} from "@chakra-ui/react";

const AddSubjectPage = () => {

  const [name, setName] = useState('');
  const handleSubmit = async event => {
    event.preventDefault();
    const payload = {
      name,
    }
    await axios.post('http://localhost:5000/api/subjects', payload)
  };
  return (
    <Container p={5}>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
            ADD SUBJECT
        </Heading>
      </Center>
      <form onSubmit={handleSubmit}>
        {name}
        <FormControl mt={2}>
          <FormLabel htmlFor="name">Subject Name</FormLabel>
          <Input
            id="name"
            placeholder="Enter Subject Name"
            onChange={(e) => setName(e.target.value)}
          />
        </FormControl>

        <Flex justify="center">
          <Button
            mt={4}
            colorScheme="teal"
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
