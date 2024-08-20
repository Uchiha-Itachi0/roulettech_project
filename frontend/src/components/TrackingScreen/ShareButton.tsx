import React, {useState} from 'react';
import Snackbar from "../SnackBar";

interface ShareButtonProps {
    currentSpeed: number;
}

const ShareButton: React.FC<ShareButtonProps> = ({ currentSpeed }) => {
    const [snackbar, setSnackbar] = useState({
        open: false,
        message: '',
    });

    const handleShare = () => {
        const url = `${window.location.origin}/tracking?speed=${currentSpeed}`;
        navigator.clipboard.writeText(url);
        setSnackbar({ open: true, message: 'Link copied to clipboard' });
    };

    return (
        <>
            {snackbar.open && <Snackbar message={snackbar.message} onClose={() => setSnackbar({ open: false, message: '' })} />}
            <button
                onClick={handleShare}
                className="w-full bg-onboarding-yellow text-white text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] py-4 px-4 rounded-full focus:outline-none"
            >
                Share
            </button>
        </>

    );
};

export default ShareButton;
