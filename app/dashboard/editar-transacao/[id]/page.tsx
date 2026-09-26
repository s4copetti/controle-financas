import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Playfair_Display } from 'next/font/google';
import { createClient } from '@/lib/supabase/server';
import { atualizarTransacao } from '@/app/actions/transacoes';
import { CATEGORIAS } from '@/lib/categorias';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['700'],
});

export default async function EditarTransacaoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: transacao } = await supabase
    .from('transacoes')
    .select('*')
    .eq('id', id)
    .single();

  if (!transacao) {
    notFound();
  }

  const atualizarComId = atualizarTransacao.bind(null, id);

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4 sm:p-8">
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-rose-200/50 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] blur-sm" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-pink-200/50 rounded-[60%_40%_40%_60%/60%_60%_40%_40%] blur-sm" />

      <div className="relative w-full max-w-md">
        <Link
          href="/dashboard"
          className="flex items-center gap-1.5 text-rose-600 hover:text-rose-700 text-sm font-medium mb-4 w-fit"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          Voltar ao dashboard
        </Link>

        <div className="bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl shadow-rose-200/50 border border-rose-100">
          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                <path d="M18.5 2.5a2.12 2.12 0 0 1 3 3L12 15l-4 1 1-4Z" />
              </svg>
            </span>
            <h1 className={`${playfair.className} text-2xl text-rose-600`}>Editar transação</h1>
          </div>

          <form action={atualizarComId} className="flex flex-col space-y-4">
            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Descrição</label>
              <input
                type="text"
                name="descricao"
                defaultValue={transacao.descricao}
                required
                className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Valor</label>
              <input
                type="number"
                name="valor"
                step="0.01"
                min="0.01"
                defaultValue={transacao.valor}
                required
                className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-1 block">Categoria</label>
              <select
                name="categoria"
                defaultValue={transacao.categoria ?? 'outros'}
                className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900 bg-white"
              >
                {CATEGORIAS.map((c) => (
                    <option key={c.valor} value={c.valor}>
                        {c.label}
                    </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-slate-500 mb-2 block">Tipo</label>
              <div className="grid grid-cols-2 gap-3">
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="receita"
                    defaultChecked={transacao.tipo === 'receita'}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-slate-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition font-medium text-slate-600 peer-checked:text-emerald-700">
                    ↑ Receita
                  </div>
                </label>
                <label className="relative cursor-pointer">
                  <input
                    type="radio"
                    name="tipo"
                    value="despesa"
                    defaultChecked={transacao.tipo === 'despesa'}
                    className="peer sr-only"
                  />
                  <div className="flex items-center justify-center gap-1.5 p-3 rounded-xl border-2 border-slate-200 peer-checked:border-rose-500 peer-checked:bg-rose-50 transition font-medium text-slate-600 peer-checked:text-rose-700">
                    ↓ Despesa
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="bg-rose-600 text-white font-semibold p-3 rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-400/40 mt-2"
            >
              Salvar alterações
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}