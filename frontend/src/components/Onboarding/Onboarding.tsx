import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';

const Onboarding: React.FC = () => {

    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState<number>(1);

    const totalSteps = 3;

    const nextStep = () => {
        setCurrentStep((prevStep) => Math.min(prevStep + 1, totalSteps));
    };

    const skipStep = () => {
        setCurrentStep(totalSteps);
    };

    const onFinishStep = () => {
        navigate('/sign-in');
    }

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return <Step1 currentStep={currentStep} totalSteps={totalSteps} onNext={nextStep} onSkip={skipStep} />;
            case 2:
                return <Step2 currentStep={currentStep} totalSteps={totalSteps} onNext={nextStep} onSkip={skipStep} />;
            case 3:
                return <Step3 currentStep={currentStep} totalSteps={totalSteps} onNext={nextStep} onSkip={skipStep} onFinishStep={onFinishStep} />;
            default:
                return <Step1 currentStep={currentStep} totalSteps={totalSteps} onNext={nextStep} onSkip={skipStep} />;
        }
    };

    return (
        <div className="flex flex-col items-center justify-center overflow-hidden h-screen">
            <AnimatePresence mode='wait'>
                <motion.div
                    key={currentStep}
                    initial={{ x: '100%', opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: '-100%', opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className=""
                >
                    {renderStep()}
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default Onboarding;
