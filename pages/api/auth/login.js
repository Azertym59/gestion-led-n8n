import { useState } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        // Redirection après login réussi
        router.push('/dashboard')
      } else {
        setError(data.message || 'Erreur de connexion')
      }
    } catch (err) {
      setError('Erreur de connexion')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Head>
        <title>Connexion - Gestion LED TecaLED</title>
        <meta name="description" content="Connectez-vous à votre ERP TecaLED pour gérer vos projets d'écrans LED" />
      </Head>

      <div className="min-h-screen bg-tech flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        {/* Background effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse-slow" style={{animationDelay: '2s'}}></div>
        </div>

        {/* Header avec logo */}
        <div className="sm:mx-auto sm:w-full sm:max-w-md mb-8">
          <div className="flex justify-center mb-6">
            <img 
              src="https://www.tecaled.fr/Logos/Logo%20rectangle%20V2.png"
              alt="TecaLED Logo"
              className="h-16 w-auto object-contain drop-shadow-lg animate-slideInUp"
            />
          </div>
          <h1 className="text-center text-4xl font-bold text-white mb-2 animate-slideInUp" style={{animationDelay: '0.2s'}}>
            Connexion
          </h1>
          <h2 className="text-center text-xl text-white/80 animate-slideInUp" style={{animationDelay: '0.4s'}}>
            Accédez à votre ERP intelligent
          </h2>
        </div>

        {/* Formulaire de connexion */}
        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md animate-slideInUp" style={{animationDelay: '0.6s'}}>
          <div className="card-tech group">
            <div className="py-8 px-6 sm:px-10">
              <form onSubmit={handleLogin} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-tech"
                    placeholder="votre@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Mot de passe
                  </label>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="input-tech"
                    placeholder="••••••••"
                  />
                </div>

                {error && (
                  <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center">
                      <span className="text-red-400 mr-2">⚠️</span>
                      <span className="text-red-300 text-sm font-medium">{error}</span>
                    </div>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {loading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin mr-3"></div>
                      Connexion...
                    </div>
                  ) : (
                    'Se connecter'
                  )}
                </button>
              </form>

              {/* Comptes de test */}
              <div className="mt-8 pt-6 border-t border-gray-200/20">
                <h3 className="text-center text-sm font-semibold text-gray-700 mb-4">
                  Comptes de démonstration
                </h3>
                <div className="space-y-3">
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/90">Admin</p>
                        <p className="text-xs text-white/60">Accès complet</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/70">admin@tecaled.fr</p>
                        <p className="text-xs text-white/50">password</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/90">Commercial</p>
                        <p className="text-xs text-white/60">Gestion projets</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/70">commercial@tecaled.fr</p>
                        <p className="text-xs text-white/50">password</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-white/90">Fournisseur</p>
                        <p className="text-xs text-white/60">Consultation</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-white/70">fournisseur@tecaled.fr</p>
                        <p className="text-xs text-white/50">password</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              © 2025 TecaLED - ERP Intelligent pour écrans LED
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}