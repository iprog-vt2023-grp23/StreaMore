import React from 'react';
import { useNavigate } from 'react-router-dom';
import './BacknHomeButton.css';
import {IoMdArrowRoundBack} from 'react-icons/io';
import { TiHome } from 'react-icons/ti';

const BacknHomeButton = () => {
  const navigate = useNavigate();

  function handleClick() {
    navigate(-1);
  }

  return (
    <>
    <IoMdArrowRoundBack className="backButton" onClick={handleClick}/>
    <TiHome className="homeButton" onClick={() => navigate("/")} />
    </>
  );
}

export default BacknHomeButton;