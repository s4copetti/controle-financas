"use client";

import Link from 'next/link';
import { useState, useTransition } from 'react';
import { Lora } from 'next/font/google';
import { excluirTransacao } from '@/app/actions/transacoes';

const lora = Lora({
  subsets: ['latin'],
  weight: ['600'],
});

type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  criado_em: string;
};

export function CardTransacao({ data }: { data: Transacao }) {
  const [modalAberto, setModalAberto] = useState(false);
  const [excluindo, startTransition] = useTransition();

  const isReceita = data.tipo === 'receita';
  const valor = Number(data.valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const dataFormatada = new Date(data.criado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  function confirmarExclusao() {
    startTransition(async () => {
      await excluirTransacao(data.id);
      setModalAberto(false);
    });
  }

  return (
    <>
      <div className="flex items-center justify-between gap-3 p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-rose-100">
        <div className="flex items-center gap-4 min-w-0">
          <span
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
              isReceita ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-500'
            }`}
          >
            {isReceita ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </span>
          <div className="min-w-0">
            <p className={`${lora.className} text-slate-800 truncate`}>{data.descricao}</p>
            <p className="text-xs text-slate-400 capitalize">{dataFormatada}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <span className={`font-bold ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isReceita ? '+ ' : '- '}{valor}
          </span>

          <Link
            href={`/dashboard/editar-transacao/${data.id}`}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-100 hover:text-rose-600 transition"
            title="Editar"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
            </svg>
          </Link>

          <button
            type="button"
            onClick={() => setModalAberto(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-rose-50 hover:text-rose-600 transition"
            title="Excluir"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" />
            </svg>
          </button>
        </div>
      </div>

      {/* Modal de confirmação */}
      {modalAberto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4"
          onClick={() => !excluindo && setModalAberto(false)}
        >
          <div
            className="bg-white rounded-3xl shadow-2xl p-7 w-full max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-center mb-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" strokeLinecap="round" />
                </svg>
              </span>
            </div>

            <h3 className="text-lg font-semibold text-slate-800 text-center mb-1">
              Excluir transação?
            </h3>
            <p className="text-sm text-slate-500 text-center mb-6">
              Tem certeza que deseja excluir <span className="font-medium text-slate-700">&quot;{data.descricao}&quot;</span>? Essa ação não pode ser desfeita.
            </p>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setModalAberto(false)}
                disabled={excluindo}
                className="flex-1 border border-slate-200 text-slate-600 font-medium py-2.5 rounded-xl hover:bg-slate-50 transition disabled:opacity-50"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={confirmarExclusao}
                disabled={excluindo}
                className="flex-1 bg-rose-600 text-white font-medium py-2.5 rounded-xl hover:bg-rose-700 transition disabled:opacity-50"
              >
                {excluindo ? 'Excluindo...' : 'Excluir'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}