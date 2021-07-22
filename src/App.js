import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigate from './components/Navigate';
import NotesList from './components/NotesList';
import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';
import BtnAddNote from './components/BtnAddNote';
import theme from './theme';
function App() {
  return (
    <ChakraProvider>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <Router>
        <Navigate />
        <Route exact path='/' component={NotesList} />
      </Router>
      <BtnAddNote />
    </ChakraProvider>
  );
}

export default App;
