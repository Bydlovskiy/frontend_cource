<template>
  <div v-loading="loading" class="w-full h-full flex flex-col items-center justify-center px-20">
    <p class="text-2xl font-bold mb-2">Forgot Password</p>

    <el-form class="w-full" :model="model" @submit.prevent="onSubmit">
      <el-form-item v-if="emailSended">
        <el-input v-model="model.confirmationCode" placeholder="Confirmation Code" />
      </el-form-item>

      <template v-else>
        <el-form-item>
          <el-input v-model="model.email" placeholder="Email" />
        </el-form-item>

        <el-form-item>
          <el-input v-model="model.password" placeholder="Password" />
        </el-form-item>

        <el-form-item>
          <el-input v-model="model.confirmPassword" placeholder="Confirm Password" />
        </el-form-item>
      </template>

      <el-button type="primary" class="w-full mb-4" native-type="submit">Submit</el-button>

      <el-button
        class="w-full !m-0"
        @click="router.push({ name: $routeNames.login })"
      >
        or Login
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const { $routeNames } = useGlobalProperties()
const { handelResetPassword, handleConfirmResetPassword } = useAuthStore()

const loading = ref(false)

const model = ref({
  email: '',
  password: '',
  confirmPassword: '',
  confirmationCode: ''
})

const emailSended = ref(false)

async function onSubmit () {
  try {
    loading.value = true
    if (emailSended.value) {
      await handleConfirmResetPassword({
        confirmationCode: model.value.confirmationCode,
        newPassword: model.value.password,
        username: model.value.email
      })

      router.push({ name: $routeNames.login })
    } else {
      await handelResetPassword(model.value.email)
      emailSended.value = true
    }
  } finally {
    loading.value = false
  }
}
</script>
