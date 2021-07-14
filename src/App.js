import { BrowserRouter as Router, Route } from 'react-router-dom';
import CreateNote from './components/CreateNote';
import CreateUser from './components/CreateUser';
import Navigate from './components/Navigate';
import NotesList from './components/NotesList';
import { ChakraProvider } from '@chakra-ui/react';
function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navigate />
        <Route exact path='/' component={NotesList} />
        <Route exact path='/edit/:id' component={CreateNote} />
        <Route exact path='/create' component={CreateNote} />
        <Route exact path='/user' component={CreateUser} />
      </Router>
    </ChakraProvider>
  );
}

export default App;
