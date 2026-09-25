"use client";

type Transacao = {
  id: string;
  descricao: string;
  valor: number;
  tipo: string;
  criado_em: string;
};

export function CardTransacao({ data }: { data: Transacao }) {
  const isReceita = data.tipo === 'receita';
  const valor = Number(data.valor).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
  const dataFormatada = new Date(data.criado_em).toLocaleDateString('pt-BR');

  return (
    <div className="flex items-center justify-between p-4 border rounded-md bg-white shadow-sm">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-full font-bold ${
            isReceita ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}
        >
          {isReceita ? '↑' : '↓'}
        </span>
        <div>
          <p className="font-medium text-gray-900">{data.descricao}</p>
          <p className="text-xs text-gray-500">{dataFormatada}</p>
        </div>
      </div>
      <span className={`font-bold ${isReceita ? 'text-green-600' : 'text-red-600'}`}>
        {isReceita ? '+' : '-'} {valor}
      </span>
    </div>
  );
}