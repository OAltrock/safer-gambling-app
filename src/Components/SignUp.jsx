import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import validateUserName from '../hooks/validateUserName';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '/app/src/Styles/SignUp.css';

const SignUp = () => {
  const { mutate, isLoading, isError, error } = useSignUp();
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [userName, setUserName] = useState('');
  const [users, setUsers] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [age, setAge] = useState(0);
  const [invalidUsername, setInvalidUsername] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState(false);
  const [invalidAge, setInvalidAge] = useState(false);

  const [status, usernameMsgs, passwordMsgs, ageLabel, submit] = useSelector(
    (state) => state.languages[state.languages.current].signUpPage
  );

  const handleSignUp = (e) => {
    e.preventDefault();
    mutate(
      { userName, password, age },
      {
        onSuccess: () => {
          navigate('/Home');
        },
      }
    );
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:5000/users');
        setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  function getCharColor(char) {
    if (/[A-Z]/.test(char)) return 'blue';
    if (/[a-z]/.test(char)) return 'green';
    if (/[0-9]/.test(char)) return 'red';
    return 'purple'; // for special characters
  }

  function validatePassword(password) {
    return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password);
  }

  function validateAge(age) {
    return !age || age < 18 || age > 100;
  }

  return (
    <div className="signup-wrapper">
      <Form onSubmit={handleSignUp} className="signup-form">
        <span className="status-message">
          {isLoading
            ? status[0]
            : isError
            ? error.message.includes('401')
              ? status[1]
              : `${error}`
            : ''}
        </span>
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Label>{usernameMsgs[0]}</Form.Label>
          <Form.Control
            type="text"
            placeholder={usernameMsgs[1]}
            value={userName}
            onChange={(e) => {
              setUserName(e.target.value);
              setInvalidUsername(validateUserName(users, e.target.value));
            }}
            required
            isInvalid={invalidUsername}
            className="centered-input bigger-input"
          />
          <Form.Control.Feedback type="invalid">
            {usernameMsgs[2]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>{passwordMsgs[0]}</Form.Label>
          <Form.Control
            type={showPassword ? 'text' : 'password'}
            placeholder={passwordMsgs[0]}
            required
            value={password}
            isInvalid={invalidPassword}
            onChange={(e) => {
              setPassword(e.target.value);
              setInvalidPassword(validatePassword(e.target.value));
            }}
            className="centered-input bigger-input"
          />
          {showPassword && (
            <div style={{ marginTop: '5px' }}>
              {password.split('').map((char, index) => (
                <span
                  key={index}
                  style={{
                    color: getCharColor(char),
                    marginRight: '2px',
                  }}
                >
                  {char}
                </span>
              ))}
            </div>
          )}
          <Form.Control.Feedback type="invalid">
            {passwordMsgs[2]}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCheckbox">
          <Form.Check
            type="checkbox"
            label={<span className="checkbox-label">{passwordMsgs[1]}</span>}
            onChange={() => setShowPassword(!showPassword)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUserAge">
          <Form.Label>{ageLabel[0]}</Form.Label>
          <Form.Control
            type="number"
            onChange={(e) => {
              setAge(e.target.value);
              setInvalidAge(validateAge(e.target.value));
            }}
            required
            isInvalid={invalidAge}
            className="centered-input smaller-input"
          />
          <Form.Control.Feedback type="invalid">
            {ageLabel[1]}
          </Form.Control.Feedback>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={invalidUsername || invalidPassword || invalidAge}
          className="signup-button"
        >
          {submit}
        </Button>
      </Form>
    </div>
  );
};

export default SignUp;
