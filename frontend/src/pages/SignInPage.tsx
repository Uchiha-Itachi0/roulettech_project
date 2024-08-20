import React, { useState } from 'react';
import SignIn from "../components/Authentication/SignIn";
import Snackbar from "../components/SnackBar";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import handleResponseError from "../utils/handleErrorResponse";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../utils/firebase";

const SignInPage: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });

    const handleSignIn = async (e: React.FormEvent) => {
        e.preventDefault();
        const { email, password } = formData;
        if(email.length === 0 || password.length === 0){
            setSnackbar({ open: true, message: 'Field must not be empty' });
            return;
        }

        try {
            const response = await axios.post('http://localhost:8000/api/auth/login/', {
                email,  // Use email key here
                password,
            });
            localStorage.setItem('token', response.data.token);
            setSnackbar({ open: true, message: 'User signed in successfully' });
            navigate('/post-login');
        } catch (error: any) {
            setSnackbar({ open: true, message: handleResponseError(error) });
            console.error('Error signing in:', error);
        }
    };

    const handleForgotPassword = () => {}
    const handleSignInWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            await signInWithPopup(auth, provider);
            setSnackbar({ open: true, message: 'User signed in successfully' });
            navigate('/post-login');
        } catch (error: any) {
            setSnackbar({ open: true, message: `${error.message}` });
            console.error('Error signing in with Google:', error);
        }
    };
    return (
        <>
            {snackbar.open && <Snackbar message={snackbar.message} onClose={() => setSnackbar({ open: false, message: '' })} />}
            <SignIn
                onSignIn={handleSignIn}
                formData={formData}
                setFormData={setFormData}
             onForgotPassword={handleForgotPassword}
                onSignInWithGoogle={handleSignInWithGoogle}/>
        </>
    );
};

export default SignInPage;
