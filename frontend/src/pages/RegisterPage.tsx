import React, { useState } from 'react';
import Register from "../components/Authentication/Register";
import Snackbar from "../components/SnackBar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import handleResponseError from "../utils/handleErrorResponse";
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth';
import { auth } from "../utils/firebase";


const RegisterPage: React.FC = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        username: '',
        agreeTerms: false,
    });
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });



    const handleRegister = async (e: any) => {
        e.preventDefault();
        const { email, password, username } = formData;

        if (email && password && username) {
            if(!formData.agreeTerms){
                setSnackbar({ open: true, message: 'Please agree to terms and conditions' });
                return;
            }
            try {
                const response = await axios.post('http://localhost:8000/api/auth/register/', {
                    email,
                    password,
                    username,
                });
                setSnackbar({ open: true, message: 'User registered successfully' });
                navigate('/post-login');
            } catch (error: any) {
                setSnackbar({open: true, message: handleResponseError(error)})
                console.error('Error registering:', error);
            }
        } else {
            setSnackbar({ open: true, message: 'Please fill all fields' });
        }
    };

    const handleRegisterWithGoogle = async () => {
        try{
            const provider = new GoogleAuthProvider()
            await signInWithPopup(auth, provider);
            setSnackbar({ open: true, message: 'User registered successfully' });
            navigate('/post-login');
        }
        catch(error: any){
            setSnackbar({ open: true, message: `${error.message}` });
            console.error('Error registering user with Google:', error);
        }

    };

    return (
        <>
            {snackbar.open && <Snackbar message={snackbar.message} onClose={() => setSnackbar({ open: false, message: '' })} />}
            <Register
                onRegister={(e: any) => handleRegister(e)}
                formData={formData}
                setFormData={setFormData}
             onRegisterWithGoogle={handleRegisterWithGoogle}/>
        </>
    );
};

export default RegisterPage;
