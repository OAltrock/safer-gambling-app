import React from 'react';
import { useMutation } from 'react-query';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setQuestionnaireDoneFalse } from '../slices/questionnaireDoneSlice';
import { setFalse } from '../slices/gameDoneSlice';
import { reset } from '../slices/questionnaireSlice';
import { useSelector } from "react-redux";
import ButtonGroup from './ButtonGroup';

const ConfirmDelete = () => {
    const [warning, cancel, confirm] = useSelector(state => state.languages[state.languages.current].confirmDelete);
    const dispatch = useDispatch();
    const deleteAccount = async () => {
        const response = await axios.delete('http://localhost:5000/delete_user', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        console.log(response)
        return response.data; // Return the response data if needed
    };

    const handleDelete = (e) => {
        e.preventDefault();
        mutate();
    };

    const navigate = useNavigate();
    const { mutate, isLoading, isError, error } = useMutation(deleteAccount, {
        onSuccess: () => {
            localStorage.removeItem('token');
            dispatch(setQuestionnaireDoneFalse())
            dispatch(setFalse())
            dispatch(reset())
            navigate('/');
        }
    });


    return (
        <div>
            {isLoading ?

                <div>Deleting</div>
                : isError ? <div>{error.message} </div>
                    :
                    <div className="login-wrapper"
                        style={{ display: 'flex', flexDirection: 'column' }}>
                        <p>{warning}</p>
                        <ButtonGroup
                            action={handleDelete}
                        />
                        {/*  <div style={{display: 'flex', flexDirection: 'row'}}>
                            <Button 
                                style={{marginRight: '1.5em'}}
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
                                onClick={handleDelete}
                            >
                                {confirm}
                            </Button>
                        </div> */}
                    </div>}
        </div>
    )
}

export default ConfirmDelete