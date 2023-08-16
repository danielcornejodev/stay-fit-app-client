import React from 'react';


export default function HomePage() {
  return (
    <>
      <div>
        <video 
        width="100%" 
        loop
        muted
        autoPlay
        preload='auto'
        src='/assets/pexels-tima-miroshnichenko-5319759 (2160p).mp4'
        type='video/mp4'
        >
        </video>
      </div>
      <div>
        <h1>Fitness Planning</h1>
        <h1>Made Simple</h1>
        <p>Stay Fit facilitates workout planning for people to reach their personal wellness goals and take control of their health. For trainers, health enthusiasts, or anyone interested in physical well being. Any age, anywhere, any experience level. </p>
      </div>
    </>
  );
}
