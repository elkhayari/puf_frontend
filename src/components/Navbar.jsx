import React, { useEffect } from 'react';

//Icons
import { RiNotification3Line } from 'react-icons/ri';
import { AiOutlineMenu } from 'react-icons/ai';
import { FaUserSecret } from 'react-icons/fa';
import { MdKeyboardArrowDown } from 'react-icons/md';

//syncfusion
import { TooltipComponent } from '@syncfusion/ej2-react-popups';

//Context
import { useStateContext } from '../contexts/ContextProvider';

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={() => customFunc()}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const { activeMenu, setActiveMenu, screenSize, setScreenSize, currentColor } =
    useStateContext();
  const { isClicked, setIsClicked } = useStateContext();
  const { handleClick } = useStateContext();

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleActiveMenu = () => setActiveMenu(!activeMenu);

  return (
    <div className="flex justify-between p-2 md:ml-6 md:mr-6 relative">
      <NavButton
        title="Show Menu"
        icon={<AiOutlineMenu />}
        customFunc={handleActiveMenu}
        color={currentColor}
      />
      <div className="flex">
        <NavButton
          title="Notification"
          customFunc={() => handleClick('notification')}
          icon={<RiNotification3Line />}
          color="blue"
          dotColor="#03C9D7"
        />

        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            onClick={() => handleClick('userProfile')}
          >
            <FaUserSecret className="rounded-full w-8 h-8" />
            <p>
              <span className="text-blue-800 text-14">Hi,</span>{' '}
              <span className="text-blue-800 font-bold ml-1 text-14">
                Abdel
              </span>
            </p>
            <MdKeyboardArrowDown className="text-gray-400 text-14" />
          </div>
        </TooltipComponent>

        {/**
         * 
        
        {isClicked.notification && (<Notification />)}
        {isClicked.userProfile && (<UserProfile />)}
         */}
      </div>
    </div>
  );
};

export default Navbar;
