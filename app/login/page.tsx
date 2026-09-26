import { Playfair_Display, Lora } from 'next/font/google';
import { login } from './actions';
import { PasswordInput } from './components/PasswordInput';

const playfair = Playfair_Display({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['700'],
});

const lora = Lora({
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
});

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erro?: string }>;
}) {
  const { erro } = await searchParams;

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-rose-50 via-pink-50 to-rose-100 flex items-center justify-center p-4 sm:p-8">
      {/* Formas decorativas de fundo */}
      <div className="absolute -top-10 -left-10 w-72 h-72 bg-rose-200/50 rounded-[40%_60%_60%_40%/40%_40%_60%_60%] blur-sm" />
      <div className="absolute -bottom-16 -right-16 w-80 h-80 bg-pink-200/50 rounded-[60%_40%_40%_60%/60%_60%_40%_40%] blur-sm" />

      <div className="relative w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-10 md:gap-16">
        {/* Lado esquerdo */}
        <div className="flex-1 text-center md:text-left">
          <div className="relative inline-block">
            {/* Spark decorativo */}
            <svg className="absolute -left-8 -top-4 w-8 h-8 text-rose-300" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l1.2 6.8L20 10l-6.8 1.2L12 18l-1.2-6.8L4 10l6.8-1.2L12 2z" />
            </svg>

            <h1 className={`${playfair.className} text-[5.5rem] sm:text-[7rem] leading-[0.95] text-rose-600`}>
              Finance
              <br />
              Wallet
            </h1>

            {/* Ilustração da carteira com moedas */}
            <svg
              className="absolute -right-24 sm:-right-32 top-1/2 -translate-y-1/2 w-28 h-28 sm:w-36 sm:h-36 hidden md:block"
              viewBox="0 0 100 100"
              fill="none"
            >
              <circle cx="82" cy="22" r="13" fill="#fda4af" />
              <text x="82" y="27" textAnchor="middle" fontSize="14" fill="white" fontWeight="bold">$</text>
              <circle cx="64" cy="12" r="10" fill="#fecdd3" />
              <text x="64" y="16" textAnchor="middle" fontSize="11" fill="#e11d48" fontWeight="bold">$</text>
              <rect x="18" y="32" width="66" height="50" rx="10" fill="url(#walletShine)" />
              <rect x="18" y="45" width="66" height="4" fill="white" opacity="0.25" />
              <circle cx="76" cy="67" r="6" fill="white" />
              <defs>
                <linearGradient id="walletShine" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fb7185" />
                  <stop offset="100%" stopColor="#be123c" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          <p className={`${lora.className} text-rose-900/70 text-lg sm:text-xl mt-6 max-w-sm mx-auto md:mx-0`}>
            Controle suas finanças com clareza, um lançamento de cada vez.
          </p>

          {/* Selos de benefícios */}
          <div className="flex justify-center md:justify-start gap-8 sm:gap-10 mt-10">
            {[
              { label: 'Mais controle', icon: 'shield' },
              { label: 'Mais organização', icon: 'chart' },
              { label: 'Mais tranquilidade', icon: 'heart' },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center gap-2.5 max-w-[110px]">
                <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-100 text-rose-500">
                  {item.icon === 'shield' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2 4 5v6c0 5 3.5 9 8 11 4.5-2 8-6 8-11V5l-8-3Z" />
                    </svg>
                  )}
                  {item.icon === 'chart' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M5 20V10M12 20V4M19 20v-7" strokeLinecap="round" />
                    </svg>
                  )}
                  {item.icon === 'heart' && (
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" stroke="none">
                      <path d="M12 21s-8-4.5-8-11a5 5 0 0 1 8-4 5 5 0 0 1 8 4c0 6.5-8 11-8 11z" />
                    </svg>
                  )}
                </span>
                <span className={`${lora.className} text-sm text-rose-900/70 text-center leading-tight`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Lado direito: card de login */}
        <div className="w-full max-w-sm">
          <div className="relative overflow-hidden bg-white/90 backdrop-blur p-8 rounded-3xl shadow-xl shadow-rose-200/50 border border-rose-100">
            <div className="relative flex items-center gap-3 mb-6">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-rose-100 text-rose-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 21c0-4 3.5-7 8-7s8 3 8 7" strokeLinecap="round" />
                </svg>
              </span>
              <div>
                <h2 className="text-lg font-semibold text-slate-800">Acesse sua conta</h2>
                <p className="text-xs text-slate-400">Entre com seu e-mail e senha cadastrados</p>
              </div>
            </div>

            <form action={login} className="relative flex flex-col space-y-4">
              {erro && (
                <p className="bg-rose-50 text-rose-600 text-sm text-center rounded-lg py-2 px-3 border border-rose-100">
                  E-mail ou senha incorretos.
                </p>
              )}

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="3" y="5" width="18" height="14" rx="2" />
                    <path d="m3 7 9 6 9-6" />
                  </svg>
                  E-mail
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Digite seu email"
                  required
                  className="w-full border border-slate-200 p-3 rounded-xl outline-none focus:ring-2 focus:ring-rose-400 focus:border-transparent transition text-slate-900"
                />
              </div>

              <div>
                <label className="flex items-center gap-1.5 text-xs font-medium text-slate-500 mb-1">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="4" y="10" width="16" height="10" rx="2" />
                    <path d="M8 10V7a4 4 0 0 1 8 0v3" />
                  </svg>
                  Senha
                </label>
                <PasswordInput />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 bg-rose-600 text-white font-semibold p-3 rounded-xl hover:bg-rose-700 transition shadow-lg shadow-rose-400/40"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                Entrar
              </button>
            </form>

            <div className="relative flex items-center gap-3 mt-6">
              <span className="flex-1 h-px bg-rose-100" />
              <span className="text-xs text-slate-400 whitespace-nowrap">Acesso restrito a usuários cadastrados.</span>
              <span className="flex-1 h-px bg-rose-100" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}