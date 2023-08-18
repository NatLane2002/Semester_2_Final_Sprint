import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import DreamList from "./pages/DreamList";
import AddDream from "./pages/AddDream";
import Profile from "./pages/Profile";
import Contact from "./pages/Contact";
import Version from "./pages/Version";
import PrivacySecurity from "./pages/PrivacySecurity";
import Error404 from "./pages/Error404";
import Footer from "./components/Footer";
import { allContext } from "./context/allContext";
import { useState } from "react";
import useApi from "./hooks/useApi";
import { UserProvider } from "./context/UserContext";

function App() {
  const [curLoggedInUserName, setCurLoggedInUserName] = useState("Nathaniel");

  return (
    <UserProvider>
      <allContext.Provider
        value={{ curLoggedInUserName, setCurLoggedInUserName }}
      >
        <>
          <div className="App">
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/dreamlist" element={<DreamList />} />
              <Route path="/adddream" element={<AddDream />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/version" element={<Version />} />
              <Route path="/privacy" element={<PrivacySecurity />} />
              <Route path="*" element={<Error404 />} />
            </Routes>
            <Footer />
          </div>
        </>
      </allContext.Provider>
    </UserProvider>
  );
}

export default App;
