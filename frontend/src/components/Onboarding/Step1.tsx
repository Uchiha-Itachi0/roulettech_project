import React from 'react';
import OnboardingContainer from './OnboardingContainer';
import backgroundImage from '../../assets/images/onboardingImage.png';
interface Step1Props {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onSkip: () => void;
}

const Step1: React.FC<Step1Props> = ({ currentStep, totalSteps, onNext, onSkip }) => {
    return (
        <OnboardingContainer
            title="We serve incomparable delicacies"
            description="All the best restaurants with their top menu waiting for you, they cant’t wait for your order!!"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onSkip={onSkip}
            backgroundImage={backgroundImage}
        />
    );
};

export default Step1;
