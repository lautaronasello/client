import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  VStack,
  CircularProgress,
  Text,
  Center,
  useToast,
} from '@chakra-ui/react';
import { fs, db } from '../index';

import React, { useEffect, useState } from 'react';
import { FaGoogle } from 'react-icons/fa';
export default function NotesList() {
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState();
  const toast = useToast();
  useEffect(() => {
    fs.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserId(user.uid);
      }
    });
  }, [userId]);

  useEffect(() => {
    db.collection(`${userId}`)
      .orderBy('creation_date', 'desc')
      .onSnapshot((querySnapshot) => {
        var toArray = [];
        querySnapshot.forEach((doc) => {
          toArray.push(doc.data());
        });
        setNotes(toArray);
        setLoading(false);
      });
  }, [userId]);

  var handleDelete = (doc) => {
    db.collection(`${userId}`)
      .doc(doc)
      .delete()
      .then(() => {
        toast({
          title: 'Note deleted.',
          description: 'Note deleted successfully',
          status: 'warning',
          duration: 9000,
          isClosable: true,
        });
      })
      .catch((error) => {
        console.error('Error removing document: ', error);
      });
  };

  const [notes, setNotes] = useState([]);

  if (userId === undefined)
    return (
      <Center minH='80vh'>
        Connect your google account to start writing notes
        <Box mx='1rem'> {<FaGoogle />}</Box>
      </Center>
    );

  if (loading)
    return (
      <Box align='center' justifyContent='center' d='flex' mt='40vh'>
        <CircularProgress isIndeterminate color='gray.300' />
      </Box>
    );

  if (notes.length === 0)
    return (
      <>
        <Heading align='center' mt='2rem'>
          Notes:
        </Heading>
        <Center h='70vh'>
          <VStack>
            <Box>Don't have any notes yet </Box>
            <Box>:'(</Box>
          </VStack>
        </Center>
      </>
    );

  return (
    <Container align='center' maxW={'container.lg'} mt='2rem' mb='5rem'>
      <VStack spacing='2rem'>
        <Heading>Notes:</Heading>
        <SimpleGrid columns={[1, 3, null, 4]} gap='1rem'>
          {notes &&
            notes.map((data) => {
              return (
                <Box
                  key={data.title}
                  h='fit-content'
                  minW={['10rem', null, '15rem']}
                  border='1px'
                  color='#1a202c'
                  borderColor='gray.300'
                  bg={data.bg}
                  shadow='md'
                  rounded='md'
                >
                  <Box
                    cursor='pointer'
                    textAlign='right'
                    mr='0.5rem'
                    mt='0.1rem'
                    onClick={() => handleDelete(data.title)}
                  >
                    x
                  </Box>
                  <VStack px='1rem' pb='1rem'>
                    <Box
                      fontSize='lg'
                      wordBreak='break-word'
                      textTransform='uppercase'
                      fontWeight='semibold'
                    >
                      {data.title}
                    </Box>
                    <Text minH='4rem' verticalAlign='center' fontWeight='light'>
                      {data.text}
                    </Text>
                    <Text verticalAlign='center' fontWeight='light'>
                      {data.creation_date}
                    </Text>
                  </VStack>
                </Box>
              );
            })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
