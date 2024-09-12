import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useSignUp } from '../hooks/useSignUp';
import validateUserName from '../hooks/validateUserName';
import axios from 'axios';
import { useSelector } from 'react-redux';

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

    let [status, usernameMsgs, passwordMsgs, ageLabel, submit] = useSelector(state => state.languages[state.languages.current].signUpPage)

    const handleSignUp = (e) => {
        e.preventDefault();
        mutate({ userName, password, age },
            {
                onSuccess: () => {
                    navigate('/Home')
                }
            });
    };

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/users');
                setUsers(response.data);
            }
            catch (error) {
                console.error(error);
            }
        };
        fetchUsers()
    }, []);

    function getCharColor(char) {
        if (/[A-Z]/.test(char)) return 'blue';
        if (/[a-z]/.test(char)) return 'green';
        if (/[0-9]/.test(char)) return 'red';
        return 'purple'; // for special characters
    }

    function validatePassword(password) {        
        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/.test(password)
    }

    function validateAge(age) {              
        return age<18 || age>100;
    }

    return (
        <Form onSubmit={handleSignUp}>
            <span style={{ color: "var(--fdm-font-color)" }}>
                {(isLoading) ?
                    status[0] :
                    (isError) ?
                        error.message.includes('401') ?
                            status[1] :
                            `${error}` :
                        ''}</span>
            <Form.Group className="mb-3" controlId="formBasicUsername">
                <Form.Label>{usernameMsgs[0]}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={usernameMsgs[1]}
                    value={userName}
                    onChange={(e) => {
                        setUserName(e.target.value);
                        setInvalidUsername(validateUserName(users, e.target.value));
                    }
                    }
                    required
                    isInvalid={invalidUsername}
                />
                <Form.Control.Feedback type="invalid">
                    {usernameMsgs[2]}
                </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{passwordMsgs[0]}</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={passwordMsgs[0]}
                    required
                    value={password}
                    isInvalid={invalidPassword}
                    onChange={(e) => {
                        setPassword(e.target.value)
                        setInvalidPassword(validatePassword(e.target.value))
                    }} />
                {showPassword && (
                    <div style={{ marginTop: '5px' }}>
                        {password.split('').map((char, index) => (
                            <span key={index} style={{
                                color: getCharColor(char),
                                marginRight: '2px'
                            }}>{char}</span>
                        ))}
                    </div>
                )}
                <Form.Control.Feedback type="invalid">
                    {passwordMsgs[2]}
                </Form.Control.Feedback>

            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check style={{ display: 'flex' }}
                    type="checkbox"
                    label={<span style={{ fontSize: '.7rem' }}>{passwordMsgs[1]}</span>}
                    onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUserAge">
                <Form.Label>{ageLabel[0]}</Form.Label>
                <Form.Control style={{ display: 'flex' }}
                    type="number"
                    onChange={
                        (e) => {
                            setAge(e.target.value);
                            setInvalidAge(validateAge(e.target.value));
                        }
                    }
                    required
                    isInvalid={invalidAge}
                />
                <Form.Control.Feedback type="invalid">
                    {ageLabel[1]}
                </Form.Control.Feedback>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={invalidUsername || invalidPassword || invalidAge}>
                {submit}
            </Button>
        </Form>
    )
}

export default SignUp