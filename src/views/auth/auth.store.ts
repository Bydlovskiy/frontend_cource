import {
  signIn,
  fetchAuthSession
} from 'aws-amplify/auth'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<TResponseMe | null>(null)

  async function handleSignUp ({ firstName, lastName, email, password }:
  { firstName: string; lastName: string; email: string; password: string }) {
    await useApiClient.post('/api/auth/register', { firstName, lastName, email, password })
    await handleSignIn({ email, password })
  }

  async function handleSignIn ({ email, password }: { email: string; password: string }) {
    await signIn({ username: email, password })
    await getUserProfile()
  }

  async function getUserProfile () {
    user.value = await useApiClient.get('/api/me/')
  }

  async function getToken () {
    return fetchAuthSession()
      .then(session => session.tokens?.accessToken.toString())
  }

  return {
    getUserProfile,
    handleSignIn,
    handleSignUp,
    getToken,
    user
  }
})
