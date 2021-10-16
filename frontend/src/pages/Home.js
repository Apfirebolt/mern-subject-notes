import React, { Fragment } from "react";
import { useSelector } from 'react-redux';
import { Heading, Text } from "@chakra-ui/react";
import Loader from '../components/common/Loader'

const HomePage = () => {

  const userLogin = useSelector((state) => state.userLogin)
  const { loading } = userLogin

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Heading as="h2" size="2xl" my={3} p={3} color="gray.800" isTruncated>
            Welcome to MERN Subject Notes App written in Express, React, MongoDB and Node
          </Heading>
          <Text fontSize="xl" m={3}>
            Login and use the actions button to add Subjects, Topics with a Subject and Notes within a Topic.
          </Text>
        </Fragment>
      )}
    </>
  );
};

export default HomePage;
