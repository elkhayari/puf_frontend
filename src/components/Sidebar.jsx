import React, { useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Badge from '@material-ui/core/Badge';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import { GoCircuitBoard } from 'react-icons/go';
import { MdOutlineCancel } from 'react-icons/md';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { ToastContainer, toast } from 'react-toastify';

// import data

import { links } from '../data/dummy';

import { useStateContext } from '../contexts/ContextProvider';

const useStyles = makeStyles((theme) => ({
  badge: {
    width: 20,
    height: 20,
    backgroundColor: theme.palette.success.main,
    borderRadius: '50%',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&.highlight': {
      boxShadow: `0 0 0 2px ${theme.palette.warning.main}`
    }
  }
}));

const Sidebar = () => {
  console.log('SideBar');
  const {
    screenSize,
    activeMenu,
    setActiveMenu,
    socket,
    setIsInsertedHighlighted,
    isInsertedHighlighted,
    setInsertedCount,
    insertedCount,
    setDevices
  } = useStateContext();

  const classes = useStyles();

  useEffect(() => {
    console.log('useEffect sidebar');
    console.log(socket);
    // Handle WebSocket message event

    socket.onmessage = handleWebSocketMessage;

    socket.onclose = () => {
      console.log('WebSocket connection closed.');
    };

    // Clean up the WebSocket connection on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, []); // Empty dependency array ensures the effect runs only once

  const handleWebSocketMessage = (event) => {
    console.log('onmessage');
    setIsInsertedHighlighted(true);
    const receivedMessage = event.data;
    try {
      const messageObj = JSON.parse(receivedMessage);
      const { type, message } = messageObj;
      console.log('Received type:', type);
      console.log('Received type:', message);

      switch (type) {
        case 'error':
          displayErrorToast(message);
          break;
        case 'warning':
          displayWarningToast(message);
          break;
        case 'device_payload':
          handleDevicePayload(message);
          break;
        case 'send_device_change':
          handleDeviceChange(message);
          break;
        default:
          // Handle other message types if needed
          break;
      }
    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  };

  const displayErrorToast = (message) => {
    toast.error(message.error);
  };

  const displayWarningToast = (message) => {
    console.log('display warning', message);
    toast.warn(message);
  };

  const handleDevicePayload = (devicePayload) => {
    const { serial, name } = devicePayload;

    displaySuccessToast(`Serial: ${serial}`, `Device Name: ${name}`);
  };

  const displaySuccessToast = (serial, name) => {
    toast.success(
      <div>
        <div>{name}</div>
        <div>{serial}</div>
      </div>
    );
  };

  const handleDeviceChange = (deviceInfo) => {
    const { action, device_node } = deviceInfo;
    console.log('Received action:', action);
    console.log('Received device node:', device_node);

    fetch('http://localhost:8000/deviceApi/insertDevice/') // Replace with your Django API endpoint URL
      .then((response) => response.json())
      .then((data) => {
        setDevices(data);
        setInsertedCount(data.length);
      })
      .catch((error) => console.log(error));

    switch (action) {
      case 'add':
        displayNewDeviceToast(device_node);
        setIsInsertedHighlighted(true);
        setTimeout(() => setIsInsertedHighlighted(false), 2000);
        //setInsertedCount((prevCount) =>  + 1);
        break;
      case 'remove':
        displayDeviceRemovedToast(device_node);
        //setInsertedCount((prevCount) => prevCount - 1);
        break;
      default:
        // Handle other device actions if needed
        break;
    }
  };

  const displayNewDeviceToast = (deviceNode) => {
    toast.info(`New device inserted: ${deviceNode}`);
  };

  const displayDeviceRemovedToast = (deviceNode) => {
    toast.info(`Device removed: ${deviceNode}`);
  };

  const handleCloseSideBar = () => {
    if (activeMenu !== undefined && screenSize <= 900) {
      setActiveMenu(false);
    }
  };

  // Function to check if a link is active
  const location = useLocation();

  const isLinkActive = (link) => {
    return location.pathname.includes(link);
  };

  const normalLink =
    'bg-sky-500/100 text-blue-900 hover:text-black transition-all duration-200 ease-in-out capitalize';
  const activeLink =
    'font-extrabold border-r-2 border-black  transition-all duration-200 ease-in-out capitalize';

  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10 ">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={() => handleCloseSideBar}
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
                    className="flex items-center gap-5 pl-6 pt-3 pb-2.5"
                  >
                    {link.isBadgeVisible ? (
                      <Badge
                        classes={{
                          badge: `${classes.badge} ${
                            isInsertedHighlighted && link.path === 'inserted'
                              ? 'highlight'
                              : ''
                          }`
                        }}
                        badgeContent={insertedCount}
                        max={99}
                      >
                        <Chip
                          clickable
                          label={link.name}
                          className={
                            isLinkActive(link.path) ? activeLink : normalLink
                          }
                        />
                      </Badge>
                    ) : (
                      <Chip
                        clickable
                        label={link.name}
                        className={
                          isLinkActive(link.path) ? activeLink : normalLink
                        }
                      />
                    )}
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
