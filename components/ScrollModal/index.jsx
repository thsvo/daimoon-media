import { useState, useEffect } from 'react';
import Modal from 'react-modal';

const ScrollModal = ({ children }) => {
  const [showModal, setShowModal] = useState(false);

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: 'rgb(32, 32, 32)',
      border: 'none',
    },
  };

  useEffect(() => {
    let hasShownModal = localStorage.getItem(`shownModalForPost`) || false;
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const scrollPercentage = (scrollPosition / window.innerHeight) * 100;
      if (!hasShownModal && scrollPercentage > 50) {
        setShowModal(true);
        localStorage.setItem(`shownModalForPost`, 'true');
        hasShownModal = true;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Modal
      overlayClassName='fixed bg-[#000]/[.8] inset-0'
      style={customStyles}
      isOpen={showModal}
    >
      {children}
    </Modal>
  );
};

export default ScrollModal;
