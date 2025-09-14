<template>
  <div class="w-full h-full flex flex-col items-center justify-center px-20">
    <p class="text-2xl font-bold mb-2">Accept Invite</p>
    <el-form class="w-full" :model="model" @submit.prevent="onSubmit">
      <el-form-item label="First Name" label-position="top" prop="firstName">
        <el-input v-model="model.firstName" />
      </el-form-item>

      <el-form-item label="Last Name" label-position="top" prop="lastName">
        <el-input v-model="model.lastName" />
      </el-form-item>

      <el-form-item label="Password" label-position="top" prop="password">
        <el-input v-model="model.password" />
      </el-form-item>

      <el-button type="primary" class="w-full" native-type="submit">Accept Invite</el-button>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
const { $routeNames } = useGlobalProperties()
const router = useRouter()

const { handleSignIn } = useAuthStore()

const model = ref({
  firstName: '',
  lastName: '',
  password: ''
})

const query = useRoute().query

const onSubmit = async () => {
  await useApiClient.post('/api/user/invite/accept', {
    firstName: model.value.firstName,
    lastName: model.value.lastName,
    password: model.value.password,
    email: query.email as string,
    signature: query.signature as string,
    expireAt: Number(query.expireAt)
  })

  await handleSignIn({
    email: query.email as string,
    password: model.value.password
  })

  router.push({ name: $routeNames.posts })
}
</script>
