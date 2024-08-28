import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './Header.css'; // Import the CSS file

// Header component with slideshow and text
const Header = () => {
    const images = [
        '/assets/images/image1.jpg',
        '/assets/images/image2.jpg',
        '/assets/images/image3.jpg',
        '/assets/images/image4.jpg'
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 5000); // Change image every 5 seconds

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [images.length]);

    return (
        <header>
            <div className="slideshow-container">
                <img
                    src={images[currentIndex]}
                    alt={`Slide ${currentIndex + 1}`}
                    className="slideshow-image"
                />
            </div>
                <h1>Finance Tracker</h1>
        </header>
    );
};

export default Header;
