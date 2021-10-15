import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailSubjectAction } from "../../actions/subjectActions.js";
import Loader from "../../components/common/Loader";
import { DETAIL_SUBJECT_RESET } from "../../constants/subjectConstants";

import {
  Container,
  Heading,
  Center,
  Box,
  useToast,
} from "@chakra-ui/react";

const SubjectDetailPage = ({ history, match }) => {
  const toast = useToast();
  const dispatch = useDispatch();
  
  const detailSubject = useSelector((state) => state.detailSubject);
  const { error, subject, loading } = detailSubject;

  useEffect(() => {
    if (error) {
      toast({
        title: error,
        status: 'error',
        isClosable: true,
      })
      dispatch({ type: DETAIL_SUBJECT_RESET })
    }
    dispatch(detailSubjectAction(match.params.id));
  }, [dispatch, match, error, toast])

  return (
    <Container p={5} maxW="xl" centerContent>
      <Center color="tomato">
        <Heading as="h4" size="lg" my={2}>
          Subject Detail
        </Heading>
      </Center>
      {loading ? (
        <Loader />
      ) : (
        <Box>
          <Heading as="h4" size="md" my={2}>
            Subject Name
          </Heading>
        </Box>
      )}
    </Container>
  );
};

export default SubjectDetailPage;
