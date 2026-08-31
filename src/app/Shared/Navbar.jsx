"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBlenderPhone, FaFacebook, FaHome, FaNewspaper, FaPaperPlane, FaTwitter, FaYoutube } from "react-icons/fa";
import { GrGallery } from "react-icons/gr";
import { RiMenu2Line } from "react-icons/ri";
import { MdGroups } from "react-icons/md";
import { usePathname, useRouter } from "next/navigation";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import ssltlogo from "../../../public/images/ssltLogo.png"
import Image from "next/image";
import './customNavbar.css';
import { FcDonate } from "react-icons/fc";
import { BsLinkedin } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { getfetchFooter } from "@/redux/features/footer/footerSlice";
import { logout } from "@/redux/features/Auth/loginSlice";
import { FaSquareXTwitter } from "react-icons/fa6";

function Navbar() {

    const dispatch = useDispatch();
    const { loginData, loading } = useSelector(state => state.login);
    const { footerData } = useSelector(state => state.footer)

    useEffect(() => {
        dispatch(getfetchFooter())
    }, [dispatch])


    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [resoursedropdown, setresoursedropdown] = useState(false);
    const pathname = usePathname();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [ishover, setisHover] = useState(false);
    const [blogsDropdown, setBlogsDropdown] = useState(false);
    const [blogsDropdownsecond, setblogsDropdownsecond] = useState(false);
    const [ismounded, setIsMounted] = useState(false)


    useEffect(() =>{
        setIsMounted(true);
    },[]);

    const toggleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    };

    if(!ismounded){
        return null
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    };



    const isActive = (href) => {
        return pathname === href ||
            (href !== '/' && pathname.startsWith(href));
    };


    const handleLogout = () => {
        dispatch(logout());
        router.push('/Auth')
    }



    const menuItemClass = (active) =>
        `text-lg font-semibold gap-3  ${active ? "text-[#9EFF00]" : "text-white"}`;

    const renderDropdownIcon = (open) =>
        <IoIosArrowDown className={`text-2xl text-black transition-transform ${open ? "rotate-180" : "rotate-0"}`} />;



    const links = (
        <>
            {
                loginData && loginData.email ? (
                    <>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm  font-semibold capitalize ${isActive('/') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/About') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/About">About Us</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/News') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/News">News & Updates</Link>
                        </li>
                        <li className="relative group 2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize text-black">
                            <p className="group-hover:text-[#84C2DB] flex">
                                <span>Membership</span>
                                <span>
                                    <IoIosArrowDown className={`2xl:text-lg lg:text-[12px] xl:text-sm mt-1 transition-transform duration-300 ${ishover ? "rotate-180" : "rotate-0"}`} />
                                </span>
                            </p>
                            {/* Membership dropdown */}
                            <ul className="absolute left-0 top-full hidden group-hover:block bg-[#ffffff] shadow-[#6e6e6e] shadow-lg rounded-lg w-80 space-y-1 px-5 py-5 z-50">
                                {/* Benefit dropdown */}
                                <li className="relative hover:bg-[#84C2DB] rounded-sm">
                                    <div className="cursor-pointer text-[16px] capitalize flex justify-between p-2 rounded-sm peer">
                                        <span>Benefit</span>
                                        <span><IoIosArrowForward /></span>
                                    </div>
                                    {/* Nested submenu: appears when div OR submenu is hovered */}
                                    <ul className="absolute left-full top-0 hidden peer-hover:block hover:block bg-[#84C2DB] rounded-lg p-2 z-50 -ml-1 w-60">
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/General-Member" className="hover:bg-gray-700 capitalize">General Mamber</Link>
                                        </li>
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/Student-Member" className="hover:bg-gray-700 capitalize">Student Mamber</Link>
                                        </li>
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/Legal-Protection" className="hover:bg-gray-700 capitalize">Legal Protection </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="text-[16px] capitalize hover:bg-[#84C2DB] p-2 rounded-sm"> <Link href="/Membership-Application" className=" p-0">membership requirements </Link> </li>
                            </ul>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Gallary') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Gallary">Gallary</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Contact') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Contact">Contact</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Donation') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Donation">Donation</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize text-black cursor-pointer btn rounded-full bg-[#92C0E9] border-none lg:h-7 xl:h-10 lg:w-16 xl:w-32 ${isActive('/Deshboard') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Deshboard">Deshboard</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize text-black cursor-pointer btn rounded-full bg-[#92C0E9] border-none lg:h-7 xl:h-10 lg:w-16 xl:w-24  ${isActive('/Donation') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <button onClick={handleLogout}> Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm  font-semibold capitalize ${isActive('/') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/">Home</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/About') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/About">About Us</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/News') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/News">News & Updates</Link>
                        </li>
                        <li className="relative group 2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize text-black">
                            <p className="group-hover:text-[#84C2DB] flex">
                                <span>Membership</span>
                                <span>
                                    <IoIosArrowDown className={`2xl:text-lg lg:text-[12px] xl:text-sm mt-1 transition-transform duration-300 ${ishover ? "rotate-180" : "rotate-0"}`} />
                                </span>
                            </p>
                            {/* Membership dropdown */}
                            <ul className="absolute left-0 top-full hidden group-hover:block bg-[#ffffff] shadow-[#6e6e6e] shadow-lg rounded-lg w-80 space-y-1 px-5 py-5 z-50">
                                {/* Benefit dropdown */}
                                <li className="relative hover:bg-[#84C2DB] rounded-sm">
                                    <div className="cursor-pointer text-[16px] capitalize flex justify-between p-2 rounded-sm peer">
                                        <span>Benefit</span>
                                        <span><IoIosArrowForward /></span>
                                    </div>
                                    {/* Nested submenu: appears when div OR submenu is hovered */}
                                    <ul className="absolute left-full top-0 hidden peer-hover:block hover:block bg-[#84C2DB] rounded-lg p-2 z-50 -ml-1 w-60">
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/General-Member" className="hover:bg-gray-700 capitalize">General Mamber</Link>
                                        </li>
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/Student-Member" className="hover:bg-gray-700 capitalize">Student Mamber</Link>
                                        </li>
                                        <li className="block px-2 text-[16px] py-1 text-black hover:bg-gray-700 hover:text-white rounded-lg">
                                            <Link href="/Legal-Protection" className="hover:bg-gray-700 capitalize">Legal Protection </Link>
                                        </li>
                                    </ul>
                                </li>
                                <li className="text-[16px] capitalize hover:bg-[#84C2DB] p-2 rounded-sm"> <Link href="/Membership-Application" className=" p-0">membership requirements </Link> </li>
                            </ul>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Gallary') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Gallary">Gallary</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Contact') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Contact">Contact</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize ${isActive('/Donation') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Donation">Donation</Link>
                        </li>
                        <li className={`2xl:text-lg lg:text-[12px] xl:text-sm font-semibold capitalize text-black cursor-pointer btn rounded-full bg-[#92C0E9] border-none lg:h-7 xl:h-10 lg:w-16 xl:w-24  ${isActive('/Donation') ? 'text-[#84C2DB]' : 'text-black'}`}>
                            <Link href="/Auth">Login</Link>
                        </li>
                    </>
                )
            }
        </>
    );

    const mobileLinks = (
        <>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><FaHome /></span>
                <Link href="/" onClick={closeDrawer}>Home</Link>
            </li>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/components/About') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><FaNewspaper /></span>
                <Link href="/About" onClick={closeDrawer}>About Us</Link>
            </li>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/components/News') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><FaPaperPlane /></span>
                <Link href="/News" onClick={closeDrawer}>News</Link>
            </li>
            <li className={`flex-col gap-3 text-sm md:text-lg font-semibold flex px-3 items-center mx-2 bg-[#659cb3] py-0.5 rounded-sm ${menuItemClass(false)}`}>
                <div className="flex items-center justify-between cursor-pointer w-full" onClick={() => setresoursedropdown(!resoursedropdown)}>
                    <div className="flex items-center gap-3 ">
                        <span className="text-lg md:text-2xl text-black"><MdGroups /></span>
                        <span className=" text-black capitalize">Membership</span>
                    </div>
                    {renderDropdownIcon(resoursedropdown)}
                </div>
                {resoursedropdown && (
                    <div className=" mt-2  border-gray-500 pl-0 pb-3">
                        <li className={`flex-col gap-3 py-2  ${menuItemClass(false)}`}>
                            <div className="" onClick={() => setBlogsDropdown(!blogsDropdown)}>
                                <div className="flex justify-between ml-5 cursor-pointer w-[200px] px-2 py-0.5 rounded-sm bg-white  ">
                                    <div className=" text-left">
                                        <p className="text-[12px] text-left text-black capitalize">Benefit</p>
                                    </div>
                                    <div>
                                        <IoIosArrowDown className={`2xl:text-lg lg:text-[12px] xl:text-sm text-black mt-1 transition-transform duration-300  ${isOpen ? 'rotate-180' : 'rotate-0'}`} />
                                    </div>
                                </div>
                            </div>
                            {blogsDropdown && (
                                <ul className=" mt-2  border-gray-500 pl-4 mx-3 ml-5 space-y-1.5">
                                    <h2 className=" bg-black px-2 rounded-sm">
                                        <Link href="/General-Member" className="flex items-center py-1 text-[#ffffff] text-[12px] " onClick={closeDrawer}>General Mamber</Link>
                                    </h2>
                                    <h2 className=" bg-black px-2 rounded-sm">
                                        <Link href="/Student-Member" className="flex items-center py-1 text-[#ffffff] text-[12px] " onClick={closeDrawer}>Student Mamber</Link>
                                    </h2>
                                    <h2 className=" bg-black px-2 rounded-sm">
                                        <Link href="/Legal-Protection" className="flex items-center py-1 text-[#ffffff] text-[12px] " onClick={closeDrawer}>Legal Protection</Link>
                                    </h2>
                                </ul>
                            )}
                        </li>
                        <li className={`flex-col gap-3 py-1  `}>
                            <div className="" onClick={() => setblogsDropdownsecond(!blogsDropdownsecond)}>
                                <div className=" flex justify-between ml-5 cursor-pointer w-[200px] px-2 py-1 rounded-sm bg-white ">
                                    <div className=" text-left">
                                        <Link href="/Membership-Application"> <p className="text-[12px] text-left text-black capitalize" onClick={closeDrawer}>Membership Requierments</p></Link>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </div>
                )}
            </li>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/components/Gallery') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><GrGallery /></span>
                <Link href="/Gallary" onClick={closeDrawer}>Gallery</Link>
            </li>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/components/Contact') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><FaBlenderPhone /></span>
                <Link href="/Contact" onClick={closeDrawer}>Contact</Link>
            </li>
            <li className={`text-sm md:text-lg font-semibold flex gap-3 px-3 items-center capitalize mx-2 bg-[#659cb3] py-1 rounded-sm ${isActive('/components/Membership') ? 'text-[#84C2DB]' : 'text-black'}`}>
                <span className="text-lg md:text-2xl"><FcDonate /></span>
                <Link href="/Donation" onClick={closeDrawer}>Donation</Link>
            </li>
            <div className="  px-5 xl:px-0 pt-3">
                <div className=' flex gap-3 items-center  lg:px-5 xl:pr-14'>
                    {
                        footerData.filter(item => item.selectedType === 'Facebook').slice(-1).map((data) => (
                            <a key={data.id} href={data.socialLink} target='_blank' >
                                <FaFacebook className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                            </a>
                        ))
                    }
                    {
                        footerData.filter(item => item.selectedType === 'Youtube').slice(-1).map((data) => (
                            <a key={data.id} href={data.socialLink} target='_blank' >
                                <FaYoutube className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                            </a>
                        ))
                    }
                    {
                        footerData
                            .filter(item => item.selectedType === 'Twitter')
                            .slice(-1)
                            .map((data) => (
                                <a key={data.id} href={data.socialLink} target='_blank'>
                                    <FaSquareXTwitter className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                                </a>
                            ))
                    }
                    {
                        footerData.filter(item => item.selectedType === 'Linkedin').slice(-1).map((data) => (
                            <a key={data.id} href={data.socialLink} target='_blank' >
                                <BsLinkedin className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                            </a>
                        ))
                    }
                </div>
            </div>
        </>
    );

    return (
        <div className="sticky top-0 lg:top-5 z-40 ">
            <div className="navbar max-w-[1596px] h-14 md:h-16 lg:20 xl:h-24 mx-auto bg-white/60 backdrop-blur-sm rounded-none lg:rounded-2xl xl:rounded-3xl">
                <div className="navbar-start">
                    <Link href="/">
                        <h1 className="flex items-center gap-2">
                            <span className="text-lg md:text-3xl font-extrabold text-[#A259FF] pl-0 xl:pl-10">
                                <Image src={ssltlogo} className=" h-14 w-20 xl:h-20 xl:w-28 "></Image>
                            </span>
                        </h1>
                    </Link>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-3 lg:gap-1 xl:gap-3">{links}</ul>
                </div>
                <div className="navbar-end">
                    <div className="  px-5 xl:px-0 hidden lg:block">
                        <div className=' flex gap-3 items-center justify-center lg:px-5 xl:pr-14'>
                            {
                                footerData.filter(item => item.selectedType === 'Facebook').slice(-1).map((data) => (
                                    <a key={data.id} href={data.socialLink} target='_blank' >
                                        <FaFacebook className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                                    </a>

                                ))
                            }
                            {
                                footerData.filter(item => item.selectedType === 'Youtube').slice(-1).map((data) => (
                                    <a key={data.id} href={data.socialLink} target='_blank'  >
                                        <FaYoutube className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                                    </a>
                                ))
                            }
                            {
                                footerData
                                    .filter(item => item.selectedType === 'Twitter')
                                    .slice(-1)
                                    .map((data) => (
                                        <a key={data.id} href={data.socialLink} target='_blank'>
                                            <FaSquareXTwitter className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                                        </a>
                                    ))
                            }
                            {
                                footerData.filter(item => item.selectedType === 'Linkedin').slice(-1).map((data) => (
                                    <a key={data.id} href={data.socialLink} target='_blank'  >
                                        <BsLinkedin className='text-3xl lg:text-2xl xl:text-3xl text-black' />
                                    </a>
                                ))
                            }
                        </div>
                    </div>
                    <div className="dropdown block lg:hidden">
                        <button
                            className="btn bg-[#84C2DB] shadow-2xs border-none lg:hidden"
                            onClick={toggleDrawer}>
                            <RiMenu2Line className="text-2xl text-black" />
                        </button>
                        {/* Drawer with Animation */}
                        <div className={`fixed inset-0 z-40 transition-opacity duration-300 ${isDrawerOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                            {/* Overlay */}
                            <div
                                className="fixed inset-0 bg-black/50 transition-opacity duration-300"
                                onClick={closeDrawer}>
                            </div>
                            {/* Drawer Side */}
                            <div className={`w-[90%] fixed top-0 left-0 h-full  max-w-md bg-white/60 backdrop-blur-sm text-white transform transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : '-translate-x-full'} `}>
                                <div className="flex pt-3 px-5 items-center justify-between border-b border-[#585858] pb-6">
                                    <div>
                                        <h1 className=" items-center gap-2">
                                            <span className="text-lg md:text-3xl font-extrabold text-[#A259FF]">
                                                <Image src={ssltlogo} className=" h-12 w-20"></Image>
                                            </span>
                                        </h1>
                                    </div>
                                    <div>
                                        <button className=" text-black cursor-pointer btn rounded-full bg-[#92C0E9] border-none h-7 " onClick={closeDrawer} >
                                            Close
                                        </button>
                                    </div>
                                </div>
                                <div className="overflow-y-auto h-[calc(100vh-2px)] bg-white -mt-6 pt-4 ">
                                    <ul className=" mt-0 space-y-2 ">
                                        {mobileLinks}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar