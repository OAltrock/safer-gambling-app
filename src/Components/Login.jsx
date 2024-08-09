import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useLogin } from '../hooks/useLogin';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { mutate, isLoading, isError, error } = useLogin();
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [showPassword, setShowPassword] = useState(false);
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
                    `Logging in` :
                    (isError) ?
                        error.message.includes('401') ?
                            'Wrong email or password, try again!' :
                            `${error}` :
                        'login'}</span>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check style={{ display: 'flex' }}
                    type="checkbox"
                    label={<span style={{ fontSize: '.7rem' }}>Show Password</span>}
                    onChange={() => setShowPassword(!showPassword)} // Toggle password visibility
                />
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    )
}

export default Login