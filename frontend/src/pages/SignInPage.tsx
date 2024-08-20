import SignIn from "../components/Authentication/SignIn";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../utils/firebase";
import React, { useState } from "react";
import Snackbar from "../components/SnackBar";
import {useNavigate} from "react-router-dom";

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

        try {
            await signInWithEmailAndPassword(auth, email, password);
            setSnackbar({ open: true, message: 'User signed in successfully' });
            navigate('/post-login');
        } catch (error: any) {
            if(error.message.split('Firebase: ')[1].includes('missing-password')){
                setSnackbar({ open: true, message: 'Please enter the password' });
            }
            else if(error.message.split('Firebase: ')[1].includes('invalid-email')){
                setSnackbar({ open: true, message: 'Invalid email' });
            }
            else if(error.message.split('Firebase: ')[1].includes('invalid-credential')){
                setSnackbar({ open: true, message: 'Invalid credentials' });
            }
            else{
                setSnackbar({ open: true, message: `${error.message}` });
                console.error('Error signing in:', error);
            }

        }
    };

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

    const handleForgotPassword = async () => {
        const { email, password } = formData;

        if (!email) {
            setSnackbar({ open: true, message: 'Please enter your email address' });
            return;
        }

        try {
            await signInWithEmailAndPassword(auth, email, password);
            await sendPasswordResetEmail(auth, email);
            setSnackbar({ open: true, message: 'Password reset email sent' });
        } catch (error: any) {
            setSnackbar({ open: true, message: `${error.message}` });
            console.error('Error sending password reset email:', error);
        }
    };

    return (
        <>
            {snackbar.open && <Snackbar message={snackbar.message} onClose={() => setSnackbar({ open: false, message: '' })} />}
            <SignIn
                onSignIn={handleSignIn}
                onSignInWithGoogle={handleSignInWithGoogle}
                onForgotPassword={handleForgotPassword}
                formData={formData}
                setFormData={setFormData}
            />
        </>
    );
};

export default SignInPage;
