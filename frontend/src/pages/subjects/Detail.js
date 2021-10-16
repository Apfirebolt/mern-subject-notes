import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdUpdate, MdViewAgenda } from "react-icons/md";
import {
  detailSubjectAction,
  addTopicAction,
  deleteTopicAction,
  updateTopicAction,
} from "../../actions/subjectActions.js";
import Loader from "../../components/common/Loader";
import AddTopicModal from "../../components/subjects/AddTopicModal";
import UpdateTopicModal from "../../components/subjects/AddTopicModal";
import ConfirmModal from "../../components/common/ConfirmModal";
import {
  DETAIL_SUBJECT_RESET,
  ADD_TOPIC_RESET,
} from "../../constants/subjectConstants";

import {
  Heading,
  Center,
  Box,
  useToast,
  Flex,
  Button,
  Grid,
} from "@chakra-ui/react";

const SubjectDetailPage = ({ history, match }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isAddTopicModalOpened, setIsAddTopicModalOpened] = useState(false);
  const [isDeleteTopicModalOpened, setIsDeleteTopicModalOpened] = useState(false);
  const [isUpdateTopicModalOpened, setIsUpdateTopicModalOpened] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedTopic, setSelectedTopic] = useState({});

  const detailSubject = useSelector((state) => state.detailSubject);
  const { error, subject, loading } = detailSubject;

  const addTopic = useSelector((state) => state.addTopic);
  const { error: topicError, success: topicSuccess } = addTopic;

  const deleteTopic = useSelector((state) => state.deleteTopic);
  const { error: topicDeleteError, success: topicDeleteSuccess } = deleteTopic;

  const updateTopic = useSelector((state) => state.addTopic);
  const { error: topicUpdateError, success: topicUpdateSuccess } = updateTopic;

  useEffect(() => {
    if (topicSuccess) {
      toast({
        title: "Topic successfully added to the subject",
        status: "success",
        isClosable: true,
      });
      dispatch({ type: ADD_TOPIC_RESET });
      dispatch(detailSubjectAction(match.params.id));
    }
  }, [dispatch, match, toast, topicSuccess]);

  useEffect(() => {
    if (error || topicError) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
      dispatch({ type: DETAIL_SUBJECT_RESET });
    }
    dispatch(detailSubjectAction(match.params.id));
  }, [dispatch, match, error, topicError, toast]);

  const openAddTopicModal = () => {
    setIsAddTopicModalOpened(true);
  };

  const closeAddTopicModal = () => {
    setIsAddTopicModalOpened(false);
  };

  const closeUpdateTopicModal = () => {
    setIsUpdateTopicModalOpened(false);
  };

  const closeDeleteTopicModal = () => {
    setIsDeleteTopicModalOpened(false);
  };

  const deleteTopicHelper = (topicId) => {
    setIsDeleteTopicModalOpened(true);
    const selectedTopic = subject.topics.find((item) => item._id === topicId)
    setSelectedTopic(selectedTopic)
    setDeleteMessage(`Are you sure you want to delete topic named ${selectedTopic.topicName} ?`)
  }

  const updateTopicHelper = (topicId) => {
    setIsUpdateTopicModalOpened(true);
    const selectedTopic = subject.topics.find((item) => item._id === topicId)
    setSelectedTopic(selectedTopic)
  }

  const deleteTopicConfirm = () => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedTopic._id
    }
    dispatch(deleteTopicAction(payload))
  }

  const updateTopicConfirm = (values) => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedTopic._id,
      topicName: values.topicName,
      topicDescription: values.topicDescription
    }
    dispatch(updateTopicAction(payload))
  }

  const addTopicConfirm = (data) => {
    const payload = {
      id: match.params.id,
      topicName: data.topicName,
      topicDescription: data.topicDescription,
    };
    dispatch(addTopicAction(payload));
    closeAddTopicModal();
  };

  return (
    <Box p={5} centerContent>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          {subject && subject.name}
        </Heading>
      </Center>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Flex justify="center">
            <Button
              mt={4}
              colorScheme="teal"
              onClick={() => openAddTopicModal()}
            >
              Add Topic
            </Button>
          </Flex>
          <Grid templateColumns="repeat(3, 1fr)" gap={6} my={3}>
            {subject &&
              subject.topics &&
              subject.topics.map((topic) => (
                <Box
                  key={topic._id}
                  w="100%"
                  bg="red.200"
                  boxShadow="md" 
                  rounded="md"
                  color="gray.700"
                  px={2}
                  py={4}
                >
                  <Center>
                    <Heading as="h4" size="md" my={2}>
                      {topic.topicName}
                    </Heading>
                  </Center>
                  <Center>
                    {topic.topicName} - {topic.topicDescription}
                  </Center>
                  <Flex justify="center" mt={3}>
                    <Button 
                      m={1} 
                      bg="green.400" 
                      rightIcon={<MdUpdate />}
                      onClick={() => updateTopicHelper(topic._id)}
                    >
                      Update
                    </Button>
                    <Button 
                      m={1} 
                      bg="blue.300" 
                      rightIcon={<MdViewAgenda />}
                    >
                      View
                    </Button>
                    <Button 
                      m={1} 
                      rightIcon={<MdDelete />}
                      onClick={() => deleteTopicHelper(topic._id)}
                    >Delete</Button>
                  </Flex>
                </Box>
              ))}
          </Grid>
          <AddTopicModal
            isModalOpened={isAddTopicModalOpened}
            closeModal={closeAddTopicModal}
            confirmAction={addTopicConfirm}
            modalTitle="Add Topic"
          />
          <UpdateTopicModal
            isModalOpened={isUpdateTopicModalOpened}
            closeModal={closeUpdateTopicModal}
            confirmAction={updateTopicConfirm}
            modalTitle="Update Topic"
            selectedTopic={selectedTopic}
          />
          <ConfirmModal
            isModalOpened={isDeleteTopicModalOpened}
            closeModal={closeDeleteTopicModal}
            confirmAction={deleteTopicConfirm}
            confirmMessage={deleteMessage}
            modalTitle="Delete Topic"
          />
        </Box>
      )}
    </Box>
  );
};

export default SubjectDetailPage;
