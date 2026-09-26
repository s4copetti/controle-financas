"use client";

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { CATEGORIAS } from '@/lib/categorias';
import { CardTransacao } from './CardTransacao';

type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  categoria: string;
  criado_em: string;
};

export function HistoricoTransacoes({ transacoes }: { transacoes: Transacao[] }) {
  const [busca, setBusca] = useState('');
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'receita' | 'despesa'>('todos');
  const [filtroCategoria, setFiltroCategoria] = useState('todas');

  const filtradas = useMemo(() => {
    return transacoes.filter((t) => {
      const bateBusca = t.descricao.toLowerCase().includes(busca.toLowerCase());
      const bateTipo = filtroTipo === 'todos' || t.tipo === filtroTipo;
      const bateCategoria = filtroCategoria === 'todas' || t.categoria === filtroCategoria;
      return bateBusca && bateTipo && bateCategoria;
    });
  }, [transacoes, busca, filtroTipo, filtroCategoria]);

  // Nenhuma transação cadastrada ainda (estado vazio "guiado")
  if (transacoes.length === 0) {
    return (
      <div className="text-center py-14 bg-white/70 rounded-3xl border border-dashed border-rose-200">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 text-rose-500 mb-3">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
        </span>
        <p className="text-slate-500 mb-4">Você ainda não tem nenhuma transação.</p>
        <Link
          href="/dashboard/nova-transacao"
          className="inline-flex items-center gap-2 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-400/40 hover:bg-rose-700 transition"
        >
          + Registrar a primeira transação
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <svg
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m21 21-4.3-4.3" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            placeholder="Buscar por descrição..."
            className="w-full border border-rose-100 bg-white pl-9 pr-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-sm text-slate-900"
          />
        </div>

        <select
          value={filtroCategoria}
          onChange={(e) => setFiltroCategoria(e.target.value)}
          className="border border-rose-100 bg-white px-3 py-2.5 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 text-sm text-slate-700"
        >
          <option value="todas">Todas as categorias</option>
        {CATEGORIAS.map((c) => (
        <option key={c.valor} value={c.valor}>
            {c.label}
        </option>
        ))}
        </select>

        <div className="flex gap-1.5 bg-white border border-rose-100 rounded-xl p-1">
          {(['todos', 'receita', 'despesa'] as const).map((op) => (
            <button
              key={op}
              type="button"
              onClick={() => setFiltroTipo(op)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                filtroTipo === op
                  ? 'bg-rose-600 text-white'
                  : 'text-slate-500 hover:bg-rose-50'
              }`}
            >
              {op === 'todos' ? 'Todos' : op === 'receita' ? 'Receitas' : 'Despesas'}
            </button>
          ))}
        </div>
      </div>

      {/* Lista filtrada */}
      <div className="space-y-3">
        {filtradas.length === 0 ? (
          <div className="text-center py-10 bg-white/70 rounded-3xl border border-dashed border-rose-200">
            <p className="text-slate-400 text-sm">Nenhuma transação encontrada com esses filtros.</p>
          </div>
        ) : (
          filtradas.map((t) => <CardTransacao key={t.id} data={t} />)
        )}
      </div>
    </div>
  );
}