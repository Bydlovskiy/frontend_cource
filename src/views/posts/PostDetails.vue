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
      <div v-for="item in model.comments" :key="item.id" class="p-5 border rounded flex gap-2">
        <el-input v-model="item.text" />
        <el-button @click="handleSaveComment(item)">Update Comment</el-button>
      </div>

      <div v-if="route.params.id !== 'new'" class="p-5 border rounded flex gap-2">
        <el-input v-model="newComment" />
        <el-button @click="handleAddComment">Add Comment</el-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { routeNames } from '@/router/route-names'
const route = useRoute()
const router = useRouter()

const newComment = ref('')

const model = ref<TPost | any>({
  title: '',
  description: '',
  comments: []
})

async function handleAddComment () {
  const response = await useApiClient.post('/api/post/{postId}/comment/', { text: newComment.value }, { dynamicKeys: { postId: route.params.id as string } })
  model.value.comments.push(response)
  newComment.value = ''
}

async function handleSaveComment (comment: any) {
  await useApiClient.patch('/api/post/{postId}/comment/{commentId}/', { text: comment.text }, { dynamicKeys: { postId: route.params.id as string, commentId: comment.id } })
}

async function handleSave () {
  if (route.params.id === 'new') {
    const response = await useApiClient.post('/api/post/', model.value)
    router.replace({ name: routeNames.postDetails, params: { id: response.id } })

    model.value = { ...response, comments: [] }
  } else {
    const response = await useApiClient.patch('/api/post/{postId}/', { title: model.value.title, description: model.value.description }, { dynamicKeys: { postId: route.params.id as string } })
    model.value = { ...model.value, ...response }
  }
}

onMounted(async () => {
  if (route.params.id !== 'new') {
    model.value = await useApiClient.get('/api/post/{postId}/', { dynamicKeys: { postId: route.params.id as string } })
  } else {
    model.value = {
      title: '',
      description: '',
      comments: []
    }
  }
})
</script>

