"use client"
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FaHome, FaUsers, FaNetworkWired, FaList, FaThList } from "react-icons/fa";
import { MdFolderShared, MdContactPhone } from "react-icons/md";
import { GiLifeBar } from "react-icons/gi";
import { VscServerProcess } from "react-icons/vsc";
import { IoIosArrowDown } from "react-icons/io";
import { LuUsersRound } from 'react-icons/lu';

function Sidebar() {
  const pathname = usePathname();
  const [homeDropdown, setHomeDropdown] = useState(false);
  const [AllUsersdropDown, setAllUsers] = useState(false);
  const [workDropdown, setWorkDropdown] = useState(false);
  const [processDropdown, setProcessDropdown] = useState(false);
  const [careersDropdown, setCareersDropdown] = useState(false);
  const [SharedFile, setSharedFile] = useState(false);
  const [contactus, setContactus] = useState(false);
  const [Donation, setDonation] = useState(false);



  const isActive = (href) => {
    return pathname === href || (href !== '/' && pathname.startsWith(href));
  };

  const menuItemClass = (active) =>
    `text-lg font-semibold flex gap-3 items-center  pb-4 ${active ? "text-[#9EFF00]" : "text-white"}`;

  const renderDropdownIcon = (open) =>
    <IoIosArrowDown className={`text-2xl transition-transform ${open ? "rotate-180" : "rotate-0"}`} />;

  return (
    <div className="bg-[#191919] h-full ">
      <div className="max-w-[1596px] ">
        {/* admin site */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setAllUsers(!AllUsersdropDown)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><FaUsers /></span>
              <span>All User Information</span>
            </div>
            {renderDropdownIcon(AllUsersdropDown)}
          </div>
          {AllUsersdropDown && (
            <ul className=" mt-2 border-l border-gray-600 pl-4">
              <li className={`${menuItemClass(isActive('/Deshboard/DeshboardLoginUser/DeshboardLoginUserAllList'))} xl:text-lg lg:text-[16px]`}>
                <span className="text-2xl"><LuUsersRound /></span>
                <Link href="/Deshboard/DeshboardLoginUser/DeshboardLoginUserAllList">All Users</Link>
              </li>

            </ul>
          )}
        </li>
        {/* Home */}
        <li className={`${menuItemClass(isActive("/"))} flex-col gap-3 py-2  px-5`}>
          <div className="flex items-center  justify-between cursor-pointer w-full" onClick={() => setHomeDropdown(!homeDropdown)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><FaHome /></span>
              <span>Home</span>
            </div>
            <div>
              {renderDropdownIcon(homeDropdown)}
            </div>
          </div>
          {homeDropdown && (
            <ul className="ml-6 mt-2 border-l border-gray-600 pl-4">
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Banner_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Banner_List">Banner List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Banner_Second_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Banner_Second_List">Banner Image 2 List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Mission_Vission_Ovject_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Mission_Vission_Ovject_List">Mission Vission Objective List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Three_Banner_LIst"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Three_Banner_LIst">Home 3 Banner List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Popular_Desis_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Popular_Desis_List">Home Popular Medical Desis Data List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Communication_HelthCare_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Communication_HelthCare_List">Home Communication HelthCare Data List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Communiction_Hearing_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Communiction_Hearing_List">Communiction Hearing Data List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Founding_Member_Data_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Founding_Member_Data_List">Founding Mermber List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardHome/Home_Community_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardHome/Home_Community_List">Community Data List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* News */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setWorkDropdown(!workDropdown)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><FaNetworkWired /></span>
              <span>News</span>
            </div>
            {renderDropdownIcon(workDropdown)}
          </div>
          {workDropdown && (
            <ul className=" mt-2  ">
              <li className={menuItemClass(false)}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DeshboardNews/DeshboardNewsAllDataList">All News Data List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* Gallary */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setProcessDropdown(!processDropdown)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><VscServerProcess /></span>
              <span>Gallary</span>
            </div>
            {renderDropdownIcon(processDropdown)}
          </div>
          {processDropdown && (
            <ul className=" mt-2  border-gray-500 ">
              <li className={menuItemClass(false)}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DeshboardGallary/DeshboardGallaryDataList">Gallary All Data List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* About */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setCareersDropdown(!careersDropdown)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><GiLifeBar /></span>
              <span>About</span>
            </div>
            {renderDropdownIcon(careersDropdown)}
          </div>
          {careersDropdown && (
            <ul className="ml-6 mt-2   pl-4">
              <li className={menuItemClass(isActive("/Deshboard/DeshboardAbout/About_Card_Data_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardAbout/About_Card_Data_List">About Hero Text And Image List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardAbout/About_Three_Banner_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardAbout/About_Three_Banner_List">Three Banner Data List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DeshboardAbout/Deshboard_Last_Banner_Image_List"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardAbout/Deshboard_Last_Banner_Image_List">Last Banner Text OR Image List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* Contact us */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setContactus(!contactus)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><MdContactPhone /></span>
              <span>Contact</span>
            </div>
            {renderDropdownIcon(contactus)}
          </div>
          {contactus && (
            <ul className="ml-6 mt-2   pl-4">
              <li className={menuItemClass(isActive("/Deshboard/DeshboardContact/DeshboardContactList"))}>
                <span className="text-2xl"><FaList /></span>
                <Link href="/Deshboard/DeshboardContact/DeshboardContactList"> Contact All Data List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* Donation files */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setDonation(!Donation)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><MdFolderShared /></span>
              <span>Donation </span>
            </div>
            {renderDropdownIcon(Donation)}
          </div>
          {Donation && (
            <ul className="ml-6 mt-2   pl-4">
              <li className={menuItemClass(isActive("/Deshboard/DashboardDonation/Dashboard_Donation_amount_text_List"))}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DashboardDonation/Dashboard_Donation_amount_text_List">Donation Text And Amount List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DashboardDonation/Donation_Medium_Deshboard_List"))}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DashboardDonation/Donation_Medium_Deshboard_List">Donation Medium All Data List</Link>
              </li>
              <li className={menuItemClass(isActive("/Deshboard/DashboardDonation/Donation_Question__Dashboard_List"))}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DashboardDonation/Donation_Question__Dashboard_List">Frequently Asked Questions List</Link>
              </li>
            </ul>
          )}
        </li>
        {/* shared files */}
        <li className={`flex-col gap-3 py-2 px-5 ${menuItemClass(false)}`}>
          <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setSharedFile(!SharedFile)}>
            <div className="flex items-center gap-3">
              <span className="text-2xl"><MdFolderShared /></span>
              <span>Footer</span>
            </div>
            {renderDropdownIcon(SharedFile)}
          </div>
          {SharedFile && (
            <ul className="ml-6 mt-2 pl-4">
              <li className={menuItemClass(false)}>
                <span className="text-2xl"><FaThList /></span>
                <Link href="/Deshboard/DashboardFooter/Social_Deshboard_List"> Footer Social Link List</Link>
              </li>
            </ul>
          )}
        </li>
      </div>
    </div>
  );
}

export default Sidebar;