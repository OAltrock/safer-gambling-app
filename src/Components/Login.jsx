import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import "../Styles/Login.css"

const Login = () => {
  const { mutate, isLoading, isError, error } = useLogin();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [status, usernameMsgs, passwordMsgs, ageLabel, submit] = useSelector(
    (state) => state.languages[state.languages.current].signUpPage
  );

  const handleLogin = (e) => {
    e.preventDefault();
    mutate(
      { email, password },
      {
        onSuccess: () => {
          navigate('/Home');
        },
      }
    );
  };

  return (
    <div className="login-wrapper">
      <Form onSubmit={handleLogin} className="login-form">
        <span className="status-message">
          {isLoading
            ? status[0]
            : isError
            ? error.message.includes('401')
              ? status[1]
              : `${error}`
            : ''}
        </span>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>{usernameMsgs[0]}</Form.Label>
          <Form.Control
            type="text"
            placeholder={usernameMsgs[1]}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="centered-input"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{passwordMsgs[0]}</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder={passwordMsgs[0]}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="centered-input"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={<span className="checkbox-label">{passwordMsgs[1]}</span>}
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="login-button">
          {submit}
        </Button>
      </Form>
    </div>
  );
};

export default Login;
