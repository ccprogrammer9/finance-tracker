import React, { useState, useEffect } from 'react';
import './MainContent.css';
import image1 from './assets/images/image1.jpg';
import image2 from './assets/images/image2.jpg';
import image3 from './assets/images/image3.jpg';
import image4 from './assets/images/image4.jpg';

const MainContent = () => {
    const images = [image1, image2, image3, image4];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <main className="main-content">
            <div className="slideshow-container">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="slideshow-image"
                />
            </div>
        </main>
    );
};

export default MainContent;



