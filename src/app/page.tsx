'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CalendarDaysIcon, ClockIcon, PlusIcon, ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline';
import { CalendarDaysIcon as CalendarSolidIcon, ClockIcon as ClockSolidIcon, UserGroupIcon as UserGroupSolidIcon } from '@heroicons/react/24/solid';
import { useAuth } from '@/stores/authStore';
import { useReservaStore, useReservas, useReservasLoading, useReservasError } from '@/stores/reservaStore';
import { Reserva } from '@/types';
import Link from 'next/link';
import AuthGuard from '@/components/AuthGuard';
import SkeletonLoader from '@/components/SkeletonLoader';
import Avatar from '@/components/Avatar';
import { useToast } from '@/hooks/useToast';
import { formatearFechaSinZonaHoraria } from '@/lib/dateUtils';


const DashboardPage: React.FC = () => {
  const { usuario } = useAuth();
  const { reservas, loading, error, cargarReservas } = useReservaStore();
  const toast = useToast();
  
  // Flags para evitar duplicaciones
  const welcomeShownRef = useRef(false);
  const lastUsuarioIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (!usuario) return;

    if (lastUsuarioIdRef.current === usuario.id) {
      return;
    }

    lastUsuarioIdRef.current = usuario.id;

    // Mostrar bienvenida solo la primera vez en esta sesión del navegador
    const welcomeShown = sessionStorage.getItem('welcomeShown');
    if (!welcomeShown) {
      toast.auth.loginSuccess(usuario.nombre);
      sessionStorage.setItem('welcomeShown', 'true');
      welcomeShownRef.current = true;
    }

    cargarReservas();
  }, [usuario, cargarReservas, toast]);

  const reservasHoy = reservas.filter(reserva => {
    const fechaReserva = new Date(reserva.fecha);
    const hoy = new Date();
    return fechaReserva.toDateString() === hoy.toDateString();
  });

  const proximasReservas = reservas
    .filter(reserva => new Date(reserva.fecha) >= new Date())
    .sort((a, b) => new Date(a.fecha).getTime() - new Date(b.fecha).getTime())
    .slice(0, 3);

  const handleNuevaReserva = () => {
    // Función vacía - eliminada notificación de redirección
  };

  const handleGestionarReservas = () => {
    // Función vacía - eliminada notificación de redirección
  };

  const handleVerTodasReservas = () => {
    // Función vacía - eliminada notificación de redirección
  };

  const handleStatsClick = (type: 'total' | 'today' | 'salas') => {
    switch (type) {
      case 'total':
        if (reservas.length > 0) {
          toast.info(`Tienes ${reservas.length} reserva${reservas.length !== 1 ? 's' : ''} en total`, {
            description: 'Haz clic en "Gestionar Reservas" para verlas todas',
          });
        } else {
          toast.info('¡Perfecto momento para empezar!', {
            description: 'Haz tu primera reserva y comienza a organizar tus reuniones',
          });
        }
        break;
      case 'today':
        if (reservasHoy.length > 0) {
          toast.success(`¡Tienes ${reservasHoy.length} reserva${reservasHoy.length !== 1 ? 's' : ''} hoy!`, {
            description: reservasHoy.map(r => `${r.sala} (${r.horaInicio}-${r.horaFin})`).join(', '),
          });
        } else {
          toast.info('Agenda libre hoy', {
            description: '¡Perfecto día para planificar nuevas reuniones!',
          });
        }
        break;
      case 'salas':
        const salasUnicas = new Set(reservas.map(r => r.sala));
        if (salasUnicas.size > 0) {
          toast.info(`Has reservado ${salasUnicas.size} sala${salasUnicas.size !== 1 ? 's' : ''} diferente${salasUnicas.size !== 1 ? 's' : ''}`, {
            description: Array.from(salasUnicas).join(', '),
          });
        } else {
          toast.info('Explora nuestras salas', {
            description: '¡Descubre todas las opciones disponibles para tus reuniones!',
          });
        }
        break;
    }
  };

  const handleReservaClick = (reserva: Reserva) => {
    toast.info(`Reserva en ${reserva.sala}`, {
      description: `${formatearFechaSinZonaHoraria(reserva.fecha)} de ${reserva.horaInicio} a ${reserva.horaFin}`,
      action: {
        label: 'Ver detalles',
        onClick: () => {
          // Función vacía - eliminada notificación de redirección
        },
      },
    });
  };

  if (loading) {
    return (
      <AuthGuard>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <SkeletonLoader variant="dashboard" />
        </div>
      </AuthGuard>
    );
  }

  return (
    <AuthGuard>
      <div className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-16">
          {/* Header Section */}
          <div className="mb-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-full -mr-16 -mt-16 opacity-10"></div>
              <div className="relative flex items-center space-x-4">
                <Avatar 
                  src={usuario?.avatar} 
                  alt={usuario?.nombre}
                  size="xl"
                  className="flex-shrink-0"
                />
                <div>
                  <h1 className="text-3xl font-bold text-slate-800 mb-2">
                    ¡Hola, {usuario?.nombre}! 👋
                  </h1>
                  <p className="text-slate-600 text-lg">
                    {reservas.length > 0 
                      ? 'Aquí tienes un resumen de tus reservas y actividad reciente'
                      : 'Bienvenido a tu dashboard. ¡Es hora de hacer tu primera reserva!'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Error Alert */}
        {error && (
            <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-red-800 font-medium">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Reservas */}
            <div 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleStatsClick('total')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <CalendarSolidIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-600 font-medium">Total de Reservas</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-slate-800">{reservas.length}</span>
                <div className="text-blue-600 text-sm font-medium bg-blue-50 px-2 py-1 rounded-lg">
                  {reservas.length > 0 ? 'Activas' : 'Ninguna'}
                </div>
              </div>
            </div>

            {/* Reservas Hoy */}
            <div 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleStatsClick('today')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <ClockSolidIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-600 font-medium">Reservas Hoy</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-slate-800">{reservasHoy.length}</span>
                <div className="text-emerald-600 text-sm font-medium bg-emerald-50 px-2 py-1 rounded-lg">
                  {reservasHoy.length > 0 ? 'Hoy' : 'Libres'}
                </div>
              </div>
            </div>

            {/* Salas Diferentes */}
            <div 
              className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
              onClick={() => handleStatsClick('salas')}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl shadow-sm group-hover:scale-110 transition-transform duration-300">
                    <UserGroupSolidIcon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-slate-600 font-medium">Salas Diferentes</h3>
                  </div>
                </div>
              </div>
              <div className="flex items-end justify-between">
                <span className="text-3xl font-bold text-slate-800">{new Set(reservas.map(r => r.sala)).size}</span>
                <div className="text-purple-600 text-sm font-medium bg-purple-50 px-2 py-1 rounded-lg">
                  {new Set(reservas.map(r => r.sala)).size > 0 ? 'Únicas' : 'Explorar'}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Próximas Reservas */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-slate-800">Próximas Reservas</h2>
                  {reservas.length > 0 && (
                    <Link href="/reservas" onClick={handleVerTodasReservas}>
                      <button className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors duration-200">
                        Ver todas
                        <ArrowRightIcon className="w-4 h-4 ml-1" />
                      </button>
                    </Link>
                  )}
                </div>
                
                {proximasReservas.length > 0 ? (
                  <div className="space-y-4">
                    {proximasReservas.map((reserva, index) => (
                      <div
                        key={reserva._id}
                        className="group bg-gradient-to-r from-slate-50 to-blue-50 border border-slate-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 hover:from-blue-50 hover:to-indigo-50 cursor-pointer"
                        onClick={() => handleReservaClick(reserva)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
                            <div>
                              <h3 className="font-semibold text-slate-800 group-hover:text-blue-700 transition-colors duration-200">
                              {reserva.sala}
                              </h3>
                              <div className="flex items-center space-x-4 mt-1">
                                <span className="text-slate-600 text-sm flex items-center">
                                  <CalendarDaysIcon className="w-4 h-4 mr-1" />
                              {formatearFechaSinZonaHoraria(reserva.fecha)}
                                </span>
                                <span className="text-slate-600 text-sm flex items-center">
                                  <ClockIcon className="w-4 h-4 mr-1" />
                              {reserva.horaInicio} - {reserva.horaFin}
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-lg text-xs font-medium">
                              #{index + 1}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <CalendarDaysIcon className="w-16 h-16 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-slate-600 font-medium mb-2">
                      {reservas.length === 0 ? '¡Tu primera reserva te espera!' : 'No tienes reservas próximas'}
                    </h3>
                    <p className="text-slate-500 text-sm mb-6">
                      {reservas.length === 0 
                        ? 'Comienza a organizar tus reuniones de manera eficiente'
                        : '¡Haz una nueva reserva para mantener tu agenda activa!'
                      }
                    </p>
                    <Link href="/nueva-reserva" onClick={handleNuevaReserva}>
                      <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200">
                        <PlusIcon className="w-4 h-4 mr-2" />
                        {reservas.length === 0 ? 'Crear mi primera reserva' : 'Nueva Reserva'}
                      </button>
                  </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Acciones Rápidas */}
            <div className="space-y-6">
              {/* Quick Actions Card */}
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h2 className="text-xl font-bold text-slate-800 mb-6">Acciones Rápidas</h2>
                
                <div className="space-y-4">
                  <Link href="/nueva-reserva" className="block" onClick={handleNuevaReserva}>
                    <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
                      <div className="flex items-center justify-center space-x-3">
                        <PlusIcon className="w-6 h-6" />
                        <span>Nueva Reserva</span>
                      </div>
                    </button>
                  </Link>
                  
                  {reservas.length > 0 && (
                    <Link href="/reservas" className="block" onClick={handleGestionarReservas}>
                      <button className="w-full bg-white border-2 border-slate-200 hover:border-blue-300 text-slate-700 hover:text-blue-700 font-semibold py-4 px-6 rounded-xl transition-all duration-300 hover:shadow-md">
                        <div className="flex items-center justify-center space-x-3">
                          <EyeIcon className="w-6 h-6" />
                          <span>Gestionar Reservas</span>
                        </div>
                      </button>
                  </Link>
                  )}
                </div>
              </div>

              {/* Stats Summary Card */}
              {reservas.length > 0 && (
                <div className="bg-gradient-to-br from-indigo-600 to-purple-700 rounded-2xl shadow-lg p-6 text-white">
                  <h3 className="font-bold text-lg mb-4">Resumen de Actividad</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-100">Esta semana</span>
                      <span className="font-semibold">
                        {reservas.filter(r => {
                          const fechaReserva = new Date(r.fecha);
                          const hoy = new Date();
                          const inicioSemana = new Date(hoy.setDate(hoy.getDate() - hoy.getDay()));
                          return fechaReserva >= inicioSemana;
                        }).length} reservas
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-indigo-100">Sala favorita</span>
                      <span className="font-semibold">
                        {reservas.length > 0 
                          ? Object.entries(
                              reservas.reduce((acc: Record<string, number>, reserva) => {
                                acc[reserva.sala] = (acc[reserva.sala] || 0) + 1;
                                return acc;
                              }, {})
                            ).sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A'
                          : 'N/A'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        

      </div>
    </AuthGuard>
  );
};

export default DashboardPage;
