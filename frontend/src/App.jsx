import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Form from "./Components/RForm/Form";
import WaitlistDashboard from "./Components/Waitlist";
import LoginForm from "./Components/LForm/Login";

function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Form />} />
          <Route path="/login" element={<LoginForm />} />
          <Route path="/waitlist-dashboard" element={<WaitlistDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
