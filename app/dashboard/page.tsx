import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { logout } from '@/app/login/actions';
import { CardTransacao } from './components/CardTransacao';

const moeda = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default async function DashboardPage() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('transacoes')
    .select('*')
    .order('criado_em', { ascending: false });

  if (error) {
    throw new Error('Falha ao carregar transações.');
  }

  const transacoes = data ?? [];

  const receitas = transacoes
    .filter((t) => t.tipo === 'receita')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const despesas = transacoes
    .filter((t) => t.tipo === 'despesa')
    .reduce((acc, t) => acc + Number(t.valor), 0);

  const saldo = receitas - despesas;

  return (
    <div className="min-h-screen bg-rose-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-rose-600 to-pink-600 pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 pt-8 flex flex-wrap gap-3 justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/15">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
                <path d="M17 12a2 2 0 0 0 0 4h4v-4Z" />
                <path d="M3 9h18" />
              </svg>
            </span>
            <h1 className="text-2xl font-bold text-white">FinanceWallet</h1>
          </div>
          <form action={logout}>
            <button className="bg-white/15 hover:bg-white/25 backdrop-blur text-white text-sm px-4 py-2 rounded-xl transition">
              Sair
            </button>
          </form>
        </div>
      </header>

      {/* Cards flutuando sobre o header */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 -mt-14 pb-12">
        <section className="grid gap-4 sm:grid-cols-3 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg shadow-rose-200/40 border border-rose-50">
            <p className="text-slate-400 text-sm font-medium mb-1">Saldo Atual</p>
            <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-rose-600' : 'text-red-600'}`}>
              {moeda(saldo)}
            </p>
          </div>
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 p-6 rounded-2xl shadow-lg shadow-emerald-200 text-white">
            <p className="text-emerald-100 text-sm font-medium mb-1">Receitas</p>
            <p className="text-3xl font-bold">{moeda(receitas)}</p>
          </div>
          <div className="bg-gradient-to-br from-rose-500 to-rose-600 p-6 rounded-2xl shadow-lg shadow-rose-200 text-white">
            <p className="text-rose-100 text-sm font-medium mb-1">Despesas</p>
            <p className="text-3xl font-bold">{moeda(despesas)}</p>
          </div>
        </section>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold text-slate-800">Histórico</h2>
          <Link
            href="/dashboard/nova-transacao"
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-lg shadow-rose-400/30 hover:opacity-90 transition"
          >
            + Nova Transação
          </Link>
        </div>

        <div className="space-y-3">
          {transacoes.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-rose-200">
              <p className="text-slate-400">Nenhuma transação ainda.</p>
            </div>
          )}
          {transacoes.map((t) => (
            <CardTransacao key={t.id} data={t} />
          ))}
        </div>
      </main>
    </div>
  );
}