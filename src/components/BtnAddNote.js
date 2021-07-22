import {
  Box,
  Center,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
  useColorModeValue,
} from '@chakra-ui/react';
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import CreateNote from './CreateNote';

export default function BtnAddNote() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bg = useColorModeValue('gray.300', '#1a202c');
  return (
    <>
      <Box
        pos='absolute'
        right={['2rem', '5rem']}
        top={['75vh', '80vh']}
        w={['3.5rem', '5rem']}
        h={['3.5rem', '5rem']}
        bg={bg}
        rounded='full'
        cursor='pointer'
        position='fixed'
        shadow='lg'
        _hover={{
          shadow: 'dark-lg',
        }}
        onClick={onOpen}
      >
        <Center fontSize={['1rem', '2rem']} h='100%'>
          <FaPlus />
        </Center>
      </Box>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <CreateNote />
          <ModalCloseButton />
        </ModalContent>
      </Modal>
    </>
  );
}
