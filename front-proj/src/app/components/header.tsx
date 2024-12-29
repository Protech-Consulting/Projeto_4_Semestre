'use client';
import React, { useState } from 'react';  // Importando explicitamente o React e useState
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [cartCount, setCartCount] = useState(0); // Estado para contagem do carrinho

  return (
    <header className="bg-purple-950 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="text-2xl outline-none font-bold">
          <Image
            src="/images/logo.jpg"
            alt="Logo Andrade Imports"
            width={48} // Defina a largura da imagem
            height={48} // Defina a altura da imagem
            className="w-12 h-12"
          />
          <span className='text-white'>Andrade Imports</span>
        </Link>

        {/* Links de navegação */}
        <nav>
          <input type="search" className='w-full' />
          <ul className="flex space-x-6">
            <li><Link href="/" className="hover:text-gray-400">Home</Link></li>
            <li><Link href="/products" className="hover:text-gray-400">Produtos</Link></li>
            <li><Link href="/about" className="hover:text-gray-400">WhatsApp</Link></li>
            <li><Link target='_blank' href="https://www.instagram.com/_andrade_imports?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" className="hover:text-gray-400">Instagram</Link></li>
          </ul>
        </nav>

        {/* Carrinho */}
        <div className="relative">
          <Link href="/cart">
            <span className="material-icons">shopping_cart</span>
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
