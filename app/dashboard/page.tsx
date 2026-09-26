import Link from 'next/link';
import { Playfair_Display, Lora } from 'next/font/google';
import { createClient } from '@/lib/supabase/server';
import { logout } from '@/app/login/actions';
import { HistoricoTransacoes } from './components/HistoricoTransacoes';
import { GraficoDespesas } from './components/GraficoDespesas';
import { SuccessToast } from '@/app/components/SuccessToast';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['700'],
});

const lora = Lora({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
});

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
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-rose-200/50 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] blur-sm" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-pink-200/50 rounded-[60%_40%_40%_60%/60%_60%_40%_40%] blur-sm" />

      <SuccessToast />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-8 py-8 sm:py-10">
        {/* Cabeçalho */}
        <header className="flex flex-wrap gap-4 justify-between items-center mb-10">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="6" width="18" height="13" rx="2.5" />
                <path d="M3 10h18" />
                <circle cx="16.5" cy="14" r="1.4" fill="currentColor" stroke="none" />
              </svg>
            </span>
            <h1 className={`${playfair.className} text-4xl text-rose-600`}>Finance Wallet</h1>
          </div>

          <form action={logout}>
            <button className="flex items-center gap-2 bg-white text-rose-600 border border-rose-200 text-sm font-medium px-4 py-2.5 rounded-xl hover:bg-rose-50 transition shadow-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" strokeLinecap="round" />
                <path d="M16 17l5-5-5-5M21 12H9" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Sair
            </button>
          </form>
        </header>

        {/* Cards de resumo */}
        <section className="grid grid-cols-1 sm:grid-cols-[1.6fr_1fr_1fr] gap-4 mb-10">
          <div className="relative overflow-hidden bg-gradient-to-br from-rose-50 to-pink-100 rounded-3xl shadow-sm border border-rose-100 p-6 flex items-center gap-5">
            <svg className="absolute top-4 right-5 w-5 h-5 text-rose-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.2 6.8L20 10l-6.8 1.2L12 18l-1.2-6.8L4 10l6.8-1.2L12 2z" />
            </svg>
            <span className="relative flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white shadow-inner">
              <span className="absolute inset-0 rounded-full border-4 border-rose-200 border-t-rose-500" />
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#e11d48" strokeWidth="2">
                <rect x="3" y="6" width="18" height="13" rx="2.5" />
                <path d="M3 10h18" />
                <circle cx="16.5" cy="14" r="1.2" fill="#e11d48" stroke="none" />
              </svg>
            </span>
            <div>
              <p className={`${lora.className} text-rose-600 text-base sm:text-lg font-semibold tracking-wide uppercase`}>
                Saldo disponível
              </p>
              <p className="text-3xl sm:text-4xl font-bold text-rose-600 mt-1">{moeda(saldo)}</p>
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-5 flex flex-col gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 19V5M5 12l7-7 7 7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className={`${lora.className} text-slate-500 text-xs`}>Receitas</p>
              <p className="text-2xl font-bold text-emerald-600">{moeda(receitas)}</p>
            </div>
            <span className="w-fit text-xs font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              + {moeda(receitas)}
            </span>
          </div>

          <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-5 flex flex-col gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-500">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M12 5v14M5 12l7 7 7-7" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <div>
              <p className={`${lora.className} text-slate-500 text-xs`}>Despesas</p>
              <p className="text-2xl font-bold text-rose-600">{moeda(despesas)}</p>
            </div>
            <span className="w-fit text-xs font-semibold text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full">
              - {moeda(despesas)}
            </span>
          </div>
        </section>

        {/* Gráfico */}
        <GraficoDespesas transacoes={transacoes} />

        {/* Histórico */}
        <div className="flex justify-between items-center mb-4">
          <h2 className={`${playfair.className} text-2xl text-rose-600`}>Histórico</h2>
          <Link
            href="/dashboard/nova-transacao"
            className="flex items-center gap-2 bg-rose-600 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-rose-400/40 hover:bg-rose-700 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M12 5v14M5 12h14" strokeLinecap="round" />
            </svg>
            Nova Transação
          </Link>
        </div>

        <div className="pb-10">
          <HistoricoTransacoes transacoes={transacoes} />
        </div>
      </div>
    </main>
  );
}