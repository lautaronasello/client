import {
  Flex,
  HStack,
  IconButton,
  Spacer,
  Text,
  useColorMode,
} from '@chakra-ui/react';
import { FaSun, FaMoon } from 'react-icons/fa';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Navigate() {
  const { colorMode, toggleColorMode } = useColorMode();
  const isLight = colorMode === 'light';
  return (
    <Flex
      borderBottom='1px'
      borderColor='gray.300'
      w='100%'
      minH='4.5rem'
      align='center'
      px='5rem'
      color={isLight ? 'gray.600' : 'whitesmoke'}
    >
      <Link to='/'>
        <Text fontSize='1.5rem'>NotesApp</Text>
      </Link>
      <Spacer />
      <HStack spacing='1rem'>
        <Link to='/create'>
          <Text>Create Note</Text>
        </Link>
        <Link to='/user'>
          <Text>User</Text>
        </Link>
        <IconButton
          ml={3}
          isRound={true}
          bg={colorMode}
          icon={isLight ? <FaSun /> : <FaMoon />}
          onClick={toggleColorMode}
        />
      </HStack>
    </Flex>
  );
}
