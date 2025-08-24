import { Amplify } from 'aws-amplify'
import type { Plugin } from 'vue'

const amplifyConfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID,
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID
    }
  }
}

const AmplifyPlugin: Plugin = {
  install: () => {
    Amplify.configure(amplifyConfig)
  }
}

export { AmplifyPlugin }
