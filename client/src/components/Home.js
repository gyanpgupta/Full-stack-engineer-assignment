import React, { useEffect, useState, useContext } from 'react';
import Modal from 'react-modal';
import { getArtical, getArticals } from '../services/articalsApi';
import LoginForm from './LoginForm';
import SignUpForm from './SignUpFrom';
import Articals from './Articals';
import Artical from './Artical';
import UserContext from './hooks.js/userContext';
import Loader from './Loader';

const modelStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    color: 'blue',
  },
};

Modal.setAppElement('#root');

const Home = (props) => {
  const { modalIsOpen, setModalIsOpen, formType, setFormType, logOutHandler } =
    props;

  const [articals, setArticals] = useState([]);
  const [artical, setArtical] = useState(null);
  const [readArtModelIsOPen, setReadArtModelIsOPen] = useState(false);
  const [loader, setLoder] = useState(true);

  const { setUserData } = useContext(UserContext);

  useEffect(() => {
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    const result = await getArticals();
    if (result) {
      setArticals(result?.data);
      setLoder(false);
    }
  };

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
        alert('You are not Autharized Your,Please login first.');
        sessionStorage.clear();
        setUserData({ name: null, token: null });
        setFormType({ loginForm: true, signUpForm: false });
        setModalIsOpen(true);
      });
  };

  const checkUserLogedInOrNot = async (link) => {
    const token = sessionStorage.getItem('token');
    const name = sessionStorage.getItem('name');

    if (!token || !name) {
      setFormType({ loginForm: true, signUpForm: false });
      setModalIsOpen(true);
      await logOutHandler();
    } else {
      await fatchArtical({ link, token });
    }
  };

  return (
    <>
      <div>
        <div>{loader && <Loader />}</div>
        <div className='d-flex flex-wrap'>
          {!loader &&
            articals &&
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
        dialogClassName='modal-50w'
        size='sm'
        isOpen={modalIsOpen}
        onRequestClose={modelhandler}
        style={modelStyle}
      >
        <div className='text-right'>
          <button
            className='border-0 bg-transparent font-weight-bold'
            onClick={modelhandler}
            style={{ fontSize: '3rem' }}
          >
            &times;
          </button>
        </div>
        <div>
          {formType.loginForm && (
            <LoginForm {...props} modelhandler={modelhandler} />
          )}
          {formType.signUpForm && (
            <SignUpForm {...props} modelhandler={modelhandler} />
          )}
        </div>
      </Modal>

      <Modal
        isOpen={readArtModelIsOPen}
        onRequestClose={readArtModelhandler}
        style={modelStyle}
      >
        <div className='text-right'>
          <button
            className='border-0 bg-transparent font-weight-bold'
            onClick={readArtModelhandler}
            style={{ fontSize: '3rem' }}
          >
            &times;
          </button>
        </div>
        <div>
          <Artical artical={artical} />
        </div>
      </Modal>
    </>
  );
};

export default Home;
