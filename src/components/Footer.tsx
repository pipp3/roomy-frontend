'use client';

import React from 'react';
import Link from 'next/link';
import { 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  MapPinIcon,
  HeartIcon,
  CalendarDaysIcon,
  ClockIcon,
  UserGroupIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-purple-500 rounded-full blur-xl"></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-emerald-500 rounded-full blur-xl"></div>
      </div>

      {/* Main Footer Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl mr-3">
                <BuildingOfficeIcon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white">RoomyApp</h3>
            </div>
            <p className="text-slate-300 mb-6 leading-relaxed">
              La solución inteligente para gestionar las reservas de salas de reuniones 
              de tu empresa de manera eficiente y sin complicaciones.
            </p>
            <div className="flex space-x-3">
              <div className="group w-10 h-10 bg-blue-600/20 border border-blue-500/30 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 cursor-pointer">
                <CalendarDaysIcon className="w-5 h-5 text-blue-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="group w-10 h-10 bg-emerald-600/20 border border-emerald-500/30 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:border-emerald-500 transition-all duration-300 cursor-pointer">
                <ClockIcon className="w-5 h-5 text-emerald-400 group-hover:text-white transition-colors duration-300" />
              </div>
              <div className="group w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center hover:bg-purple-600 hover:border-purple-500 transition-all duration-300 cursor-pointer">
                <UserGroupIcon className="w-5 h-5 text-purple-400 group-hover:text-white transition-colors duration-300" />
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4 flex items-center">
              <SparklesIcon className="w-5 h-5 mr-2 text-blue-400" />
              Enlaces Rápidos
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="group text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Dashboard</span>
                </Link>
              </li>
              <li>
                <Link href="/nueva-reserva" className="group text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Nueva Reserva</span>
                </Link>
              </li>
              <li>
                <Link href="/reservas" className="group text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Mis Reservas</span>
                </Link>
              </li>
              <li>
                <a href="#" className="group text-slate-300 hover:text-blue-400 transition-all duration-200 flex items-center">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Ayuda</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Características</h4>
            <ul className="space-y-3">
              <li className="group text-slate-300 flex items-center hover:text-emerald-400 transition-colors duration-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                <span>Reservas en tiempo real</span>
              </li>
              <li className="group text-slate-300 flex items-center hover:text-emerald-400 transition-colors duration-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                <span>Gestión inteligente</span>
              </li>
              <li className="group text-slate-300 flex items-center hover:text-emerald-400 transition-colors duration-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                <span>Autenticación segura</span>
              </li>
              <li className="group text-slate-300 flex items-center hover:text-emerald-400 transition-colors duration-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                <span>Interfaz moderna</span>
              </li>
              <li className="group text-slate-300 flex items-center hover:text-emerald-400 transition-colors duration-200">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full mr-3 group-hover:scale-125 transition-transform duration-200"></span>
                <span>Notificaciones inteligentes</span>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contacto</h4>
            <div className="space-y-3">
              <div className="group flex items-center text-slate-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                <div className="p-2 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors duration-200">
                  <EnvelopeIcon className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors duration-200" />
                </div>
                <span>soporte@roomyapp.com</span>
              </div>
              <div className="group flex items-center text-slate-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                <div className="p-2 bg-blue-600/20 rounded-lg mr-3 group-hover:bg-blue-600 transition-colors duration-200">
                  <PhoneIcon className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors duration-200" />
                </div>
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="group flex items-start text-slate-300 hover:text-blue-400 transition-colors duration-200 cursor-pointer">
                <div className="p-2 bg-blue-600/20 rounded-lg mr-3 mt-0.5 group-hover:bg-blue-600 transition-colors duration-200">
                  <MapPinIcon className="w-4 h-4 text-blue-400 group-hover:text-white transition-colors duration-200" />
                </div>
                <span>123 Business Ave<br />Suite 100<br />Ciudad, Estado 12345</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-slate-700/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-slate-400 text-sm mb-4 md:mb-0">
              <span>© {currentYear} RoomyApp. Todos los derechos reservados.</span>
            </div>
            
            <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm">
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:underline">
                Política de Privacidad
              </a>
              <a href="#" className="text-slate-400 hover:text-blue-400 transition-colors duration-200 hover:underline">
                Términos de Servicio
              </a>
              <div className="flex items-center text-slate-400">
                <span>Hecho con</span>
                <HeartIcon className="w-4 h-4 mx-1 text-red-500 animate-pulse" />
                <span>para empresas modernas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 