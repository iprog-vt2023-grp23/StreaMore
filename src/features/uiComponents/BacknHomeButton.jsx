import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BacknHomeButton.css';
import {IoMdArrowRoundBack} from 'react-icons/io';
import { TiHome } from 'react-icons/ti';

const BacknHomeButton = () => {
  const navigate = useNavigate();

  function handleBackButtonClick() {
    navigate(-1);
  }

  function handleHomeButtonClick() {
    navigate("/");
  }




  return (
    <>
    <IoMdArrowRoundBack className="backButton" onClick={handleBackButtonClick}/>
    <TiHome className="homeButton" onClick={handleHomeButtonClick} />
    </>
  );
}

export default BacknHomeButton;