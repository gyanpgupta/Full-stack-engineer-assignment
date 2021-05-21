import React, { useContext } from "react";
import { Card, Nav } from "react-bootstrap";
import UserContext from "./hooks.js/userContext";

const Header = (props) => {
  const { setModalIsOpen, setFormType, formType } = props;
  const { userdata, setUserData } = useContext(UserContext);

  const loginModelhandler = () => {
    setFormType({ ...formType, loginForm: true });
    setModalIsOpen(true);
  };
  const signUpModelhandler = () => {
    setFormType({ ...formType, signUpForm: true });
    setModalIsOpen(true);
  };

  const logOutHandler = () => {
    sessionStorage.clear();
    setUserData({ name: null, token: null });
  };
  return (
    <>
      <Card>
        <Card.Header>
          <Nav>
            <Nav.Item>
              <Nav.Link href="#" onClick={!userdata.name && loginModelhandler}>
                {userdata.name ? userdata.name : "Login"}
              </Nav.Link>
            </Nav.Item>
            {userdata.name && (
              <Nav.Item>
                <Nav.Link href="#" onClick={logOutHandler}>
                  log Out
                </Nav.Link>
              </Nav.Item>
            )}

            <Nav.Item>
              <Nav.Link href="#" onClick={signUpModelhandler}>
                Sign-Up
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </Card.Header>
      </Card>
    </>
  );
};

export default Header;
