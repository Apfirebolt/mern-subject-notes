import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdUpdate, MdPanoramaFishEye } from "react-icons/md";
import { listSubjectsAction, deleteSubjectsAction } from "../../actions/subjectActions.js";
import { DELETE_SUBJECT_RESET } from "../../constants/subjectConstants";
import Loader from "../../components/common/Loader";
import ConfirmModal from "../../components/common/ConfirmModal";

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

const SubjectListPage = ({ history }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isDeleteModalOpened, setisDeleteModalOpened] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState(''); 
  const [selectedId, setSelectedId] = useState(null);
  const listSubject = useSelector((state) => state.listSubject);
  const { error, loading, subjects } = listSubject;

  const deleteSubject = useSelector((state) => state.deleteSubject);
  const { success: deleteSuccess, error: deleteError } = deleteSubject;

  useEffect(() => {
    dispatch(listSubjectsAction());
  }, [dispatch])

  useEffect(() => {
    if (deleteSuccess) {
      toast({
        title: "Subject deleted successfully",
        status: "success",
        isClosable: true,
      });
      dispatch(listSubjectsAction());
      dispatch({ type: DELETE_SUBJECT_RESET })
    }
    if (error || deleteError) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
    }
  }, [dispatch, deleteSuccess, error, deleteError, toast]);

  const openDeleteModal = () => {
    setisDeleteModalOpened(true);
  }

  const closeDeleteModal = () => {
    setisDeleteModalOpened(false);
  }

  const deleteSubjectHelper = (subjectId) => {
    openDeleteModal();
    setSelectedId(subjectId);
    const toDeleteSubject = subjects.find((item) => toString(item._id) === toString(subjectId))
    setDeleteMessage(`Are you sure you want to delete the subject named ${toDeleteSubject.name} ?`)
  }

  const confirmDeleteSubject = () => {
    dispatch(deleteSubjectsAction(selectedId));
    closeDeleteModal();
  }

  const goToDetailPage = (subjectId) => {
    history.push(`/subjects/${subjectId}/detail`)
  }

  const goToUpdatePage = (subjectId) => {
    history.push(`/subjects/${subjectId}/update`)
  }

  return (
    <Container p={5} maxW="xl" centerContent>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          All Subjects
        </Heading>
        <ConfirmModal
          isModalOpened={isDeleteModalOpened}
          closeModal={closeDeleteModal}
          confirmAction={confirmDeleteSubject}
          confirmMessage={deleteMessage}
          modalTitle="Delete Subject"
        />
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
            {subjects && subjects.map((subject) => (
              <Tr key={subject._id}>
                <Td>{subject.name}</Td>
                <Td>{subject.topics.length}</Td>
                <Td>{subject.createdAt}</Td>
                <Td>
                  <Stack direction="row" spacing={4}>
                    <Button
                      rightIcon={<MdUpdate />}
                      colorScheme="blue"
                      color="white"
                      onClick={() => goToUpdatePage(subject._id)}
                    >
                      Update
                    </Button>
                    <Button
                      rightIcon={<MdDelete />}
                      colorScheme="red"
                      onClick={() => deleteSubjectHelper(subject._id)}
                    >
                      Delete
                    </Button>
                    <Button
                      rightIcon={<MdPanoramaFishEye />}
                      colorScheme="blue"
                      variant="outline"
                      onClick={() => goToDetailPage(subject._id)}
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
