import Link from 'next/link';
import { criarTransacao } from '@/app/actions/transacoes';

export default function NovaTransacaoPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/dashboard" className="text-rose-700 hover:text-rose-900 text-sm mb-4 inline-flex items-center gap-1">
          ← Voltar ao dashboard
        </Link>

        <form
          action={criarTransacao}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-rose-200/40 border border-rose-100 flex flex-col space-y-4 mt-3"
        >
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Nova transação</h1>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Descrição</label>
            <input
              type="text"
              name="descricao"
              placeholder="Digite a descrição aqui"
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
              placeholder="Digite o valor aqui"
              required
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-2 block">Tipo</label>
            <div className="grid grid-cols-2 gap-3">
              <label className="relative cursor-pointer">
                <input type="radio" name="tipo" value="receita" className="peer sr-only" />
                <div className="text-center p-3 rounded-xl border-2 border-slate-200 peer-checked:border-emerald-500 peer-checked:bg-emerald-50 transition font-medium text-slate-600 peer-checked:text-emerald-700">
                  ↑ Receita
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input type="radio" name="tipo" value="despesa" defaultChecked className="peer sr-only" />
                <div className="text-center p-3 rounded-xl border-2 border-slate-200 peer-checked:border-rose-500 peer-checked:bg-rose-50 transition font-medium text-slate-600 peer-checked:text-rose-700">
                  ↓ Despesa
                </div>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold p-3 rounded-xl hover:opacity-90 transition shadow-lg shadow-rose-400/40 mt-2"
          >
            Salvar
          </button>
        </form>
      </div>
    </main>
  );
}