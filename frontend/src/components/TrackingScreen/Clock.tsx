import React, { useEffect, useState } from 'react';

import './Clock.css';

interface ClockProps {
    speed: number;
    glow: boolean;
    setGlow: React.Dispatch<React.SetStateAction<boolean>>

}

const Clock: React.FC<ClockProps> = ({ speed, glow, setGlow }) => {
    const [time, setTime] = useState(new Date());
    const [remainingTime, setRemainingTime] = useState(120 * 60); // 120 minutes in seconds

    useEffect(() => {
        const interval = setInterval(() => {
            setTime((prevTime) => {
                const newTime = new Date(prevTime.getTime() - 1000 * speed);
                setRemainingTime((prevRemainingTime) =>
                    Math.max(0, prevRemainingTime - speed)
                );
                return newTime;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [speed]);

    const secondsDegrees = time.getSeconds() * 6;
    const minutesDegrees = time.getMinutes() * 6;
    const hoursDegrees = ((time.getHours() + 2) * 30) + (time.getMinutes() * 6 / 12);
    const formatRemainingTime = () => {
        const hours = Math.floor(remainingTime / 3600);
        const minutes = Math.floor((remainingTime % 3600) / 60);
        const seconds = remainingTime % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // const clockNumbers = Array.from({ length: 12 }, (_, i) => i + 1).map((num) => {
    //     const angle = (num / 12) * 360 - 90;
    //     const translateValue = clockRef.current ? clockRef.current.clientWidth / 2.6 : 13;
    //     const style = {
    //         transform: `rotate(${angle}deg) translate(4vw) rotate(${-angle}deg)`,
    //     };
    //     return (
    //         <div className="clock-number">
    //             <div
    //                 key={num}
    //                 className={`${num === 3 ? 'clock-3' : 'clock-1'}`}>
    //                 {num}
    //             </div>
    //         </div>
    //
    //     );
    // });


    return (
        <div className="flex flex-col">
            <div onClick={() => setGlow(!glow)} className={`${glow ? 'animate' : ''} bg-black shadow-2xl glow-container w-[40vw] h-[40vw] sm:w-[25vw] sm:h-[25vw] md:w-[20vw] md:h-[20vw] lg:w-[15vw] lg:h-[15vw] xl:w-[10vw] xl:h-[10vw]`}>
                <div className="clock bg-onboarding-yellow w-[1vw] h-[1vw]  rounded-full">
                    <div
                        className="hr"
                        style={{ transform: `rotate(${hoursDegrees}deg)` }}
                    />
                    <div
                        className="min"
                        style={{ transform: `rotate(${minutesDegrees}deg)` }}
                    />
                    <div
                        className="sec"
                        style={{ transform: `rotate(${secondsDegrees}deg)` }}
                    />

                </div>
            </div>
            <div className="mt-4 text-xl font-bold text-white text-center">
                {formatRemainingTime()}
            </div>
        </div>
    );
};

export default Clock;
