import React from 'react';


export default function HomePage() {
  return (
    <div id='main-home-cnt'>
      <div>
        {/* <video 
        width="100%" 
        loop
        muted
        autoPlay
        preload='auto'
        src='/assets/pexels-tima-miroshnichenko-5319759 (2160p).mp4'
        type='video/mp4'
        >
        </video> */}
        <img 
          src='/assets/pexels-victorfreitas-841130.jpg'
          alt='Fitness Background'
          style={{ width: '100%', height: 'auto' }}                                                                                                     
        />
      </div>
      <div id='home-div'>
        <h1>Fitness Planning</h1>
        <h2>Made Simple</h2>
        <p>Welcome to Stay Fit, your all-in-one solution for achieving your fitness aspirations and embracing a healthier lifestyle. Our platform is designed to make fitness planning an effortless journey, empowering individuals like you to take charge of your health and well-being.</p>       
        <p>At Stay Fit, we understand that each person's wellness goals are unique. Whether you're aiming to shed a few pounds, build muscle, increase your flexibility, or simply enhance your overall vitality, our comprehensive workout planning tools cater to your individual needs.</p>       
        <p>Our user-friendly interface and intuitive features streamline the process of creating and maintaining a fitness routine that suits your busy life. No matter your experience level or fitness background, Stay Fit provides the guidance and structure you need to succeed.</p>        
        {/* <p>From personalized workout routines to nutrition tips and progress tracking, our platform offers a holistic approach to your well-being. Our team of experienced fitness professionals and nutrition experts have curated a wealth of resources to support you every step of the way.</p> */}
        <p>Join the Stay Fit community today and embark on a journey towards a healthier you. Take control of your health, embrace the joy of movement, and experience the positive transformations that a well-planned fitness routine can bring.</p>
      </div>
    </div>
  );
}
