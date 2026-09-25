import { login } from './actions';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form
        action={login}
        className="bg-white p-8 rounded-lg shadow w-full max-w-sm flex flex-col space-y-4"
      >
        <h1 className="text-2xl font-bold text-center">FinanceWallet</h1>

        {erro && (
          <p className="text-red-600 text-sm text-center">
            E-mail ou senha incorretos.
          </p>
        )}

        <input
          type="email"
          name="email"
          placeholder="E-mail"
          required
          className="border p-2 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          required
          className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </main>
  );
}