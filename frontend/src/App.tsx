import { Route, Routes, BrowserRouter } from "react-router-dom";
import GooglePage from "./GoogleAuth/GooglePage";
import Letter from "./Letter/Letter";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<GooglePage />} />
          <Route path="/letter" element={<Letter />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
