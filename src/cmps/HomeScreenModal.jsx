import React, { useEffect, useState } from 'react';

export function HomeScreenModal({ onToggleHomeModal }) {


  const [isModalShown, setIsModalShown] = useState(false)



  const onToggleModal = () => {
    setIsModalShown(!isModalShown)
    sessionStorage.setItem('isFirstEntry', 'notFirst')
  }



  return (
    <section className={`home-screen-modal ${isModalShown ? 'disable-modal' : ''}`}>
      <div className='container'>
        <h1>Dotify.</h1>
        <p>Everything sounds better</p>
        <button onClick={onToggleModal} className='get-start-btn'>Start Listening!</button>
      </div>
    </section>

  );
}
