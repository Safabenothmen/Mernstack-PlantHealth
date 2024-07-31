import React, { useState } from 'react';
import './top.css';
import  AppChat  from './appchat.js';
import { BiSearchAlt } from 'react-icons/bi';
import { TbMessageCircle } from 'react-icons/tb';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { BsArrowRightShort } from 'react-icons/bs';
import { BsQuestionCircle } from 'react-icons/bs';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Drawer from '@mui/material/Drawer';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Top = () => {
  const [openChat, setOpenChat] = React.useState(false);
  const handleIconClick = () => {
    setOpenChat(!openChat);
  };

  return (
    <div className='topSection'>
      <div className="headerSection flex">
        <div className="adminDiv flex">
          <TbMessageCircle className="icon" onClick={handleIconClick} />
          <IoMdNotificationsOutline className="icon" />
          <div className="adminImage"></div>
        </div>
      </div>
      <Drawer anchor='right' open={openChat} onClose={handleIconClick}>
        <AppChat />
      </Drawer>
    </div>
  );
}

export default Top;
