import backgroundImage from '../assets/images/onboardingImage.png';
import LoginSuccessImage from '../assets/images/LoginSuccess.png';
import {useNavigate} from "react-router-dom";
const LoginSuccessPage: React.FC = () => {
    const navigate = useNavigate();
    return (
    <div className="relative flex flex-col justify-end items-center sm:p-12 p-6 h-screen w-screen sm:w-[50vw] md:w-[40vw] lg:w-[30vw] bg-cover bg-center shadow-xl"
         style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="absolute p-6 bottom-0 w-full h-[70vh] flex flex-col items-center justify-center gap-6 bg-white rounded-tl-xl rounded-tr-xl">
            <div className="relative w-[40vw] h-[40vw] sm:w-[22vw] sm:h-[22vw] md:w-[18vw] md:h-[18vw] lg:w-[15vw] lg:h-[15vw] xl:w-[10vw] xl:h-[10vw]">
            <img
                src={LoginSuccessImage}
                alt="Login Success"
                className="w-full h-full object-contain"
            />
        </div>
            <h1 className="text-center text-[9vw] sm:text-[4.5vw] md:text-[4vw] lg:text-[3.5vw] xl:text-[3vw] font-semibold">Login Successful</h1>
            <button
                onClick={() => navigate('/tracking')}
                className="w-full bg-onboarding-yellow text-white text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] py-4 px-4 rounded-full focus:outline-none"
            >
                Go to Tracking Screen
            </button>
            <p className='text-[4vw] sm:text-[2.5vw] md:text-[2vw] lg:text-[1.5vw] xl:text-[1vw] text-gray-600 mb-6'> Logout </p>
        </div>
    </div>
    )
}

export default LoginSuccessPage;