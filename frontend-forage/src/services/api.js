import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api', // À adapter avec l'URL de votre backend
  timeout: 10000,
})

// Intercepteur pour gérer les erreurs
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error('Erreur API:', error.response.status, error.response.data)
    } else {
      console.error('Erreur API:', error.message)
    }
    return Promise.reject(error)
  }
)

export default api