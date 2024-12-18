import React, { useState, useEffect, useRef } from 'react';

const Stopwatch = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const timerRef = useRef(null);

  // Format time to display minutes:seconds:milliseconds
  const formatTime = (totalMilliseconds) => {
    const minutes = Math.floor(totalMilliseconds / 60000);
    const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
    const milliseconds = totalMilliseconds % 1000;

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(3, '0')}`;
  };

  // Start the stopwatch
  const handleStart = () => {
    if (!isRunning) {
      const startTime = Date.now() - time;
      timerRef.current = setInterval(() => {
        setTime(Date.now() - startTime);
      }, 10);
      setIsRunning(true);
    }
  };

  // Pause the stopwatch
  const handlePause = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      setIsRunning(false);
    }
  };

  // Record a lap
  const handleLap = () => {
    if (isRunning) {
      setLaps([{ id: laps.length + 1, time: time }, ...laps]);
    }
  };

  // Stop and reset the stopwatch
  const handleStop = () => {
    clearInterval(timerRef.current);
    setTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  // Cleanup interval on unmount
  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-100 rounded-lg shadow-lg">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Stopwatch</h1>
        <div className="text-6xl font-mono text-gray-900 mb-6">
          {formatTime(time)}
        </div>
      </div>

      <div className="flex justify-center space-x-4 mb-6">
        {!isRunning ? (
          <button 
            onClick={handleStart} 
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-semibold"
            disabled={false}
          >
            Start
          </button>
        ) : (
          <button 
            onClick={handlePause} 
            className="px-6 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-semibold"
          >
            Pause
          </button>
        )}

        <button 
          onClick={handleLap} 
          className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
            isRunning 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={!isRunning}
        >
          Lap
        </button>

        <button 
          onClick={handleStop} 
          className={`px-6 py-3 rounded-lg transition-colors font-semibold ${
            !isRunning && time > 0
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
          disabled={isRunning || time === 0}
        >
          Stop
        </button>
      </div>

      <div className="space-y-2">
        {laps.map((lap) => (
          <div 
            key={lap.id} 
            className="bg-white p-3 rounded-lg shadow-sm flex justify-between items-center"
          >
            <span className="font-medium text-gray-700">Lap {lap.id}</span>
            <span className="font-mono text-gray-900">{formatTime(lap.time)}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Stopwatch;