import React from 'react';

interface OnboardingContainerProps {
    title: string;
    description: string;
    currentStep: number;
    totalSteps: number;
    onNext: () => void;
    onSkip: () => void;
    onFinishStep?: () => void;
    backgroundImage: string;
}

const OnboardingContainer: React.FC<OnboardingContainerProps> = ({
                                                                     title,
                                                                     description,
                                                                     currentStep,
                                                                     totalSteps,
                                                                     onNext,
                                                                     onSkip,
                                                                     onFinishStep,
                                                                     backgroundImage,
                                                                 }) => {
    return (
        <div
            className="flex flex-col justify-end items-center sm:p-12 p-6 h-screen w-screen sm:w-[50vw] md:w-[40vw] lg:w-[30vw] bg-cover bg-center"
            style={{ backgroundImage: `url(${backgroundImage})` }}
        >
            <div className="w-full max-w-md p-8 rounded-[50px] bg-onboarding-yellow text-white">
                <div className="flex flex-col items-center justify-center text-center gap-4 md:px-6 px-0">
                    <h2 className="text-[8vw] sm:text-[4vw] md:text-[2.5vw] xl:text-[2vw] font-semibold leading-[8vw] sm:leading-[4.5vw] md:leading-[2.8vw] xl:leading-[2.3vw]">{title}</h2>
                    <p className="text-[3.5vw] sm:text-[2vw] md:text-[1.2vw] xl:text-[.8vw]">{description}</p>
                    <div className="mt-4 flex justify-center">
                        {Array.from({ length: totalSteps }).map((_, index) => (
                            <span
                                key={index}
                                className={`h-2 w-8 mx-1 rounded-full ${
                                    index + 1 === currentStep ? 'bg-white' : 'bg-gray-300'
                                }`}
                            ></span>
                        ))}
                    </div>
                </div>

                {currentStep < totalSteps ? (
                    <div className="flex justify-between mt-8 lg:mt-20 text-[4vw] sm:text-[2vw] md:text-[1vw]">
                        <button
                            className="bg-transparent text-white py-2 px-4 rounded"
                            onClick={onSkip}
                        >
                            Skip
                        </button>
                        <button
                            className="bg-transparent text-white py-2 px-4 rounded"
                            onClick={onNext}
                        >
                            Next <span className="">&#8594;</span>
                        </button>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center mt-10 cursor-pointer">
                        <div className="relative h-24 w-24 rounded-full bg-gradient-custom p-[1.5px]" onClick={onFinishStep}>
                            <div className="relative z-10 w-full h-full rounded-full bg-onboarding-yellow p-4">
                                <div className="flex items-center justify-center w-full h-full rounded-full bg-white">
                                    <span className="text-onboarding-yellow text-2xl">&#8594;</span>
                                </div>

                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

export default OnboardingContainer;
