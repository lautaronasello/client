import {
  Box,
  Container,
  Heading,
  SimpleGrid,
  Text,
  VStack,
  CircularProgress,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function NotesList() {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancel;
    const getNotes = async () => {
      const res = await axios.get(
        'https://mernbacknasello.herokuapp.com/api/notes/',
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );
      setNotes(res.data);
    };
    getNotes();
    setLoading(false);
    return () => cancel;
  }, [notes]);

  var deleteNote = async (id) => {
    await axios.delete(`https://mernbacknasello.herokuapp.com/api/notes/${id}`);
  };

  if (loading)
    return (
      <Box align='center' justifyContent='center' d='flex' mt='40vh'>
        <CircularProgress isIndeterminate color='gray.300' />
      </Box>
    );
  return (
    <Container align='center' maxW='container.md' mt='2rem'>
      <VStack spacing='2rem'>
        <Heading>Notes</Heading>
        <SimpleGrid columns={3} gap='1rem'>
          {notes &&
            notes.map((data) => {
              return (
                <Box key={data._id} border='1px' borderColor='gray.300'>
                  <Box
                    cursor='pointer'
                    onClick={() => deleteNote(data._id)}
                    textAlign='right'
                    mr='0.5rem'
                    mt='0.1rem'
                  >
                    x
                  </Box>
                  <Box px='1rem' pb='1rem'>
                    <Box
                      fontSize='lg'
                      textTransform='uppercase'
                      fontWeight='semibold'
                    >
                      {data.title}{' '}
                    </Box>
                    <Text minH='4rem' verticalAlign='center' fontWeight='light'>
                      {data.content}
                    </Text>
                    <Box fontSize='md' fontWeight='semibold'>
                      Created by: {data.author}{' '}
                    </Box>
                  </Box>
                </Box>
              );
            })}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}
