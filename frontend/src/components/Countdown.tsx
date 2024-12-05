import dayjs from "dayjs";
import { useEffect, useState } from "react";

export const Countdown = () => {
    const [timeLeft, setTimeLeft] = useState('');
    
    useEffect(() => {
        const interval = setInterval(() => {
            const now = dayjs();
            const endOfDay = dayjs().hour(23).minute(0).second(0);
            setTimeLeft(endOfDay.diff(now, 'second').toString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return <div>Temps restant pour voter : {timeLeft} </div>;
};