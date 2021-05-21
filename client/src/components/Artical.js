import React from "react";
import { Card } from "react-bootstrap";

const Artical = (props) => {
  const { artical } = props;
  return (
    <>
      <Card>
        <Card.Title>{artical.heading}</Card.Title>
        <Card.Img variant="top" src={artical.image} />
        <Card.Body>
          <Card.Text>{artical.description}</Card.Text>
        </Card.Body>
      </Card>
      <br />
    </>
  );
};

export default Artical;
