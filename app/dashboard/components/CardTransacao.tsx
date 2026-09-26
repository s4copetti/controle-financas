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
  const dataFormatada = new Date(data.criado_em).toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: 'short',
  });

  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-white shadow-sm hover:shadow-md transition-shadow border border-rose-50">
      <div className="flex items-center gap-4">
        <span
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-bold ${
            isReceita
              ? 'bg-gradient-to-br from-emerald-400 to-emerald-600 text-white'
              : 'bg-gradient-to-br from-rose-400 to-rose-600 text-white'
          }`}
        >
          {isReceita ? '↑' : '↓'}
        </span>
        <div>
          <p className="font-semibold text-slate-800">{data.descricao}</p>
          <p className="text-xs text-slate-400 capitalize">{dataFormatada}</p>
        </div>
      </div>
      <span className={`font-bold ${isReceita ? 'text-emerald-600' : 'text-rose-600'}`}>
        {isReceita ? '+ ' : '- '}{valor}
      </span>
    </div>
  );
}