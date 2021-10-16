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
  ADD_NOTE_RESET,
  DELETE_NOTE_RESET,
  UPDATE_NOTE_RESET,
} from "../../constants/subjectConstants";

import {
  Heading,
  Center,
  Box,
  useToast,
  Flex,
  Button,
} from "@chakra-ui/react";

const TopicDetailPage = ({ history, match }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isAddNoteModalOpened, setIsAddNoteModalOpened] = useState(false);
  const [isDeleteNoteModalOpened, setIsDeleteNoteModalOpened] = useState(false);
  const [isUpdateNoteModalOpened, setIsUpdateNoteModalOpened] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedNote, setSelectedNote] = useState({});

  const detailSubject = useSelector((state) => state.detailSubject);
  const { error, subject, loading } = detailSubject;

  const addNote = useSelector((state) => state.addNote);
  const { error: noteError, success: noteSuccess } = addNote;

  const deleteNote = useSelector((state) => state.deleteNote);
  const { error: noteDeleteError, success: noteDeleteSuccess } = deleteNote;

  const updateNote = useSelector((state) => state.updateNote);
  const { error: noteUpdateError, success: noteUpdateSuccess } = updateNote;

  useEffect(() => {
    if (noteDeleteSuccess) {
      toast({
        title: "Note successfully deleted",
        status: "success",
        isClosable: true,
      });
      dispatch({ type: DELETE_NOTE_RESET });
      dispatch(detailSubjectAction(match.params.id));
    }
  }, [dispatch, match, toast, noteDeleteSuccess]);

  useEffect(() => {
    if (noteUpdateSuccess) {
      toast({
        title: "Note inside the topic successfully updated",
        status: "success",
        isClosable: true,
      });
      dispatch({ type: UPDATE_NOTE_RESET });
      dispatch(detailSubjectAction(match.params.id));
    }
  }, [dispatch, match, toast, noteUpdateSuccess]);

  useEffect(() => {
    if (noteSuccess) {
      toast({
        title: "Note successfully added to the subject",
        status: "success",
        isClosable: true,
      });
      dispatch({ type: ADD_NOTE_RESET });
      dispatch(detailSubjectAction(match.params.id));
    }
  }, [dispatch, match, toast, noteSuccess]);

  useEffect(() => {
    if (error || noteError || noteUpdateError || noteDeleteError) {
      toast({
        title: error,
        status: "error",
        isClosable: true,
      });
      dispatch({ type: DELETE_NOTE_RESET });
      dispatch({ type: UPDATE_NOTE_RESET });
      dispatch({ type: DETAIL_SUBJECT_RESET });
    }
    dispatch(detailSubjectAction(match.params.id));
  }, [dispatch, match, error, noteError, noteUpdateError, noteDeleteError, toast]);

  const openAddNoteModal = () => {
    setIsAddNoteModalOpened(true);
  };

  const closeAddTopicModal = () => {
    setIsAddNoteModalOpened(false);
  };

  const closeUpdateTopicModal = () => {
    setIsUpdateNoteModalOpened(false);
  };

  const closeDeleteTopicModal = () => {
    setIsDeleteNoteModalOpened(false);
  };

  const deleteNoteHelper = (topicId) => {
    setIsDeleteNoteModalOpened(true);
    const selectedTopic = subject.topics.find((item) => item._id === topicId)
    setSelectedNote(selectedTopic)
    setDeleteMessage(`Are you sure you want to delete topic named ${selectedTopic.topicName} ?`)
  }

  const updateNoteHelper = (topicId) => {
    setIsUpdateNoteModalOpened(true);
    const selectedTopic = subject.topics.find((item) => item._id === topicId)
    setSelectedNote(selectedTopic)
  }

  const deleteTopicConfirm = () => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedNote._id
    }
    dispatch(deleteTopicAction(payload))
    setIsDeleteNoteModalOpened(false);
  }

  const updateTopicConfirm = (values) => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedNote._id,
      topicName: values.topicName,
      topicDescription: values.topicDescription
    }
    dispatch(updateTopicAction(payload))
    setIsUpdateNoteModalOpened(false)
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
          Topic Detail
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
            >
              Add Note
            </Button>
          </Flex>
          <AddTopicModal
            isModalOpened={isAddNoteModalOpened}
            closeModal={closeAddTopicModal}
            confirmAction={addTopicConfirm}
            modalTitle="Add Topic"
          />
          <UpdateTopicModal
            isModalOpened={isUpdateNoteModalOpened}
            closeModal={closeUpdateTopicModal}
            confirmAction={updateTopicConfirm}
            modalTitle="Update Note"
            selectedTopic={selectedNote}
          />
          <ConfirmModal
            isModalOpened={isDeleteNoteModalOpened}
            closeModal={closeDeleteTopicModal}
            confirmAction={deleteTopicConfirm}
            confirmMessage={deleteMessage}
            modalTitle="Delete Note"
          />
        </Box>
      )}
    </Box>
  );
};

export default TopicDetailPage;
