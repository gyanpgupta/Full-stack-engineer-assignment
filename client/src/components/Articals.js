import React from "react";
import { Card, Button } from "react-bootstrap";

const Articals = (props) => {
  const { artical, readArtical } = props;

  return (
    <>
      <Card className="mx-2 my-4" style={{ width: "18rem" }}>
        <Card.Img variant="top" src={artical.image} />
        <Card.Body>
          <Card.Title>{artical.heading}</Card.Title>
          <Card.Text>{artical.description}</Card.Text>
          <Button variant="primary" onClick={() => readArtical(artical.link)}>
            Read Artical
          </Button>
        </Card.Body>
      </Card>
    </>
  );
};

export default Articals;
