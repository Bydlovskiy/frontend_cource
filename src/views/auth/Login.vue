<template>
  <div v-loading="loading" class="w-full h-full flex flex-col items-center justify-center px-20">
    <p class="text-2xl font-bold mb-2">Login</p>

    <el-form class="w-full" :model="model" @submit.prevent="onSubmit">
      <el-form-item>
        <el-input v-model="model.email" placeholder="Email" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="model.password" placeholder="Password" />
      </el-form-item>

      <el-button type="primary" class="w-full mb-4" native-type="submit">Login</el-button>
      <el-button
        class="w-full !ml-0 mb-4"
        @click="router.push({ name: $routeNames.register })"
      >
        Don't have an account?
      </el-button>

      <el-button
        class="w-full !m-0"
        @click="router.push({ name: $routeNames.forgotPassword })"
      >
        Forgot Password?
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const router = useRouter()

const { $routeNames } = useGlobalProperties()
const { handleSignIn } = useAuthStore()

const loading = ref(false)

const model = ref({
  email: '',
  password: ''
})

async function onSubmit () {
  try {
    loading.value = true
    await handleSignIn(model.value)
    router.push({ name: $routeNames.posts })
  } finally {
    loading.value = false
  }
}
</script>
