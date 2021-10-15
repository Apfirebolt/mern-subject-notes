import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdUpdate, MdPanoramaFishEye } from "react-icons/md";
import {
  detailSubjectAction,
  addTopicAction,
} from "../../actions/subjectActions.js";
import Loader from "../../components/common/Loader";
import AddTopicModal from "../../components/subjects/AddTopicModal";
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

  const detailSubject = useSelector((state) => state.detailSubject);
  const { error, subject, loading } = detailSubject;

  const addTopic = useSelector((state) => state.addTopic);
  const { error: topicError, success: topicSuccess } = addTopic;

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
                    <Button m={1} bg="green.400" rightIcon={<MdUpdate />}>
                      Update
                    </Button>
                    <Button m={1} rightIcon={<MdDelete />}>Delete</Button>
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
        </Box>
      )}
    </Box>
  );
};

export default SubjectDetailPage;
