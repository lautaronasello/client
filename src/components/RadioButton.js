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
        borderWidth='1px'
        borderRadius='full'
        w='1.5rem'
        h='1.5rem'
        bg={props.children}
        _checked={{
          border: '2px solid grey',
        }}
      >
        {''}
      </Box>
    </Box>
  );
}
