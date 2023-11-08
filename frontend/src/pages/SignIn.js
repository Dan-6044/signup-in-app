import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { toast } from 'react-toastify';
import Header from '../component/Header';
import Footer from '../component/Footer';

const SignIn = ({ history }) => {
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const { email, password } = values;

  const handleChange = (name) => (e) => {
    setValues({ ...values, [name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const {data} = await axios.post('/api/signin', {
          email,
          password
      });

      console.log(data);

      if  (data.success === true){
          setValues({ email: '', password:''});
          toast.success("Log In successfully");
          history.push('/user/dashboard');
          if (typeof window !== "undefined"){
            localStorage.setItem("token", JSON.stringify(data));
          }
          }
        
    } catch (err) {
      console.log(err.response.data.error);
      toast.error(err.response.data.error);
    }
  };

  return (
    <div>
      <Header />
      <Container className="container pb-2">
        <Row className="justify-content-center">
          <Col sm={6}>
            <h2 className="text-center text-primary mb-4">SIGN IN</h2>
            <Form onSubmit={handleSubmit}>
              <Form.Group>
                <Form.Label>
                  <i className="fa fa-envelope" /> Email
                </Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange('email')}
                  required
                />
              </Form.Group>

              <Form.Group>
                <Form.Label>
                  <i className="fa fa-lock" /> Password
                </Form.Label>
                <Form.Control
                  className="mb-3"
                  type="password"
                  name="password"
                  value={password}
                  onChange={handleChange('password')}
                  required
                />
              </Form.Group>

              <Button
                onClick={handleSubmit}
                type="submit"
                className="btn btn-primary btn-block pt-3"
              >
                Sign In
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default SignIn;
