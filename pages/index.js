import Head from 'next/head'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Gestion LED - ERP Écrans LED</title>
        <meta name="description" content="Système intelligent de gestion des demandes d'écrans LED" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto py-12 px-4">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              🟢 Gestion LED - ERP Intelligent
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Développement en cours...
            </p>
            
            <div className="bg-white shadow rounded-lg p-6 max-w-2xl mx-auto">
              <h2 className="text-2xl font-semibold mb-4">✅ Configuration terminée !</h2>
              <div className="space-y-3 text-left">
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Next.js configuré</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Tailwind CSS activé</span>
                </div>
                <div className="flex items-center">
                  <span className="text-green-500 mr-2">✅</span>
                  <span>Structure de base créée</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}