import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Home from "./components/Home";
import UserContext from "./components/hooks.js/userContext";

const formTypeInitialState = { loginForm: false, signUpForm: false };
const userdataInitialState = { name: null, token: null };

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userdata, setUserData] = useState(userdataInitialState);
  const [formType, setFormType] = useState(formTypeInitialState);

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");
    if (token) {
      setUserData({ ...userdata, name, token });
    }
  }, []);

  return (
    <div className="App">
      <UserContext.Provider value={{ userdata, setUserData }}>
        <Header
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setFormType={setFormType}
        />
        <Home
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setFormType={setFormType}
          formType={formType}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
