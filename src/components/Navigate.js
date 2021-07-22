import {
  Avatar,
  Flex,
  HStack,
  IconButton,
  Menu,
  Spacer,
  Text,
  useColorMode,
  MenuItem,
  MenuList,
  MenuButton,
} from '@chakra-ui/react';
import { FaSun, FaMoon, FaBars } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from 'firebase';
import useWindowDimensions from '../useWindowDimensions';
import ButtonLog from './ButtonLog';
import BtnAddNote from './BtnAddNote';

export default function Navigate() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  const [userImg, setUserImg] = useState(null);
  const [userName, setUserName] = useState(null);
  const [user, setUser] = useState();
  const { width } = useWindowDimensions();
  <BtnAddNote cm={colorMode} />;
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUserName(user.displayName);
        setUserImg(user.photoURL);
        setUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user]);

  return (
    <>
      <Flex
        borderBottom='1px'
        borderColor='gray.300'
        w='100%'
        minH='4rem'
        align='center'
        px={['2rem', '5rem']}
        bg={isLight ? 'whitesmoke' : '#1a202c'}
        color={isLight ? 'gray.600' : 'whitesmoke'}
        position='fixed'
      >
        <Link to='/'>
          <Text fontSize='1.5rem'>NotesApp</Text>
        </Link>
        <Spacer />
        {width <= 630 && (
          <HStack spacing='1rem'>
            <IconButton
              isRound={true}
              bg={colorMode}
              icon={isLight ? <FaSun /> : <FaMoon />}
              onClick={toggleColorMode}
            />
            <Menu>
              <MenuButton as={IconButton} icon={<FaBars />} />
              <MenuList textAlign='center' style={{ margin: 0 }}>
                <Avatar m='1rem' size='md' name={userName} src={userImg} />
                <ButtonLog />
              </MenuList>
            </Menu>
          </HStack>
        )}

        {width > 630 && (
          <HStack spacing='1rem'>
            <IconButton
              ml={3}
              isRound={true}
              bg={colorMode}
              icon={isLight ? <FaSun /> : <FaMoon />}
              onClick={toggleColorMode}
            />
            <ButtonLog />
            <Avatar size='md' name={userName} src={userImg} />
          </HStack>
        )}
      </Flex>
      <Flex
        borderBottom='1px'
        borderColor='gray.300'
        w='100%'
        minH='4rem'
        align='center'
        px='5rem'
        color={isLight ? 'gray.600' : 'whitesmoke'}
      ></Flex>
    </>
  );
}
