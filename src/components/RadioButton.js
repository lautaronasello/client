import React from 'react';
import { Box, useRadio } from '@chakra-ui/react';

export default function RadioButton(props) {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as='label'>
      <input {...input} />
      <Box
        {...checkbox}
        cursor='pointer'
        borderWidth='2px'
        borderRadius='full'
        borderColor='gray.300'
        w='1.5rem'
        h='1.5rem'
        bg={props.children}
        _checked={{
          boxDecorationBreak: 'none',
          border: '2px solid gray',
        }}
      ></Box>
    </Box>
  );
}
