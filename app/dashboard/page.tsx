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
    <main className="p-4 sm:p-8 max-w-4xl mx-auto">
      <header className="flex flex-wrap gap-3 justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Minha Carteira</h1>
        <div className="flex gap-2">
          <Link
            href="/dashboard/nova-transacao"
            className="bg-blue-600 text-white px-3 py-2 rounded"
          >
            + Nova Transação
          </Link>
          <form action={logout}>
            <button className="border px-3 py-2 rounded text-gray-700">Sair</button>
          </form>
        </div>
      </header>

      <section className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="bg-gray-100 p-6 rounded-lg">
          <h2 className="text-gray-600">Saldo Atual</h2>
          <p className={`text-3xl font-bold ${saldo >= 0 ? 'text-green-600' : 'text-red-600'}`}>
            {moeda(saldo)}
          </p>
        </div>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-gray-600">Receitas</h2>
          <p className="text-3xl font-bold text-green-600">{moeda(receitas)}</p>
        </div>
        <div className="bg-red-50 p-6 rounded-lg">
          <h2 className="text-gray-600">Despesas</h2>
          <p className="text-3xl font-bold text-red-600">{moeda(despesas)}</p>
        </div>
      </section>

      <h2 className="text-xl font-semibold mb-3 text-gray-900">Histórico</h2>
      <div className="space-y-3">
        {transacoes.length === 0 && (
          <p className="text-gray-500">Nenhuma transação ainda.</p>
        )}
        {transacoes.map((t) => (
          <CardTransacao key={t.id} data={t} />
        ))}
      </div>
    </main>
  );
}