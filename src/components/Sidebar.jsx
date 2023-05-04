import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { GoCircuitBoard } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
// import data
import { links } from '../data/dummy';

import { useStateContext } from '../contexts/ContextProvider';

const Sidebar = () => {
  const { activeMenu, setActiveMenu } = useStateContext();
  //const activeLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg  text-gray  text-md m-2';
  //const normalLink = 'flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-md text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2';

  const normalLink =
    'flex items-center gap-5 pl-6 pt-3 pb-2.5  text-gray-600 hover:text-black transition-all duration-200 ease-in-out capitalize';
  const activeLink =
    'flex items-center gap-5 pl-6 pt-3 pb-2.5  font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => setActiveMenu(false)}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <GoCircuitBoard /> <span>PUF Experiments</span>
            </Link>
            <TooltipComponent content="Hide Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-10">
            {links.map((item) => (
              <div key={item.title}>
                <p className="text-gray-400 underline dark:text-gray-400 m-3 mt-4 uppercase">
                  {item.title}
                </p>
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.path}`}
                    key={link.name}
                    onClick={() => {}}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    <span className="capitalize ">{link.name}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
