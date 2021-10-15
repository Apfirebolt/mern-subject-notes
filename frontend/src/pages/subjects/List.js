import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdAdd, MdDelete, MdPanoramaFishEye } from "react-icons/md";
import { listSubjectsAction } from "../../actions/subjectActions.js";
import Loader from "../../components/common/Loader";

import {
  Container,
  Heading,
  Center,
  useToast,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Stack,
  Button,
} from "@chakra-ui/react";

const SubjectListPage = () => {
  const toast = useToast();
  const dispatch = useDispatch();
  const listSubject = useSelector((state) => state.listSubject);
  const { success, error, loading, subjects } = listSubject;

  useEffect(() => {
    if (!success) {
      dispatch(listSubjectsAction());
    }
    if (error) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    }
  }, [dispatch, success, error, toast]);

  return (
    <Container p={5}>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          All Subjects
        </Heading>
      </Center>
      {loading ? (
        <Loader />
      ) : (
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>Name</Th>
              <Th>Topics</Th>
              <Th>Created At</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {subjects.map((subject) => (
              <Tr key={subject._id}>
                <Td>{subject.name}</Td>
                <Td>{subject.topics.length}</Td>
                <Td>{subject.createdAt}</Td>
                <Td>
                  <Stack direction="row" spacing={4}>
                    <Button
                      leftIcon={<MdAdd />}
                      colorScheme="blue"
                      variant="solid"
                    >
                      Add Topic
                    </Button>
                    <Button
                      rightIcon={<MdDelete />}
                      colorScheme="red"
                      variant="outline"
                    >
                      Delete
                    </Button>
                    <Button
                      rightIcon={<MdPanoramaFishEye />}
                      colorScheme="blue"
                      variant="outline"
                    >
                      Details
                    </Button>
                  </Stack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      )}
    </Container>
  );
};

export default SubjectListPage;
