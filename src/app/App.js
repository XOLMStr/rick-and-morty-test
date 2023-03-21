
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SingleCharPage from '../components/singleCharPage/SingleCharPage';
import MainPage from '../components/mainPage/MainPage';



function App() {

  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<MainPage/>} />
          <Route path="/character/:id" element={<SingleCharPage/>} />
        </Routes>
      </div>
    </Router>
  ); //value={inputValue}
}

export default App;
