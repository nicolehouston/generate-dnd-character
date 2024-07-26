import './App.css';
import {Container} from '@mui/material';
import CharacterImage from './components/CharacterImage';
import Header from './components/Header';

function App() {
  return (
    <Container>
      <Header />
      <CharacterImage />
    </Container>
  );
}

export default App;
