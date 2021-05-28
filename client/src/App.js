import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import Home from './components/Home';
import UserContext from './components/hooks.js/userContext';

const formTypeInitialState = { loginForm: false, signUpForm: false };
const userdataInitialState = { name: null, token: null };

function App() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [userdata, setUserData] = useState(userdataInitialState);
  const [formType, setFormType] = useState(formTypeInitialState);

  useEffect(() => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');
    if (token) {
      setUserData({ ...userdata, name, token });
    } else {
      setUserData(userdataInitialState);
    }
  }, []);

  const logOutHandler = () => {
    sessionStorage.clear();
    setUserData({ name: null, token: null });
  };

  return (
    <div className='App'>
      <UserContext.Provider value={{ userdata, setUserData }}>
        <Header
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setFormType={setFormType}
          logOutHandler={logOutHandler}
        />
        <Home
          modalIsOpen={modalIsOpen}
          setModalIsOpen={setModalIsOpen}
          setFormType={setFormType}
          formType={formType}
          logOutHandler={logOutHandler}
        />
      </UserContext.Provider>
    </div>
  );
}

export default App;
