import { useState, useEffect, useRef } from "react";

const Notification = ({ successMessage, errorMessage }) => {
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    if (successMessage || errorMessage) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 3000); // Hide the message after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [successMessage, errorMessage]);

  return (
    <>
      {isVisible && (
        <div>
          {successMessage && <h1 className="sucess">{successMessage}</h1>}
          {errorMessage && <h1 className="error">{errorMessage}</h1>}
        </div>
      )}
    </>
  );
};

export default Notification;
