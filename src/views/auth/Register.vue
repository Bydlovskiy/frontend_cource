<template>
  <div v-loading="loading" class="w-full h-full flex flex-col items-center justify-center px-20">
    <p class="text-2xl font-bold mb-2">Login</p>
    <el-form class="w-full" :model="model" @submit.prevent="onSubmit">
      <el-form-item>
        <el-input v-model="model.firstName" placeholder="First name" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="model.lastName" placeholder="Last name" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="model.email" placeholder="Email" />
      </el-form-item>

      <el-form-item>
        <el-input v-model="model.password" placeholder="Password" />
      </el-form-item>

      <el-button type="primary" class="w-full mb-4" native-type="submit">Register</el-button>

      <el-button
        class="w-full !m-0"
        @click="router.push({ name: $routeNames.login })"
      >
        Already have an account?
      </el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const { $routeNames } = useGlobalProperties()
const { handleSignUp } = useAuthStore()

const router = useRouter()

const loading = ref(false)

const model = ref({
  firstName: '',
  lastName: '',
  email: '',
  password: ''
})

async function onSubmit () {
  try {
    loading.value = true
    await handleSignUp(model.value)
    router.push({ name: $routeNames.posts })
  } finally {
    loading.value = false
  }
}
</script>
