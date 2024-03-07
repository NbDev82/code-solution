import React, { useRef } from 'react';
import Navbar from '~/components/Navbars/HomeNavbar';
import Footer from '~/components/Footer';
import IntroVideo from '~/assets/video/Intro-Video.gif';
import TextVideo from '~/assets/video/Text-Video.gif';
import ButtonHighLight from '~/components/Buttons/ButtonHighLight';
import './Home.scss';
import Lottie from 'react-lottie';
import HumanWork from '~/assets/lotties/HumanWork';
import Discuss from '~/assets/lotties/Discuss';
import Winner from '~/assets/lotties/Winner';
import Moutains from '~/assets/images/Moutains.svg';
import { useNavigate } from 'react-router-dom';
function Home() {
  const navigate = useNavigate();
  const targetElementRef = useRef(null);
  const defaultOptions = {
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };
  const handleSelectBtn = async (btnID) => {
    if (btnID === 'btnSignin') {
      navigate('/sign-in');
    } else {
      console.log(btnID);
      if (targetElementRef.current) {
        // Sử dụng scrollTop để cuộn tới vị trí của phần tử
        window.scrollTo({
          top: targetElementRef.current.offsetTop,
          behavior: 'smooth', // Thêm animation cuộn mềm mại
        });
      }
    }
  };

  return (
    <div className="container">
      <Navbar onSelectBtn={handleSelectBtn}></Navbar>
      <section className="intro">
        <img className="intro__video" src={IntroVideo} alt="IntroVideo"></img>
        <ButtonHighLight className="btn--newacc" children="Create Account"></ButtonHighLight>
      </section>
      <section className="content">
        <section className="content__group">
          <div id="Developer" className="content__group--title">
            Developer
          </div>
          <div className="content__group--content">
            We now support 14 popular coding languages. At our core, Code Solution is about developers. Our powerful
            development tools such as Playground help you test, debug and even write your own projects online.
          </div>
          <Lottie options={{ ...defaultOptions, animationData: HumanWork }} height={400} width={400} />
        </section>
        <section className="content__group">
          <div id="Contest" className="content__group--title">
            Contest
          </div>
          <div className="content__group--content">
            Regularly organized contests featuring diverse questions are designed to assess your programming learning
            journey. Participants come together to compete and determine the winners based on the highest scores and
            shortest completion times.
          </div>
          <Lottie options={{ ...defaultOptions, animationData: Winner }} height={400} width={400} />
        </section>
        <section className="content__group">
          <div id="Discuss" className="content__group--title">
            Discuss
          </div>
          <div className="content__group--content">
            Code Solution is a beloved coding community where individuals can pose questions for collaborative
            discussions.
          </div>
          <Lottie options={{ ...defaultOptions, animationData: Discuss }} height={400} width={800} />
        </section>
        <section className="content__quote">
          <img className="content__quote--text" src={TextVideo} alt="TextVideo"></img>
          <img className="content__quote--moutains" src={Moutains} alt="Moutains"></img>
        </section>
      </section>
      <Footer></Footer>
    </div>
  );
}

export default Home;
