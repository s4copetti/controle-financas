export const CATEGORIAS = [
  { valor: 'alimentacao', label: 'Alimentação' },
  { valor: 'transporte', label: 'Transporte' },
  { valor: 'moradia', label: 'Moradia' },
  { valor: 'saude', label: 'Saúde' },
  { valor: 'lazer', label: 'Lazer' },
  { valor: 'compras', label: 'Compras' },
  { valor: 'salario', label: 'Salário' },
  { valor: 'investimentos', label: 'Investimentos' },
  { valor: 'outros', label: 'Outros' },
] as const;

export function categoriaInfo(valor: string) {
  return CATEGORIAS.find((c) => c.valor === valor) ?? CATEGORIAS[CATEGORIAS.length - 1];
}