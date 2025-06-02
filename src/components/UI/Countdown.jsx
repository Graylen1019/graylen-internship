import { useEffect, useState } from "react";

export const CountdownTimer = ({ expiryDate }) => {
  const [timeLeft, setTimeLeft] = useState(expiryDate - Date.now());

  useEffect(() => {
    const timerInterval = setInterval(() => {
      const newTimeLeft = expiryDate - Date.now();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft <= 0) {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [expiryDate]);

  const formatTime = (milliseconds) => {
    if (milliseconds <= 0) {
      return "";
    }

    const totalSeconds = Math.floor(milliseconds / 1000);
    const seconds = totalSeconds % 60;
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const hours = Math.floor(totalSeconds / 3600);

    const displayHours = String(hours).padStart(2, "0");
    const displayMinutes = String(minutes).padStart(2, "0");
    const displaySeconds = String(seconds).padStart(2, "0");

    return `${displayHours}:${displayMinutes}:${displaySeconds}`;
  };

  const formattedTime = formatTime(timeLeft);

  return <span>{formattedTime}</span>;
};

