import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Login = () => {
    const { mutate, isLoading, isError, error } = useLogin();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    let [status, usernameMsgs, passwordMsgs, ageLabel, submit] = useSelector(state => state.languages[state.languages.current].signUpPage)

    const handleLogin = (e) => {
        e.preventDefault();
        mutate({ email, password },
            {
                onSuccess: () => {
                    navigate('/Home')
                }

            });
    };

    return (
        <Form onSubmit={handleLogin}>
            <span style={{ color: "var(--fdm-font-color)" }}>
                {(isLoading) ?
                    status[0] :
                    (isError) ?
                        error.message.includes('401') ?
                            status[1] :
                            `${error}` :
                        ''}</span>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>{usernameMsgs[0]}</Form.Label>
                <Form.Control
                    type="text"
                    placeholder={usernameMsgs[1]}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />                
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>{passwordMsgs[0]}</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder={passwordMsgs[0]}
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check style={{ display: 'flex' }}
                    type="checkbox"
                    label={<span style={{ fontSize: '.7rem' }}>{passwordMsgs[1]}</span>}
                    onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                {submit}
            </Button>
        </Form>
    )
}

export default Login