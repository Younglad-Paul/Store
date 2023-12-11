'use client'
import React, { useState } from 'react';
import { Nav } from '@/app/ul/Navs';
import { Items } from '@/app/ul/Navs';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const Page = () => {
  const pathname = usePathname();
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    // Increment the cart count when "Add to Cart" is clicked
    setCartCount(cartCount + 1);
  };
 
   return (
     <div>
       <section className='w-full bg-black text-white h-14 '>
             <nav className='flex justify-end w-full font-bold items-center h-14'>
                 {Nav.map((link,i) =>{
                     const active = pathname === link.path;
 
                     return(
                         <li key={i} className='flex '> 
                             <Link href={link.path}>
                                 <div className={`mr-10 ${active ? 'text-yellow-500' : 'text-primary'}`}>
                                     {link.label}
                                 </div>
                             </Link>
                         </li>
                     )
                 })}
                 <p className='mr-6 flex justify-start'>: {cartCount}</p>
             </nav>
       </section>
       <section className='m-10 flex justify-center '>
         <div className=' grid lg:flex'>
             {Items.map((item, i) => (
                 <div key={i} className='border-2 border-black rounded-md w-44 h-44 m-10 lg:m-0 lg:mr-4 '>
                     <Image src={item.img} alt={item.text} width={176} height={176} />
                     <p className='text-center'>{item.text}</p>
                     <div className='w-full bg-purple-500 rounded-md' onClick={handleAddToCart}><p className='text-center text-white font-bold p-2 hover:bg-purple-900 cursor-pointer'>Add to Cart</p></div>
                 </div>
             ))}
         </div>
       </section>
       <section>
        
       </section>
     </div>
   );
 };
 
 export default Page;
 