import { Routes, Route } from "react-router-dom";

import { Header } from './components';
import { Home, Details } from './routes';

function App() {
  return (
    <>
      <Header title="Where in the world?" />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryCode" element={<Details />} />
      </Routes>
    </>
  );
}

export default App;
