import React, { useState } from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from 'react-bootstrap/Button';
import { Form, FormControl, InputGroup, Nav } from 'react-bootstrap';


function LoginModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div>
      <Nav.Link onClick={handleShow}>
        Login
      </Nav.Link>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Enter email and password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter your email"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    onChange={(e) => localStorage.setItem('loginEmail', e.target.value)}
                />
        </InputGroup>
                <InputGroup className="mb-3">
                <FormControl
                    placeholder="Enter your password"
                    aria-label=""
                    aria-describedby="basic-addon2"
                    onChange={(e) => localStorage.setItem('loginPassword', e.target.value)}
                />
        </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.login}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LoginModal;