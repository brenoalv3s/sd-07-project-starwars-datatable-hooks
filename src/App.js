import React from 'react';
import { StarWarsProvider } from './context/StarWarsContext';
import Home from './pages/Home';

function App() {
  return (
    <StarWarsProvider>
      <Home />
    </StarWarsProvider>
  );
}

export default App;
