
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

export default function NouvelleDemande() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentStep, setCurrentStep] = useState(1)
  const router = useRouter()
  const [addressSuggestions, setAddressSuggestions] = useState([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [addressSearch, setAddressSearch] = useState('')

  // État du formulaire
  const [formData, setFormData] = useState({
    // Coordonnées client
    nomClient: '',
    prenomClient: '',
    entrepriseClient: '',
    emailClient: '',
    telephoneClient: '',

     // Adresse décomposée
    rechercheAdresse: '',
    numeroRue: '',
    nomRue: '',
    codePostal: '',
    ville: '',
    adresseComplete: '',
    
    // Infos projet (on ajoutera après)
    nomProjet: '',
    dateEcheance: '',
    budget: '',
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/me')
      if (response.ok) {
        const userData = await response.json()
        
        // Vérifier que l'utilisateur a le bon rôle
        if (userData.role !== 'commercial' && userData.role !== 'admin') {
          router.push('/dashboard')
          return
        }
        
        setUser(userData)
      } else {
        router.push('/login')
      }
    } catch (error) {
      router.push('/login')
    } finally {
      setLoading(false)
    }
  }

  const searchAddress = async (query) => {
  if (query.length < 3) {
    setAddressSuggestions([])
    setShowSuggestions(false)
    return
  }

  try {
    const response = await fetch(`https://api-adresse.data.gouv.fr/search/?q=${encodeURIComponent(query)}&limit=5`)
    const data = await response.json()
    
    setAddressSuggestions(data.features || [])
    setShowSuggestions(true)
  } catch (error) {
    console.error('Erreur recherche adresse:', error)
    setAddressSuggestions([])
  }
}

    const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
        ...prev,
        [name]: value
    }))

    // Recherche d'adresse en temps réel
    if (name === 'rechercheAdresse') {
        setAddressSearch(value)
        searchAddress(value)
    }
    }

    // Fonction pour sélectionner une adresse
const selectAddress = (address) => {
  const properties = address.properties
  
  setFormData(prev => ({
    ...prev,
    numeroRue: properties.housenumber || '',
    nomRue: properties.street || '',
    codePostal: properties.postcode || '',
    ville: properties.city || '',
    adresseComplete: properties.label || ''
  }))
  
  setAddressSearch(properties.label || '')
  setShowSuggestions(false)
}

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Données formulaire:', formData)
    // On ajoutera la sauvegarde après
    alert('Coordonnées client enregistrées ! (Développement en cours)')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p>Chargement...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div>
      <Head>
        <title>Nouvelle Demande - Gestion LED</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center py-4">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => router.push('/dashboard')}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ← Retour Dashboard
                </button>
                <h1 className="text-2xl font-bold text-gray-900">
                  📝 Nouvelle Demande Client
                </h1>
              </div>
              <div className="flex items-center space-x-4">
                <span className="text-gray-700">
                  {user?.prenom} {user?.nom} ({user?.role})
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* Progress Bar */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-4">
              <div className="flex items-center">
                <div className="flex items-center text-sm">
                  <span className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-full">
                    1. Coordonnées Client
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-full">
                    2. Spécifications
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-full">
                    3. Calculs Auto
                  </span>
                  <span className="mx-2 text-gray-400">→</span>
                  <span className="flex items-center px-4 py-2 bg-gray-200 text-gray-600 rounded-full">
                    4. Validation
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="bg-white shadow rounded-lg">
            <div className="px-6 py-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                📞 Informations Client
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Nom du projet */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <h3 className="text-sm font-medium text-blue-800 mb-2">
                        📋 Nom du projet (généré automatiquement)
                        </h3>
                        {formData.entrepriseClient ? (
                        <p className="text-blue-700 font-medium">
                            Aperçu : <strong>{formData.entrepriseClient.toUpperCase().replace(/\s+/g, '-')}-{new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')}-001</strong>
                        </p>
                        ) : (
                        <p className="text-blue-600 text-sm">
                            Le nom sera créé automatiquement après saisie du nom de l'entreprise
                        </p>
                        )}
                        <p className="text-blue-600 text-xs mt-1">
                        Format : Nom Entreprise-Date-#ID (incrémental)
                        </p>
                    </div>
                {/* Informations client - Grid 2 colonnes */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nom du client *
                    </label>
                    <input
                      type="text"
                      name="nomClient"
                      required
                      value={formData.nomClient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Dupont"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Prénom du client *
                    </label>
                    <input
                      type="text"
                      name="prenomClient"
                      required
                      value={formData.prenomClient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Jean"
                    />
                  </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Entreprise *
                    </label>
                    <input
                        type="text"
                        name="entrepriseClient"
                        required
                        value={formData.entrepriseClient}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="SARL Dupont, SAS TechLED, etc."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Ce nom sera utilisé pour générer l'identifiant du projet
                    </p>
                    </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="emailClient"
                      required
                      value={formData.emailClient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="client@exemple.fr"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Téléphone *
                    </label>
                    <input
                      type="tel"
                      name="telephoneClient"
                      required
                      value={formData.telephoneClient}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="06 12 34 56 78"
                    />
                  </div>
                </div>

                {/* Adresse avec autocomplétion */}
<div className="border-t pt-6">
  <h3 className="text-lg font-medium text-gray-900 mb-4">
    📍 Adresse Client
  </h3>
  
  {/* Recherche d'adresse */}
  <div className="relative mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-2">
      Recherche d'adresse *
    </label>
    <input
      type="text"
      name="rechercheAdresse"
      required
      value={addressSearch}
      onChange={handleInputChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      placeholder="Tapez votre adresse (ex: 19 allée du gros chêne)"
    />
    
    {/* Suggestions */}
    {showSuggestions && addressSuggestions.length > 0 && (
      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
        {addressSuggestions.map((suggestion, index) => (
          <button
            key={index}
            type="button"
            onClick={() => selectAddress(suggestion)}
            className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
          >
            <div className="font-medium">{suggestion.properties.label}</div>
            <div className="text-sm text-gray-500">
              {suggestion.properties.context}
            </div>
          </button>
        ))}
      </div>
    )}
  </div>

  {/* Adresse décomposée (en lecture seule après sélection) */}
  {formData.adresseComplete && (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-50 p-4 rounded-lg">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Numéro
        </label>
        <input
          type="text"
          value={formData.numeroRue}
          readOnly
          className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded"
        />
      </div>
      
      <div className="md:col-span-2">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Rue
        </label>
        <input
          type="text"
          value={formData.nomRue}
          readOnly
          className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded"
        />
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Code Postal
        </label>
        <input
          type="text"
          value={formData.codePostal}
          readOnly
          className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded"
        />
      </div>
      
      <div className="md:col-span-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Ville
        </label>
        <input
          type="text"
          value={formData.ville}
          readOnly
          className="w-full px-2 py-1 text-sm bg-white border border-gray-200 rounded"
        />
      </div>
    </div>
  )}
</div>

                {/* Infos projet */}
                <div className="border-t pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    📅 Informations Projet
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Date d'échéance souhaitée
                      </label>
                      <input
                        type="date"
                        name="dateEcheance"
                        value={formData.dateEcheance}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Budget approximatif (€)
                      </label>
                      <input
                        type="number"
                        name="budget"
                        value={formData.budget}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="50000"
                      />
                    </div>
                  </div>
                </div>

                {/* Boutons */}
                <div className="flex justify-between pt-6 border-t">
                  <button
                    type="button"
                    onClick={() => router.push('/dashboard')}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50"
                  >
                    Annuler
                  </button>
                  
                  <button
                    type="submit"
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Continuer → Spécifications
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}