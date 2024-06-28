import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Logo from './Logo';
import Profile, { MoonIcon, SunIcon } from './Icons';
import useThemeSwitcher from './hook/useThemeSwitcher';
import signInWithGoogle from './Login';
import { auth } from '../config/firebase'; // Import auth from your firebase config
import { signOut } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CustomLink = ({ href, title, className = "", toggle }) => {
    const router = useRouter();

    const handleClick = () => {
        if (toggle) toggle();
        router.push(href);
    };

    return (
        <button className={`${className} relative group text-dark dark:text-light`} onClick={handleClick}>
            {title}
            <span className={`h-[1px] inline-block bg-dark 
                absolute left-0 -bottom-0.5
                group-hover:w-full transition-[width] ease duration-300
                dark:bg-light
                ${router.asPath === href ? 'w-full' : 'w-0'}
            `}>&nbsp;</span>
        </button>
    );
};

const CustomMobileLink = ({ href, title, className = "", toggle }) => {
    const router = useRouter();

    const handleClick = () => {
        if (toggle) toggle();
        router.push(href);
    };

    return (
        <button className={`${className} relative group text-light dark:text-dark my-2`} onClick={handleClick}>
            {title}
            <span className={`h-[1px] inline-block bg-light 
                absolute left-0 -bottom-0.5
                group-hover:w-full transition-[width] ease duration-300
                dark:bg-dark
                ${router.asPath === href ? 'w-full' : 'w-0'}
            `}>&nbsp;</span>
        </button>
    );
};

const Navbar = () => {
    const [mode, setMode] = useThemeSwitcher();
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

    const handleMenuClick = () => {
        setIsOpen(!isOpen);
    };

    const handleProfileClick = () => {
        setIsProfileMenuOpen(!isProfileMenuOpen);
    };

    const handleLogout = async () => {
        try {
            await signOut(auth);
            setUser(null);
            toast.success('Logout successfully!');
            setIsProfileMenuOpen(false);
        } catch (error) {
            console.error('Error during sign-out:', error);
            toast.error('Logout failed!');
        }
    };

    return (
        <header className={`w-full px-32 py-8 font-medium flex items-center justify-between relative z-10 lg:px-16 md:px-12 sm:px-8
            ${mode === "dark" ? "dark:text-light" : "text-dark"}
        `}>
            <ToastContainer />
            <button className='flex flex-col justify-center items-center hidden lg:flex' onClick={handleMenuClick}>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6
                    rounded-sm -translate-y-0.5 ${isOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}>
                </span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 
                    rounded-sm my-0.5 ${isOpen ? 'opacity-0' : 'opacity-100'}`}>
                </span>
                <span className={`bg-dark dark:bg-light block transition-all duration-300 ease-out h-0.5 w-6 
                    rounded-sm translate-y-0.5 ${isOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}>
                </span>
            </button>

            <div className='w-full flex justify-between items-center lg:hidden'>
                <nav>
                    <CustomLink href='/' title='Home' className='mr-4' />
                    <CustomLink href='/about' title='About' className='mx-4' />
                    <CustomLink href='/product' title='Product' className='mx-4' />
                    <CustomLink href='/article' title='Article' className='ml-4' />
                </nav>

                <nav className='flex items-center justify-center flex-wrap'>
                    <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
                        className={`mr-3 flex items-center justify-center rounded-full p-1
                            ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark"}
                    `}>
                        {mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />}
                    </button>
                    <div className='relative'>
                        <motion.a
                            onClick={user ? handleProfileClick : () => signInWithGoogle(setUser)}
                            whileHover={{ y: -4 }}
                            whileTap={{ scale: 0.9 }}
                            className='w-6 h-6 flex items-center justify-center rounded-full overflow-hidden cursor-pointer'>
                            {user ? <img src={user.photoURL} alt="User Profile" className="w-full h-full object-cover" /> : <Profile />}
                        </motion.a>
                        {isProfileMenuOpen && (
                            <div className='absolute right-0 mt-2 py-2 w-48 bg-white dark:bg-dark border rounded shadow-xl'>
                                {user && (
                                    <>
                                        <div className='block px-4 py-2 text-dark dark:text-light w-full text-left'>
                                            {user.displayName}
                                        </div>
                                        <CustomLink
                                            href='/manage'
                                            title='Manage'
                                            className='block px-4 py-2 text-dark hover:bg-light dark:hover:bg-slate-400 dark:text-light w-full text-left'
                                            toggle={handleProfileClick}
                                        />
                                    </>
                                )}
                                <button
                                    onClick={handleLogout}
                                    className='block px-4 py-2 text-dark hover:bg-light dark:hover:bg-slate-400 dark:text-light w-full text-left'>
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </nav>
            </div>

            {isOpen ?
                <motion.div
                    initial={{ scale: 0, opacity: 0, x: "-50%", y: "-50%" }}
                    animate={{ scale: 1, opacity: 1 }}
                    className='min-w-[70vw] flex flex-col justify-between z-30 items-center fixed 
                        top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-dark/90 dark:bg-light/70
                        rounded-lg backdrop-blur-md py-32'>
                    <nav className='flex items-center flex-col justify-center'>
                        <CustomMobileLink href='/' title='Home' toggle={handleMenuClick} />
                        <CustomMobileLink href='/about' title='About' toggle={handleMenuClick} />
                        <CustomMobileLink href='/product' title='Product' toggle={handleMenuClick} />
                        <CustomMobileLink href='/article' title='Article' toggle={handleMenuClick} />
                    </nav>
                    <nav className='flex items-center justify-center flex-wrap mt-2'>
                        <button onClick={() => setMode(mode === "light" ? "dark" : "light")}
                            className={`mr-3 flex items-center justify-center rounded-full p-1
                                ${mode === "light" ? "bg-dark text-light" : "bg-light text-dark sm:mx-1"}
                        `}>
                            {mode === "dark" ? <SunIcon className={"fill-dark"} /> : <MoonIcon className={"fill-dark"} />}
                        </button>
                        <div className='relative'>
                            <motion.a
                                onClick={user ? handleProfileClick : () => signInWithGoogle(setUser)}
                                whileHover={{ y: -4 }}
                                whileTap={{ scale: 0.9 }}
                                className='w-6 h-6 flex items-center justify-center rounded-full overflow-hidden cursor-pointer'>
                                {user ? <img src={user.photoURL} alt="User Profile" className="w-full h-full object-cover" /> : <Profile />}
                            </motion.a>
                            {isProfileMenuOpen && (
                                <div className='absolute right-0 mt-2 py-2 w-48 bg-white border rounded shadow-xl'>
                                    {user && (
                                    <>
                                        <div className='block px-4 py-2 text-dark dark:text-light w-full text-left'>
                                            {user.displayName}
                                        </div>
                                        <CustomLink
                                            href='/manage'
                                            title='Manage'
                                            className='block px-4 py-2 text-dark hover:bg-light dark:hover:bg-slate-400 dark:text-light w-full text-left'
                                            toggle={handleProfileClick}
                                        />
                                    </>
                                )}
                                    <button
                                        onClick={handleLogout}
                                        className='block px-4 py-2 text-gray-800 hover:bg-gray-200 w-full text-left'>
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </nav>
                </motion.div>
                : null}

            <div className='absolute left-[50%] top-2 translate-x-[-50%]'>
                <Logo />
            </div>
        </header>
    );
};

export default Navbar;
