import React from 'react';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaBell } from 'react-icons/fa';
import AdminProfileDropDown from '../../Components/Admin/AdminProfileDropDown';

const Navbar = ({ toggleSidebar }) => {

  return (
    <div id="nav" className="w-full h-16 bg-white flex flex-row items-center text-[#49608c] shadow z-50 sticky top-4">
      <div className="ml-5">
        <AiOutlineMenuUnfold
          className="transition ease-in-out hover:text-[#2E3A8C] hover:duration-300 mr-5"
          onClick={toggleSidebar}
          size={25} />
      </div>
      
      <div className="ml-auto flex flex-row items-center mr-5">
        <div className="transition ease-in-out hover:text-[#2E3A8C] hover:duration-300 mr-5">
          <FaBell size={25} />
        </div>

        <AdminProfileDropDown />
      </div>
    </div>
  );
};

export default Navbar;
