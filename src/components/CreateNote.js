import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react';
export default function CreateNote() {
  const [users, setUsers] = useState('');
  const [content, setContent] = useState('');
  const [title, setTitle] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    let cancel;
    const getUsers = async () => {
      const res = await axios.get(
        'https://mernbacknasello.herokuapp.com/api/users',
        {
          cancelToken: new axios.CancelToken((c) => (cancel = c)),
        }
      );
      setUsers(res.data);
    };
    getUsers();

    return () => cancel;
  }, [users]);

  var handleChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  var titleChange = (e) => {
    setTitle(e.target.value);
  };

  var contentChange = (e) => {
    setContent(e.target.value);
  };

  var handleSubmit = async (e) => {
    await axios
      .post('https://mernbacknasello.herokuapp.com/api/notes/', {
        title: title,
        content: content,
        author: username,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      mt='5rem'
      border='1px'
      borderColor='gray.300'
      p='3rem'
      rounded='md'
      m='1rem'
    >
      <Heading pb='1rem'>Create Note</Heading>
      <form onSubmit={handleSubmit}>
        <VStack spacing='1rem'>
          <FormControl isRequired>
            <FormLabel>User</FormLabel>
            <Select
              onChange={handleChange}
              variant='flushed'
              placeholder='Select Username'
            >
              {users &&
                users.map((data) => {
                  return (
                    <option mx='5px' key={data._id} value={data.username}>
                      {data.username}
                    </option>
                  );
                })}
            </Select>
          </FormControl>
          <FormControl>
            <FormLabel>Title</FormLabel>
            <Input placeholder='My first note' onChange={titleChange} />
          </FormControl>
          <FormControl>
            <FormLabel>Note</FormLabel>
            <Textarea placeholder='My first note' onChange={contentChange} />
          </FormControl>
          <Button type='submit' variant='outline' colorScheme='gray'>
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
