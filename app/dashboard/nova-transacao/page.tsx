import Link from 'next/link';
import { criarTransacao } from '@/app/actions/transacoes';

export default function NovaTransacaoPage() {
  return (
    <main className="p-8 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Adicionar transação</h1>

      <form action={criarTransacao} className="flex flex-col space-y-4">
        <input
          type="text"
          name="descricao"
          placeholder="Descrição"
          required
          className="border p-2 rounded"
        />
        <input
          type="number"
          name="valor"
          step="0.01"
          min="0.01"
          placeholder="Valor"
          required
          className="border p-2 rounded"
        />
        <select name="tipo" className="border p-2 rounded">
          <option value="despesa">Despesa</option>
          <option value="receita">Receita</option>
        </select>
        <button type="submit" className="bg-green-600 text-white p-2 rounded">
          Salvar
        </button>
        <Link href="/dashboard" className="text-center text-gray-600 underline">
          Cancelar
        </Link>
      </form>
    </main>
  );
}