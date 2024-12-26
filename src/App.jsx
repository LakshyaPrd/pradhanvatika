import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com'; // Import EmailJS
import './App.css';
import AOS from "aos";
import "aos/dist/aos.css"; 

function App() {
    const images = [
        "/images/gallery1.JPG",
        "/images/gallery2.JPG",
        "/images/gallery3.JPG",
        "/images/gallery4.JPG",
        "/images/gallery5.JPG",
        "/images/gallery6.JPG",
        "/images/gallery7.JPG",
        "/images/gallery8.JPG",
        "/images/gallery9.JPG"
    ];

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [formStatus, setFormStatus] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [images.length]);

    const openLightbox = (imageSrc) => {
        setCurrentImage(imageSrc);
        setLightboxOpen(true);
    };

    const closeLightbox = (e) => {
        if (e.target === e.currentTarget) {
            setLightboxOpen(false);
            setCurrentImage('');
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormStatus('Sending...');
    
        emailjs.send(
            'service_z9nhalv',
            'template_75ml66c',
            {
                user_name: formData.name,  // Pass the name
                user_email: formData.email,  // Pass the email
                user_message: formData.message,  // Pass the message
            },
            'gMFra64iO4C_04sA2'
        )
        .then((response) => {
            setFormStatus('Message sent successfully!');
            setFormData({ name: '', email: '', message: '' }); // Reset the form
        })
        .catch((error) => {
            console.error('Error sending message:', error);
            setFormStatus('Error occurred while sending the message.');
        });
    };

   
    

    return (
        <div className="App">
            <nav className="navbar">
                <div className="navbar-container">
                    <div className="logo-container">
                        <div className="logo-icon"></div> {/* Placeholder for the flag-like icon */}
                    </div>
                    <ul className="nav-links">
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">About Us</a></li>
                        <li><a href="#features">Services</a></li>
                        <li><a href="#gallery">Gallery</a></li>
                        <li><a href="#contact">Contact Us</a></li>
                    </ul>
                </div>
            </nav>

            <header
                className="hero"
                style={{
                    backgroundImage: `url(${images[currentImageIndex]})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            ></header>

            <section id="about" className="about">
                <h2>About Pradhan Vatika</h2>
                <div className="about-container">
                    <div className="about-section">
                        <p>
                            Located in the heart of the city, Pradhan Vatika offers a stunning ambiance, world-class services, and an unforgettable experience for your special occasions. Whether it's a wedding, anniversary, or corporate event, we provide everything you need to make your celebration extraordinary.
                        </p>
                        <p>
                            Welcome to Pradhan Vatika, where dreams transform into unforgettable celebrations. Our meticulously landscaped gardens and elegant banquet halls provide the perfect setting for weddings, receptions, corporate events, and more. At Pradhan Vatika, we believe that every event is unique. That's why we offer a range of customizable packages and personalized services to cater to your specific needs and preferences. Our experienced team will work closely with you to plan every detail, from décor and catering to entertainment and logistics.
                        </p>
                        <p>
                            We are committed to providing exceptional service and creating an unforgettable experience for you and your guests. Choose Pradhan Vatika and let us help you make your special day truly extraordinary.
                        </p>
                    </div>
                </div>
            </section>

            <section id="features" className="features">
                <h2>Why Choose Us?</h2>
                <div className="features-container">
                    <div className="feature">
                        <div className="feature-text">
                            <h3>Spacious Venue</h3>
                            <p>Experience the grandeur of Pradhan Vatika, where expansive lawns, spacious halls, and open-air pavilions provide ample room for your guests to mingle, dance, and create lasting memories. With a capacity to host up to 1500 guests, including a spacious banquet hall that can comfortably seat 300.</p>
                        </div>
                        <div className="feature-image">
                            <img src="public/images/spacious-venue.JPG" alt="Spacious Venue" />
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-text">
                            <h3> Services</h3>
                            <p>Experience unparalleled comfort with our premium services at Pradhan Vatika. We provide 8 elegantly appointed air-conditioned rooms, each a haven of tranquility. Each room boasts an attached bathroom with modern fixtures and a comfortable double bed adorned with luxurious linens, ensuring a restful and rejuvenating experience for your guests.</p>
                        </div>
                        <div className="feature-image">
                            <img src="public/images/flexible-packages.JPG" alt="Convenient Location" />
                            
                        </div>
                    </div>
                    <div className="feature">
                        <div className="feature-text">
                            <h3>Flexible Packages</h3>
                            <p>We understand that every event is unique. That's why we offer a variety of flexible packages to suit different budgets, ensuring you get the best value for your investment.</p>
                        </div>
                        <div className="feature-image">
                            <img src="public/images/premium-services.JPG" alt="Premium Services" />
                        </div>
                    </div>
                </div>
            </section>

            <section id="gallery" className="gallery">
                <h2>Gallery</h2>
                <div className="gallery-container">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Gallery Image ${index + 1}`}
                            className="gallery-image"
                            onClick={() => openLightbox(image)}
                        />
                    ))}
                </div>

                {/* Lightbox */}
                {lightboxOpen && (
                    <div
                        className={`lightbox ${lightboxOpen ? 'open' : ''}`}
                        onClick={closeLightbox}
                    >
                        <span className="close" onClick={() => setLightboxOpen(false)}>&times;</span>
                        <img src={currentImage} alt="Expanded View" />
                    </div>
                )}
            </section>

            <section id="contact" className="contact">
                <h2>Contact Us</h2>
                <p>Ready to book or have questions? Reach out to us today!</p>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="styled-form">
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            required
                        />

                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                            required
                        />

                        <label htmlFor="message">Message:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="5"
                            value={formData.message}
                            onChange={handleChange}
                            placeholder="Write your message here..."
                            required
                        ></textarea>

                        <button type="submit">Send Message</button>
                    </form>
                    {formStatus && <p>{formStatus}</p>}
                </div>
            </section>

            <footer className="footer">
                <p>&copy; 2024 Pradhan Vatika. All Rights Reserved.</p>
            </footer>
        </div>
    );
}

export default App;
