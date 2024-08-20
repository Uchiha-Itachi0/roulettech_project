import React from 'react';
import OnboardingContainer from './OnboardingContainer';
import backgroundImage from '../../assets/images/onboardingImage3.png';
interface Step3Props {
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onSkip: () => void;
    onFinishStep: () => void;
}

const Step3: React.FC<Step3Props> = ({ currentStep, totalSteps, onNext, onSkip, onFinishStep }) => {
    return (
        <OnboardingContainer
            title="We serve incomparable delicacies"
            description="SAll the best restaurants with their top menu waiting for you, they cant’t wait for your order!!"
            currentStep={currentStep}
            totalSteps={totalSteps}
            onNext={onNext}
            onSkip={onSkip}
            onFinishStep={onFinishStep}
            backgroundImage={backgroundImage}
        />
    );
};

export default Step3;
