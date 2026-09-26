"use client";

import { useState } from 'react';

export function PasswordInput() {
  const [mostrar, setMostrar] = useState(false);

  return (
    <div className="relative">
      <input
        type={mostrar ? 'text' : 'password'}
        name="password"
        placeholder="Digite sua senha"
        required
        className="w-full border border-slate-200 p-3 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
      />
      <button
        type="button"
        onClick={() => setMostrar(!mostrar)}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-rose-500 transition"
        aria-label={mostrar ? 'Ocultar senha' : 'Mostrar senha'}
      >
        {mostrar ? (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a18.5 18.5 0 0 1 5.06-5.94M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M1 1l22 22" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
            <circle cx="12" cy="12" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}