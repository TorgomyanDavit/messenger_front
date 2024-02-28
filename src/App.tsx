import { BrowserRouter as Router } from "react-router-dom";

import './App.scss'
import RoutesProvider from './routes';

function App() {
  
  return (
    <Router>
      <RoutesProvider />
    </Router>
  );
}

export default App