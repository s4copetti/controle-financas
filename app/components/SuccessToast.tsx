"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const mensagens: Record<string, string> = {
  criada: 'Transação registrada com sucesso!',
  editada: 'Transação atualizada com sucesso!',
  excluida: 'Transação excluída com sucesso!',
};

export function SuccessToast() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const sucesso = searchParams.get('sucesso');
  const [visivel, setVisivel] = useState(false);

  useEffect(() => {
    if (sucesso && mensagens[sucesso]) {
      setVisivel(true);
      const timer = setTimeout(() => {
        setVisivel(false);
        router.replace('/dashboard');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [sucesso, router]);

  if (!sucesso || !mensagens[sucesso] || !visivel) return null;

  return (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-emerald-600 text-white text-sm font-medium px-4 py-3 rounded-xl shadow-xl animate-in fade-in slide-in-from-top-2">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M20 6 9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {mensagens[sucesso]}
    </div>
  );
}