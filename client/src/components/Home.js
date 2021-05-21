import React, { useEffect, useState, useContext } from "react";
import Modal from "react-modal";
import { getArtical, getArticals } from "../services/articalsApi";
import LoginForm from "./LoginForm";
import SignUpForm from "./SignUpFrom";
import Articals from "./Articals";
import Artical from "./Artical";
import UserContext from "./hooks.js/userContext";
import Loader from "./Loader";

const modelStyle = {
  overlay: {
    backgroundColor: "grey",
  },
  content: {
    color: "blue",
  },
};

Modal.setAppElement("#root");

const Home = (props) => {
  const { modalIsOpen, setModalIsOpen, formType, setFormType } = props;

  const [articals, setArticals] = useState([]);
  const [artical, setArtical] = useState(null);
  const [readArtModelIsOPen, setReadArtModelIsOPen] = useState(false);
  const [loader, setLoder] = useState(true);

  const { setUserData } = useContext(UserContext);

  useEffect(async () => {
    await getArticals().then((data) => {
      setArticals(data?.data);
      setLoder(false);
    });
  }, []);

  const modelhandler = () => {
    setModalIsOpen(false);
  };
  const readArtModelhandler = () => {
    setReadArtModelIsOPen(false);
  };

  const fatchArtical = async (data) => {
    await getArtical(data)
      .then((resData) => {
        console.log(resData);
        setArtical(resData);
        setReadArtModelIsOPen(true);
      })
      .catch((err) => {
        alert("You are not Autharized Your,Please login first.");
        sessionStorage.clear();
        setUserData({ name: null, token: null });
        setFormType({ loginForm: true, signUpForm: false });
        setModalIsOpen(true);
      });
  };

  const checkUserLogedInOrNot = (link) => {
    const token = sessionStorage.getItem("token");
    const name = sessionStorage.getItem("name");

    if (!token && !name) {
      setFormType({ loginForm: true, signUpForm: false });
      setModalIsOpen(true);
    } else {
      fatchArtical({ link, token });
    }
  };

  return (
    <>
      <div>
        <div>{loader && <Loader />}</div>
        <div>
          {!loader &&
            articals.map((artical) => (
              <Articals
                key={artical.id}
                artical={artical}
                readArtical={checkUserLogedInOrNot}
              />
            ))}
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={modelhandler}
        style={modelStyle}
      >
        <div>
          <button onClick={modelhandler}>Close</button>
        </div>

        <div>
          {formType.loginForm && <LoginForm modelhandler={modelhandler} />}
          {formType.signUpForm && <SignUpForm modelhandler={modelhandler} />}
        </div>
      </Modal>

      <Modal
        isOpen={readArtModelIsOPen}
        onRequestClose={readArtModelhandler}
        style={modelStyle}
      >
        <div>
          <button onClick={readArtModelhandler}>Close</button>
        </div>
        <div>
          <Artical artical={artical} />
        </div>
      </Modal>
    </>
  );
};

export default Home;
