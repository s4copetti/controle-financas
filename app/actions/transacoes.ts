'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';

export async function criarTransacao(formData: FormData) {
  const descricao = (formData.get('descricao') as string).trim();
  const valor = parseFloat(formData.get('valor') as string);
  const tipo = formData.get('tipo') as string;

  if (!descricao || isNaN(valor) || valor <= 0) {
    throw new Error('Dados inválidos.');
  }
  if (tipo !== 'receita' && tipo !== 'despesa') {
    throw new Error('Tipo inválido.');
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('transacoes')
    .insert({ descricao, valor, tipo });

  if (error) {
    throw new Error('Falha ao salvar no banco de dados.');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard');
}