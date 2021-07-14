import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Grid,
  GridItem,
  Heading,
  ListItem,
  UnorderedList,
} from '@chakra-ui/layout';
import { Button, FormControl, Input } from '@chakra-ui/react';

export default function CreateUser() {
  const [users, setUsers] = useState('');
  const [username, setUsername] = useState('');

  useEffect(() => {
    const getUsers = async () => {
      const res = await axios.get(
        'https://mernbacknasello.herokuapp.com/api/users'
      );
      setUsers(res.data);
    };
    getUsers();
  }, [users]);

  const onChangeUsername = (e) => {
    setUsername(e.target.value);
  };

  async function onSubmit(e) {
    e.preventDefault();
    e.target.value = '';
    const res = await axios.post(
      'https://mernbacknasello.herokuapp.com/api/users',
      {
        username: username,
      }
    );
    setUsername('');
    console.log(res);
  }

  const deleteUsername = async (id, name) => {
    var confirm = window.confirm(`estas seguro de eliminar ${name}`);
    if (confirm) {
      await axios
        .delete(`https://mernbacknasello.herokuapp.com/api/users/${id}`)
        .then((res) => console.log(res))
        .catch((err) => console.log(err));
    }
  };

  return (
    <Grid
      templateRows='repeat(1,1fr)'
      templateColumns='repeat(12,1fr)'
      gap={5}
      p={5}
    >
      <GridItem
        maxH='200px'
        border='1px'
        borderColor='gray.300'
        rounded='md'
        align='center'
        colSpan={4}
        p={2}
      >
        <Heading>Create New User</Heading>
        <form onSubmit={onSubmit}>
          <FormControl isRequired p={3}>
            <Input
              my='1rem'
              placeholder='Username'
              value={username}
              onChange={onChangeUsername}
            />
            <Button type='submit'>add Username</Button>{' '}
          </FormControl>
        </form>
      </GridItem>
      <GridItem
        colSpan={8}
        border='1px'
        borderColor='gray.300'
        rounded='md'
        p={2}
      >
        <UnorderedList pl='5rem'>
          {users &&
            users.map((data) => {
              return (
                <ListItem my='2rem' key={data._id}>
                  {data.username}{' '}
                  <Button
                    fontFamily='sans-serif'
                    fontWeight='bold'
                    bg='transparent'
                    size='xs'
                    ml='3rem'
                    variant='outline'
                    rounded='none'
                    onClick={() => deleteUsername(data._id, data.username)}
                  >
                    {' '}
                    x
                  </Button>
                </ListItem>
              );
            })}
        </UnorderedList>
      </GridItem>
    </Grid>
  );
}
