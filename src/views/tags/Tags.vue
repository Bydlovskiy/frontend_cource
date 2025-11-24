<template>
  <div class="flex flex-col gap-2 p-5">
    <div v-for="tag in tags" :key="tag.id" class="flex gap-2">
      <el-input v-model="tag.name" />
      <el-button @click="handleEditTag(tag)">Edit Tag</el-button>
      <el-button @click="handleDeleteTag(tag)">Delete Tag</el-button>
    </div>

    <div class="flex gap-2">
      <el-input v-model="name" />
      <el-button @click="handleAddTag">Add Tag</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>

const tags = ref<TTags>([])
const name = ref('')

async function handleEditTag (tag: any) {
  const res = await useApiClient.patch('/api/admin/tags/{tagId}/', { name: tag.name }, { dynamicKeys: { tagId: tag.id } })
  tags.value = tags.value.map((t) => t.id === tag.id ? res : t)
}

async function handleAddTag () {
  const res = await useApiClient.post('/api/admin/tags/', { name: name.value })
  tags.value.push(res)
  name.value = ''
}

async function handleDeleteTag (tag: any) {
  await useApiClient.delete('/api/admin/tags/{tagId}/', { dynamicKeys: { tagId: tag.id } })
  tags.value = tags.value.filter((t) => t.id !== tag.id)
}

onMounted(async () => {
  tags.value = await useApiClient.get('/api/tags/')
})
</script>
