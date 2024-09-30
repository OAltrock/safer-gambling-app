import React from 'react';
import Button from 'react-bootstrap/Button';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const ButtonGroup = ({action, disabled}) => {
    const [_, cancel, confirm] = useSelector(state => state.languages[state.languages.current].confirmDelete);
    const navigate = useNavigate();
    return (
        <div style={{ display: 'flex', flexDirection: 'row' }}>
            <Button
                style={{ marginRight: '1.5em' }}
                variant="primary"
                type="submit"
                className="login-button"
                onClick={() => navigate(-1)}
            >
                {cancel}
            </Button>
            <Button
                variant="success"
                type="submit"
                className="login-button"
                onClick={action}
                disabled={disabled}
            >
                {confirm}
            </Button>
        </div>
    )
}

export default ButtonGroup