import {
  signIn,
  fetchAuthSession,
  resetPassword,
  confirmResetPassword,
  type ConfirmResetPasswordInput
} from 'aws-amplify/auth'

export const useAuthStore = defineStore('authStore', () => {
  const user = ref<TResponseMe | null>(null)

  const role = computed(() => user.value?.role as TRole)

  async function handleSignUp ({ firstName, lastName, email, password }:
  { firstName: string; lastName: string; email: string; password: string }) {
    await useApiClient.post('/api/user/auth/register', { firstName, lastName, email, password })
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

  async function handelResetPassword (email: string) {
    return resetPassword({ username: email })
  }

  async function handleConfirmResetPassword (payload: ConfirmResetPasswordInput) {
    return confirmResetPassword(payload)
  }

  return {
    getUserProfile,
    handleSignIn,
    handleSignUp,
    handelResetPassword,
    handleConfirmResetPassword,
    getToken,
    user,
    role
  }
})
