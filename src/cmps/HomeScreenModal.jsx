import React, { useState } from 'react';

export function HomeScreenModal() {


const [isModalShown, setIsModalShown] = useState(false)
   

const onToggleModal = () => {
    setIsModalShown(!isModalShown)
    console.log(isModalShown);
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
