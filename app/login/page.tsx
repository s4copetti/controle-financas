import { login } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-pink-600 mb-3 shadow-lg shadow-rose-300/50">
            <svg
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M21 12V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5" />
              <path d="M17 12a2 2 0 0 0 0 4h4v-4Z" />
              <path d="M3 9h18" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-slate-800">FinanceWallet</h1>
          <p className="text-slate-500 text-sm mt-1">Controle suas finanças com clareza!</p>
        </div>

        <form
          action={login}
          className="bg-white p-8 rounded-3xl shadow-xl shadow-rose-200/40 border border-rose-100 flex flex-col space-y-4"
        >
          {erro && (
            <p className="bg-rose-50 text-rose-600 text-sm text-center rounded-lg py-2 px-3 border border-rose-100">
              E-mail ou senha incorretos.
            </p>
          )}

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">E-mail</label>
            <input
              type="email"
              name="email"
              placeholder="Digite seu email aqui"
              required
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
            />
          </div>

          <div>
            <label className="text-xs font-medium text-slate-500 mb-1 block">Senha</label>
            <input
              type="password"
              name="password"
              placeholder="Digite sua senha"
              required
              className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
            />
          </div>

          <button
            type="submit"
            className="bg-gradient-to-r from-rose-600 to-pink-600 text-white font-semibold p-3 rounded-xl hover:opacity-90 transition shadow-lg shadow-rose-400/40"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-slate-400 mt-6">
          Acesso restrito a usuários cadastrados.
        </p>
      </div>
    </main>
  );
}