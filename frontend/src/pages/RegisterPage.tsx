import React, { useState } from 'react';
import Register from "../components/Authentication/Register";
import {createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, updateProfile} from 'firebase/auth';
import { auth } from "../utils/firebase";
import Snackbar from "../components/SnackBar";
import {useNavigate} from "react-router-dom";

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
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                await updateProfile(user, { displayName: username });
                setSnackbar({ open: true, message: 'User registered successfully' });
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
                else if(error.message.split('Firebase: ')[1].includes('weak-password')){
                    setSnackbar({ open: true, message: 'Password is too weak. Password should be of at least 6 character' });
                }
                else if(error.message.split('Firebase: ')[1].includes('email-already-in-use')){
                    setSnackbar({ open: true, message: 'Email already in use' });
                }
                else{
                    setSnackbar({ open: true, message: `${error.message}` });
                    console.error('Error signing in:', error);
                }
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
                onRegisterWithGoogle={handleRegisterWithGoogle}
                formData={formData}
                setFormData={setFormData}
            />
        </>

    );
};

export default RegisterPage;
