import { categoriaInfo } from '@/lib/categorias';

type Transacao = {
  tipo: string;
  categoria: string;
  valor: number;
};

const moeda = (n: number) =>
  n.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

const CORES = ['#e11d48', '#fb7185', '#f472b6', '#c026d3', '#fda4af', '#f43f5e', '#be185d', '#fbcfe8', '#9f1239'];

export function GraficoDespesas({ transacoes }: { transacoes: Transacao[] }) {
  const porCategoria = new Map<string, number>();

  transacoes
    .filter((t) => t.tipo === 'despesa')
    .forEach((t) => {
      const atual = porCategoria.get(t.categoria) ?? 0;
      porCategoria.set(t.categoria, atual + Number(t.valor));
    });

  const dados = Array.from(porCategoria.entries())
    .map(([categoria, total], i) => ({
      ...categoriaInfo(categoria),
      total,
      cor: CORES[i % CORES.length],
    }))
    .sort((a, b) => b.total - a.total);

  if (dados.length === 0) return null;

  const totalGeral = dados.reduce((acc, d) => acc + d.total, 0);

  // Monta as fatias do donut: cada uma é um círculo com stroke-dasharray
  const raio = 60;
  const circunferencia = 2 * Math.PI * raio;
  let acumulado = 0;

  const fatias = dados.map((d) => {
    const proporcao = d.total / totalGeral;
    const comprimento = proporcao * circunferencia;
    const offset = circunferencia - acumulado;
    acumulado += comprimento;
    return { ...d, proporcao, comprimento, offset };
  });

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-rose-100 p-6 mb-10">
      <h3 className="text-sm font-semibold text-slate-700 mb-5">Despesas por categoria</h3>

      <div className="flex flex-col sm:flex-row items-center gap-8">
        {/* Gráfico donut */}
        <svg width="160" height="160" viewBox="0 0 160 160" className="shrink-0 -rotate-90">
          <circle cx="80" cy="80" r={raio} fill="none" stroke="#fff1f2" strokeWidth="20" />
          {fatias.map((f) => (
            <circle
              key={f.valor}
              cx="80"
              cy="80"
              r={raio}
              fill="none"
              stroke={f.cor}
              strokeWidth="20"
              strokeDasharray={`${f.comprimento} ${circunferencia - f.comprimento}`}
              strokeDashoffset={f.offset}
              strokeLinecap={fatias.length === 1 ? 'butt' : 'round'}
            />
          ))}
        </svg>

        {/* Legenda */}
        <div className="w-full space-y-2.5">
          {fatias.map((f) => (
            <div key={f.valor} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <span
                  className="h-2.5 w-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: f.cor }}
                />
                <span className="text-slate-600 truncate">{f.label}</span>
                <span className="text-slate-400 text-xs shrink-0">
                  {(f.proporcao * 100).toFixed(0)}%
                </span>
              </div>
              <span className="text-slate-700 font-medium shrink-0 ml-3">{moeda(f.total)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}