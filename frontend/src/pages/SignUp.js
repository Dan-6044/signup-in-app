import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {toast } from "react-toastify";
import "./style.css";
import Header from '../component/Header';
import Footer from '../component/Footer';


const SignUp = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) =>{
    e.preventDefault();
    try{
        const {data} = await axios.post('/api/signup', {
            name,
            email,
            password
        });

        console.log(data);

        if  (data.success === true){
            setFormData({name: '', email: '', password:''});
             toast.success("Sign up successfully, please Login!");
          
        }
        

    } catch(err){
        console.log(err.response.data.error);
        toast.error(err.response.data.error);
     
    }
}

  return (
    <div>
      <Header/>
        <Container className="container  pb-2 ">
          <Row className="justify-content-center">
            <Col sm={6}>
              <h2 className="text-center text-primary mb-4">SIGN UP</h2>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <Form.Label>
                    <i className="fa fa-user" /> Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={name}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
    
                <Form.Group>
                  <Form.Label>
                    <i className="fa fa-envelope" /> Email
                  </Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    required
                    />
                </Form.Group>
    
                <Form.Group>
                  <Form.Label>
                    <i className="fa fa-lock" /> Password
                  </Form.Label>
                  <Form.Control
                  className='mb-3'
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange}
                  required
                  />
                </Form.Group>
    
                <Button onClick={handleSubmit} type="submit" className="btn btn-primary btn-block pt-3" >
                  Register
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
        <Footer/>
      </div>
      );
      
    };

export default SignUp;
