import React from 'react';
import Navbar from '~/components/Navbars/HomeNavbar';
import Footer from '~/components/Footer';
import IntroVideo from '~/assets/video/Intro-Video.gif';
import './Home.scss';
function Home() {
  return (
    <div className="container">
      <Navbar></Navbar>
      <section className="ỉntro">
        <img className="intro__video" src={IntroVideo} alt="IntroVideo"></img>
      </section>
      <section className="content">
        <section className="content__develop"></section>
        <section className="content__contest"></section>
        <section className="content__discuss"></section>
        <section className="content_quote"></section>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Home;
