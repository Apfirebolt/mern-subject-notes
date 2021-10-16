import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdDelete, MdUpdate, MdViewAgenda } from "react-icons/md";
import {
  getTopicAction,
  addNoteAction,
  deleteNoteAction,
  updateNoteAction,
} from "../../actions/subjectActions.js";
import Loader from "../../components/common/Loader";
import AddNoteModal from "../../components/notes/AddNoteModal";
import UpdateNoteModal from "../../components/notes/AddNoteModal";
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
  Grid,
} from "@chakra-ui/react";

const TopicDetailPage = ({ match }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  const [isAddNoteModalOpened, setIsAddNoteModalOpened] = useState(false);
  const [isDeleteNoteModalOpened, setIsDeleteNoteModalOpened] = useState(false);
  const [isUpdateNoteModalOpened, setIsUpdateNoteModalOpened] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState('');
  const [selectedNote, setSelectedNote] = useState({});

  const getTopic = useSelector((state) => state.getTopic);
  const { error, topic, loading } = getTopic;

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
      dispatch(getTopicAction(match.params.id, match.params.topicId));
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
      dispatch(getTopicAction(match.params.id, match.params.topicId));
    }
  }, [dispatch, match, toast, noteUpdateSuccess]);

  useEffect(() => {
    if (noteSuccess) {
      toast({
        title: "Note successfully added to the topic",
        status: "success",
        isClosable: true,
      });
      dispatch({ type: ADD_NOTE_RESET });
      dispatch(getTopicAction(match.params.id, match.params.topicId));
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
    dispatch(getTopicAction(match.params.id, match.params.topicId));
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

  const deleteNoteHelper = (noteId) => {
    setIsDeleteNoteModalOpened(true);
    const selectedNote = topic.notes.find((item) => item._id === noteId)
    setSelectedNote(selectedNote)
    setDeleteMessage(`Are you sure you want to delete note titled ${selectedNote.heading} ?`)
  }

  const updateNoteHelper = (noteId) => {
    setIsUpdateNoteModalOpened(true);
    const selectedNote = topic.notes.find((item) => item._id === noteId)
    setSelectedNote(selectedNote)
  }

  const deleteTopicConfirm = () => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedNote._id
    }
    dispatch(deleteNoteAction(payload))
    setIsDeleteNoteModalOpened(false);
  }

  const updateTopicConfirm = (values) => {
    const payload = {
      subjectId: match.params.id,
      topicId: selectedNote._id,
      topicName: values.topicName,
      topicDescription: values.topicDescription
    }
    dispatch(updateNoteAction(payload))
    setIsUpdateNoteModalOpened(false)
  }

  const addNoteConfirm = (data) => {
    const payload = {
      subjectId: match.params.id,
      topicId: match.params.topicId,
      heading: data.heading,
      content: data.content,
    };
    dispatch(addNoteAction(payload));
    closeAddTopicModal();
  };

  return (
    <Box p={5} centerContent>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          {topic && topic.topicName}
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
              onClick={() => openAddNoteModal()}
            >
              Add Note
            </Button>
          </Flex>
          <Grid templateColumns="repeat(1, 1fr)" gap={6} my={3}>
            {topic &&
              topic.notes &&
              topic.notes.map((note) => (
                <Box
                  key={note._id}
                  w="100%"
                  bg="green.100"
                  boxShadow="md" 
                  rounded="md"
                  color="gray.700"
                  px={2}
                  py={4}
                >
                  <Center>
                    <Heading as="h4" size="md" my={2}>
                      {note.heading}
                    </Heading>
                  </Center>
                  <Center>
                    {note.heading} - {note.content}
                  </Center>
                  <Flex justify="center" mt={3}>
                    <Button 
                      m={1} 
                      bg="blue.400" 
                      rightIcon={<MdUpdate />}
                      onClick={() => updateNoteHelper(note._id)}
                    >
                      Update
                    </Button>
                    <Button 
                      m={1} 
                      rightIcon={<MdDelete />}
                      onClick={() => deleteNoteHelper(note._id)}
                    >Delete</Button>
                  </Flex>
                </Box>
              ))}
          </Grid>
          <AddNoteModal
            isModalOpened={isAddNoteModalOpened}
            closeModal={closeAddTopicModal}
            confirmAction={addNoteConfirm}
            modalTitle="Add Note"
          />
          <UpdateNoteModal
            isModalOpened={isUpdateNoteModalOpened}
            closeModal={closeUpdateTopicModal}
            confirmAction={updateTopicConfirm}
            modalTitle="Update Note"
            selectedNote={selectedNote}
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
