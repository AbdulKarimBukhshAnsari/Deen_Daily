import React from 'react';
import { Heart, Github, Instagram } from 'lucide-react';

function Footer()  {
  return (
    <footer className="bg-[#4E1F00] text-white py-12">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-6 md:mb-0">
            <h2 className="text-2xl font-bold mb-2">DeenDaily</h2>
            <p className="text-white/[0.7] max-w-md">
              Nurturing your spiritual journey through daily Islamic practices and personalized guidance.
            </p>
          </div>

          <div className="flex space-x-6">
            <a href="https://github.com/AbdulKarimBukhshAnsari/Deen_Daily"  target='_blank' className="hover:text-white/[0.8] transition-colors">
              <Github size={24} />
            </a>
          </div>
        </div>

        <hr className="border-white/[0.2] my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center text-white/[0.7]">
          <div className="mb-4 md:mb-0">
            <ul className="flex flex-wrap gap-6">
              <li><a href="#" className="hover:text-white transition-colors">About</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>

          <div className="flex items-center">
            <span className="flex items-center">
              Made with <Heart size={16} className="mx-1 text-[#EF4444]" /> for the Ummah
            </span>
          </div>
        </div>

        <div className="text-center mt-8 text-white/[0.5] text-sm">
          <p>© {new Date().getFullYear()} DeenDaily. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
