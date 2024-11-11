import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import HeaderImage from '../images/HeaderImage.png';
import TitleImage from '../images/Title.png';

const Home = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/products');
  };

  return (
    <div className="home-container" style={{ backgroundImage: `url(${HeaderImage})` }}>
      <div className="overlay">
        <img src={TitleImage} alt="Title" className="title-image" />
        <p className="description">
          Discover the latest in sports gear and apparel at Sportify, your ultimate online destination for all things sports. 
          At Sportify, we pride ourselves on offering a carefully curated selection of premium quality products that cater to athletes and fitness enthusiasts of all levels.
        </p>
        <button className="products-button" onClick={handleButtonClick}>
          Shop Now
        </button>
      </div>
    </div>
  );
};

export default Home;
