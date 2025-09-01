<template>
  <div class="p-5 space-y-5">
    <el-form :model="model">
      <el-form-item label="Title" label-position="top" prop="title">
        <el-input v-model="model.title" />
      </el-form-item>

      <el-form-item label="Description" label-position="top" prop="description">
        <el-input v-model="model.description" />
      </el-form-item>
    </el-form>

    <el-button @click="handleSave">{{ route.params.id === 'new' ? 'Add Post' : 'Update Post' }}</el-button>

    <div class="flex flex-col gap-2">
      <div v-for="item in model.comments" :key="item.id" class="p-5 border rounded ">
        <div class="flex gap-2">
          <el-input v-model="item.text" />
          <el-button @click="handleSaveComment(item)">Update Comment</el-button>
        </div>
        <p class="mt-2">{{ item.author.firstName }} {{ item.author.lastName }}</p>
        <p>Updated at: {{ Intl.DateTimeFormat('ua-UA').format(new Date(item.updatedAt)) }}</p>
      </div>

      <div v-if="route.params.id !== 'new'" class="p-5 border rounded flex gap-2">
        <el-input v-model="newComment" />
        <el-button @click="handleAddComment">Add Comment</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { paths } from '@/api/types/schema'
import { routeNames } from '@/router/route-names'
const route = useRoute()
const router = useRouter()

const authStore = useAuthStore()

const newComment = ref('')

const model = ref<TPost | any>({
  title: '',
  description: '',
  comments: []
})

async function handleAddComment () {
  const requests: Record<TRole, keyof paths> = {
    admin: '/api/admin/post/{postId}/comment/',
    user: '/api/user/post/{postId}/comment/'
  }

  const response = await useApiClient.post(requests[authStore.role],
    { text: newComment.value },
    { dynamicKeys: { postId: route.params.id as string } }
  )

  model.value.comments.push(response)
  newComment.value = ''
}

async function handleSaveComment (comment: any) {
  const requests: Record<TRole, keyof paths> = {
    admin: '/api/admin/post/{postId}/comment/{commentId}/',
    user: '/api/user/post/{postId}/comment/{commentId}/'
  }

  await useApiClient.patch(requests[authStore.role],
    { text: comment.text },
    { dynamicKeys: { postId: route.params.id as string, commentId: comment.id } })
}

async function handleSave () {
  if (route.params.id === 'new') {
    const requests: Record<TRole, keyof paths> = {
      admin: '/api/admin/post/',
      user: '/api/user/post/'
    }
    const response = await useApiClient.post(requests[authStore.role], model.value)
    router.replace({ name: routeNames.postDetails, params: { id: (response as any).id } })

    model.value = { ...response as any, comments: [] }
  } else {
    const requests: Record<TRole, keyof paths> = {
      admin: '/api/admin/post/{postId}/',
      user: '/api/user/post/{postId}/'
    }

    const response = await useApiClient.patch(requests[authStore.role],
      { title: model.value.title, description: model.value.description },
      { dynamicKeys: { postId: route.params.id as string } })
    model.value = { ...model.value, ...response as any }
  }
}

onMounted(async () => {
  if (route.params.id !== 'new') {
    const requests: Record<TRole, keyof paths> = {
      admin: '/api/admin/post/{postId}/',
      user: '/api/user/post/{postId}/'
    }

    model.value = await useApiClient.get(
      requests[authStore.role],
      { dynamicKeys: { postId: route.params.id as string } }
    )
  } else {
    model.value = {
      title: '',
      description: '',
      comments: []
    }
  }
})
</script>

