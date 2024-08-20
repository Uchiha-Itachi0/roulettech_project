import React from 'react';

interface SliderProps {
    speed: number;
    setSpeed: (speed: number) => void;
}

const Slider: React.FC<SliderProps> = ({ speed, setSpeed }) => {
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSpeed(Number(event.target.value));
    };

    return (
        <div className="slider-container">
            <div className="text-xl font-bold mb-4 text-gray-900">Speed: {speed}x</div>
            <input
                type="range"
                min="1"
                max="10"
                value={speed}
                onChange={handleChange}
                step="1"
                className="slider"
            />
            <div className="text-lg font-semibold mt-2 text-gray-700">Step: {speed} seconds</div>
        </div>
    );
};

export default Slider;
