import { useState, useEffect } from 'react';
import logo from '../../assets/logo.png';
import eye from '../../assets/eye.png';
import clock from '../../assets/timer-start.png';

export default function Header() {
  const initialTime = 29 * 60 + 10; 
  const [timeLeft, setTimeLeft] = useState(initialTime);
  const [isTimerVisible, setIsTimerVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const toggleTimerVisibility = () => {
    setIsTimerVisible(!isTimerVisible);
  };

  return (
    <div className='flex justify-between items-center bg-[#ffffff] py-6 md:px-16 shadow-xl'>
      <div className='flex gap-5 items-center'>
        <img src={logo} alt="logo" className='w-[30px] h-[30px] md:w-[63px] md:h-[62px]' />
        <div>
          <h2 className='text-[15px] md:text-[20px] font-medium'>Frontend developer</h2>
          <p className='text-[12px] md:text-[14px] font-normal text-[#8C8CA1]'>Skill assessment test</p>
        </div>
      </div>
      <div className='flex items-center gap-2 md:gap-5'>
        {isTimerVisible && (
          <div className='flex bg-[#ECE8FF] gap-2 py-2 px-4 rounded-[7px]'>
            <img src={clock} alt="clock" className='bg-[#ECE8FF] w-[24px] h-[24px] shadow-lg rounded-full' />
            <p className='text-[12px] md:text-[18px] font-bold text-[#755AE2]'>
              {formatTime(timeLeft)} <span className='text-[10px] md:text-[14px] font-medium'>time left</span>
            </p>
          </div>
        )}
        <div className='bg-[#ECE8FF] py-2 px-2 rounded-full cursor-pointer' onClick={toggleTimerVisibility}>
          <img src={eye} alt='eye' />
        </div>
      </div>
    </div>
  );
}
