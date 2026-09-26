'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { CATEGORIAS } from '@/lib/categorias';

const valoresValidos = CATEGORIAS.map((c) => c.valor);

export async function criarTransacao(formData: FormData) {
  const descricao = (formData.get('descricao') as string).trim();
  const valor = parseFloat(formData.get('valor') as string);
  const tipo = formData.get('tipo') as string;
  const categoria = formData.get('categoria') as string;

  if (!descricao || isNaN(valor) || valor <= 0) {
    throw new Error('Dados inválidos.');
  }
  if (tipo !== 'receita' && tipo !== 'despesa') {
    throw new Error('Tipo inválido.');
  }
  if (!valoresValidos.includes(categoria as any)) {
    throw new Error('Categoria inválida.');
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('transacoes')
    .insert({ descricao, valor, tipo, categoria });

  if (error) {
    throw new Error('Falha ao salvar no banco de dados.');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard?sucesso=criada');
}

export async function atualizarTransacao(id: string, formData: FormData) {
  const descricao = (formData.get('descricao') as string).trim();
  const valor = parseFloat(formData.get('valor') as string);
  const tipo = formData.get('tipo') as string;
  const categoria = formData.get('categoria') as string;

  if (!descricao || isNaN(valor) || valor <= 0) {
    throw new Error('Dados inválidos.');
  }
  if (tipo !== 'receita' && tipo !== 'despesa') {
    throw new Error('Tipo inválido.');
  }
  if (!valoresValidos.includes(categoria as any)) {
    throw new Error('Categoria inválida.');
  }

  const supabase = await createClient();

  const { error } = await supabase
    .from('transacoes')
    .update({ descricao, valor, tipo, categoria })
    .eq('id', id);

  if (error) {
    throw new Error('Falha ao atualizar transação.');
  }

  revalidatePath('/dashboard');
  redirect('/dashboard?sucesso=editada');
}

export async function excluirTransacao(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from('transacoes')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error('Falha ao excluir transação.');
  }

  revalidatePath('/dashboard');
}