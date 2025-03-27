import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Import navigation hook
import Confetti from 'react-confetti';
import bedroomImage from '@/assets/bedroom.svg';
import giftImage from '@/assets/gift.svg';
import balloonLeftImage from '@/assets/balloon-left.png';
import balloonRightImage from '@/assets/balloon-right.png';
import music from '@/assets/happy-birthday.mp3';

const Bedroom = () => {
  const [showMessage, setShowMessage] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [showDoor, setShowDoor] = useState(false);
  const [showBirthdayMessages, setShowBirthdayMessages] = useState(false);
  const [showPresentationButton, setShowPresentationButton] = useState(false);

  const navigate = useNavigate(); // Initialize navigation

  const messages = [
    "Wow! That was something weird.",
    "Hey look! There's a gift for you..",
    "C'mon, let's open it and see what's in there!"
  ];
  const birthdayMessages = [
    "Happy Birthday, Ms. Jen! We appreciate you so much,",
    " and we are grateful for your leadership and guidance.",
    "Thank you for inspiring us every day and for always supporting us.",
    "Your dedication motivates us to give our best in everything we do.",
    "Wishing you endless success, happiness, and good health!",
    "-- HRMDD FAMILY"
  ];

  useEffect(() => {
    setShowMessage(true);
    const messageTimer = setInterval(() => {
      if (currentMessageIndex < messages.length - 1) {
        setCurrentMessageIndex((prevIndex) => prevIndex + 1);
      } else {
        setShowDoor(true);
        clearInterval(messageTimer);
      }
    }, 3000);

    return () => clearInterval(messageTimer);
  }, [currentMessageIndex, messages.length]);

  const handleDoorClick = () => {
    const audio = new Audio(music);
    audio.play();
    setShowBirthdayMessages(true);
    setShowDoor(false);

    setTimeout(() => {
      setShowPresentationButton(true);
    }, birthdayMessages.length * 2000);
  };

  return (
    <div className="h-screen flex flex-col justify-between items-center bg-blue-900 relative">
      {showBirthdayMessages && <Confetti />}

      <motion.img
        src={bedroomImage}
        alt="Bedroom"
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
      />

      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 text-center text-white">
        {showMessage && currentMessageIndex < messages.length && (
          <motion.h1
            className="text-2xl mb-5"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {messages[currentMessageIndex]}
          </motion.h1>
        )}

        {showBirthdayMessages && (
          <div>
            {birthdayMessages.map((msg, index) => (
              <motion.h2
                key={index}
                className="text-2xl mt-5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: index * 2 }}
              >
                {msg}
              </motion.h2>
            ))}
          </div>
        )}
      </div>

      {showDoor && (
        <div className="text-white">
          <motion.img
            src={giftImage}
            alt="Gift"
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer w-32 h-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            onClick={handleDoorClick}
          />
          <h3>Click the gift</h3>
        </div>
      )}

      {showPresentationButton && (
        <motion.button
          onClick={() => navigate('/video')} // Redirects to /video
          className="absolute bottom-10 bg-white text-blue-900 px-6 py-3 rounded-lg text-xl font-bold shadow-lg transition-transform hover:scale-105"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          Click to watch the presentation
        </motion.button>
      )}

      {showBirthdayMessages && (
        <>
          <motion.img
            src={balloonLeftImage}
            alt="Left Balloon"
            className="absolute top-20 left-5 w-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
          <motion.img
            src={balloonRightImage}
            alt="Right Balloon"
            className="absolute top-20 right-5 w-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          />
        </>
      )}
    </div>
  );
};

export default Bedroom;
