import React, { useState, useEffect } from 'react';

export function Loader({inputType,setInputType}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let time=160;
    if(inputType==="audio")
    {
        time=1200;
    }
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setInputType("");
          return 100;
        }
        return prev + 1;
      });
    }, time);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center justify-center mt-[5%]">
      <div className="w-64">
        <div className="relative">
          <div className="h-2 bg-black rounded-full overflow-hidden">
            <div 
              className="h-full bg-white transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="mt-4 text-center">
            <span className="text-white text-lg font-medium">{progress}%</span>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white" />
        </div>
      </div>
    </div>
  );
}

