import React from 'react';


export default function HomePage() {
  return (
    <div>
      <video 
      width="100%" 
      loop
      muted
      // autoPlay
      preload={'auto'}
      src={process.env.PUBLIC_URL + '/assets/pexels-tima-miroshnichenko-5319759 (2160p).mp4'}
      type={'video/mp4'}
      >
      </video>
    </div>
  );
}
