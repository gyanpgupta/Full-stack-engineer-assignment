import React, { useContext } from 'react';
import { Card, Nav } from 'react-bootstrap';
import UserContext from './hooks.js/userContext';

const Header = ({ setModalIsOpen, setFormType, formType, logOutHandler }) => {
  const { userdata, setUserData } = useContext(UserContext);

  const loginModelhandler = () => {
    setFormType({ ...formType, loginForm: true });
    setModalIsOpen(true);
  };

  const onLogOut = async () => {
    await logOutHandler();
    setUserData({ name: null, token: null });
  };

  return (
    <>
      <Card>
        <Card.Header>
          <Nav className='justify-content-end'>
            <Nav.Item>
              <Nav.Link href='#' onClick={!userdata.name && loginModelhandler}>
                {userdata.name || 'Login'}
              </Nav.Link>
            </Nav.Item>
            {userdata.name && (
              <Nav.Item>
                <Nav.Link href='#' onClick={onLogOut}>
                  log Out
                </Nav.Link>
              </Nav.Item>
            )}
          </Nav>
        </Card.Header>
      </Card>
    </>
  );
};

export default Header;
