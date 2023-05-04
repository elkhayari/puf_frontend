import React from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { IoMdAdd, IoMdSearch } from 'react-icons/io';

const TestNavbar = ({ searchTerm, setSearchTerm, user }) => {
  const navigate = useNavigate();

  if (user) {
    return (
      <div className="flex gap-2 md:gap-5 w-full mt-5 pb-7 ">
        <div className="flex outline outline-cyan-500/20 justify-start items-center w-full px-2 rounded-md bg-white focus-within:shadow-sm">
          <IoMdSearch fontSize={23} className="ml-1" />
          <input
            type="text"
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Not implemented yet"
            value={searchTerm}
            onFocus={() => navigate('/tests/search')}
            className="p-2 w-full bg-white outline-none"
          />
        </div>

        <div className="flex gap-3 ">
          <Link
            to="/tests/create-test"
            className="bg-gray-500/10 text-black rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center"
          >
            <IoMdAdd />
          </Link>
        </div>
      </div>
    );
  }

  return null;
};

export default TestNavbar;
