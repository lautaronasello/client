import React, { useEffect, useState } from 'react';
import firebase from 'firebase';
import { Box, Text } from '@chakra-ui/react';

export default function ButtonLog() {
  const [user, setUser] = useState();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        setUser(user);
      } else {
        // User is signed out
        // ...
      }
    });
  }, [user]);

  const handleLogin = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        // The signed-in user info.
      })
      .catch((error) => {
        // Handle Errors here.
        // ...
      });
  };

  const handleLogout = () => {
    firebase
      .auth()
      .signOut()
      .then((result) => {
        window.location.href = '/';
      })
      .catch((error) => console.log(`Error ${error.code}: ${error.message}`));
  };

  return (
    <Box m='1rem'>
      {user ? (
        <Text
          decoration='underline'
          _hover={{ textDecoration: 'none' }}
          cursor='pointer'
          onClick={handleLogout}
        >
          Logout
        </Text>
      ) : (
        <Text
          decoration='underline'
          _hover={{ textDecoration: 'none' }}
          cursor='pointer'
          onClick={handleLogin}
        >
          Log in
        </Text>
      )}
    </Box>
  );
}
