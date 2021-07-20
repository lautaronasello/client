import React, { useState, useEffect } from 'react';
import { fs, db } from '../index';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
  VStack,
  HStack,
  Text,
  useRadioGroup,
  useToast,
} from '@chakra-ui/react';
import RadioButton from './RadioButton';
export default function CreateNote(props) {
  const [title, setTitle] = useState('');
  const [text, setText] = useState('');
  const [userId, setUserId] = useState();
  const [userImg, setUserImg] = useState('');
  const [name, setName] = useState('');
  const [bgColorNote, setBgColorNote] = useState('white');
  const inputFocus = document.querySelector('#inputFocus');
  const options = ['white', 'blue', 'yellow', 'green', 'orange', 'red', 'pink'];
  const { getRootProps, getRadioProps } = useRadioGroup({
    name: 'color',
    defaultValue: 'white',
    onChange: (e) => {
      setBgColorNote(e);
    },
  });

  const group = getRootProps();
  const toast = useToast();

  useEffect(() => {
    fs.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserId(user.uid);
        setUserImg(user.photoURL);
        setName(user.displayName);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [userId]);

  var handleInputChange = (e) => {
    e.preventDefault();
    setTitle(e.target.value);
  };

  var handleTextChange = (e) => {
    e.preventDefault();
    setText(e.target.value);
  };

  var writeUserData = (name, title, text, imageUrl) => {
    if (userId) {
      var f = new Date();
      var date = f.getDate() + '/' + (f.getMonth() + 1) + '/' + f.getFullYear();
      var hour = f.getHours() + ':' + f.getMinutes() + ':' + f.getSeconds();
      db.collection(`${userId}`)
        .doc(`${title}`)
        .set({
          username: name,
          title: title,
          text: text,
          profile_picture: imageUrl,
          creation_date: date + ' ' + hour,
          bg: bgColorNote,
        })
        .then((res) => {
          toast({
            title: 'Note created.',
            description: 'Note created successfully :)',
            status: 'info',
            duration: 9000,
            isClosable: true,
          });
          setTitle('');
          setText('');
          inputFocus.focus();
        })
        .catch((e) => console.log(e));
    }
  };

  return (
    <Box mt='5rem' p='3rem' rounded='md' m='1rem'>
      <Heading pb='1rem'>Create Note</Heading>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          writeUserData(name, title, text, userImg);
        }}
      >
        <VStack spacing='1rem'>
          <FormControl isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              id='inputFocus'
              value={title}
              placeholder='Title'
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Note</FormLabel>
            <Textarea
              value={text}
              placeholder='Note text'
              onChange={handleTextChange}
            />
          </FormControl>
          <Text>Color</Text>
          <HStack {...group}>
            {options.map((value) => {
              const radio = getRadioProps({ value });
              return (
                <RadioButton key={value} {...radio}>
                  {value}
                </RadioButton>
              );
            })}
          </HStack>{' '}
          <Button
            type='submit'
            id='btnFocus'
            variant='outline'
            colorScheme='gray'
          >
            Create
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
