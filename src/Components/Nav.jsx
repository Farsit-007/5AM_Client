import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <div className='h-[64px] flex justify-end items-center bg-slate-400 w-full'>
             <ul className='flex gap-3 items-center px-10'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/login'}>Login</Link></li>
                <li><Link to={'/register'}>Register</Link></li>
             </ul>
        </div>
    );
};

export default Nav;