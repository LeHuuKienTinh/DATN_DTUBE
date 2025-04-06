import React, { useEffect, useState } from 'react';
import './Home.scss'
import Menu from './Menu';
import CardFilm from '../../components/user/home/Cardfilm';
import Banner from '../../components/user/home/Banner';
import FooterHomePage from '../../components/home/HomePage/FooterHomePage/FooterHomePage';
const Home = () => {
 

  return (
    <div className='container-home'>
      <Menu/>
      <h2>Phổ Biến Trên DTube:</h2>
      <CardFilm/>
      <Banner/>
      <h1></h1>
      <FooterHomePage/>
    </div>
  );
};

export default Home;
