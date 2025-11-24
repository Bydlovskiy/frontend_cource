<template>
  <div class="flex flex-col gap-2 p-5">
    <div class="flex justify-between">
      <div>Posts</div>
      <el-button @click="$router.push({ name: $routeNames.postDetails, params: { id: 'new' } })">Add Post</el-button>
    </div>

    <div class="flex gap-2">
      <el-input v-model="search" @input="searchPosts" />
      <el-select v-model="sortBy" @change="searchPosts">
        <el-option
          v-for="option in [
            { value: 'title', label: 'Title' },
            { value: 'createdAt', label: 'Created at' },
            { value: 'commentsCount', label: 'Comments count' }
          ]"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>

      <el-select v-model="tagsIds" multiple @change="searchPosts">
        <el-option
          v-for="option in tags"
          :key="option.id"
          :label="option.name"
          :value="option.id"
        />
      </el-select>

      <el-select v-model="sortDirection" @change="searchPosts">
        <el-option
          v-for="option in [
            { value: 'asc', label: 'Ascending' },
            { value: 'desc', label: 'Descending' }
          ]"
          :key="option.value"
          :label="option.label"
          :value="option.value"
        />
      </el-select>

      <el-input-number v-model="minCommentsCount" :min="0" @input="searchPosts" />
    </div>

    <div
      v-for="post in posts"
      :key="post.id" class="p-5 border rounded cursor-pointer"
      @click="$router.push({ name: $routeNames.postDetails, params: { id: post.id } })"
    >
      Title: {{ post.title }}
      <br>
      Description: {{ post.description }}
      <br>
      Comments count: {{ post.commentsCount }}
      <br>
      Author: {{ post.author.firstName }} {{ post.author.lastName }}
      <br>
      <template v-if="post">
        Tags: <el-tag v-for="tag in post.tags" :key="tag.id">{{ tag.name }}</el-tag>
      </template>
    </div>

    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="limit"
      :total="meta.total"
      layout="sizes, prev, pager, next"
      @current-change="searchPosts"
      @size-change="searchPosts"
    />
  </div>
</template>

<script lang="ts" setup>
import type { paths } from '@/api/types/schema'
const authStore = useAuthStore()
const posts = ref<TPosts['posts']>([])

const meta = ref<TPosts['meta']>({
  total: 0,
  page: 1,
  limit: 10,
  offset: 0,
  totalPages: 0
})

const search = ref('')
const sortBy = ref('createdAt')
const sortDirection = ref('')
const minCommentsCount = ref(0)
const limit = ref(10)
const currentPage = ref(1)
const tags = ref<TTags>([])
const tagsIds = ref<string[]>([])

async function searchPosts () {
  const request: Record<TRole, keyof paths> = {
    admin: '/api/admin/post/',
    user: '/api/user/post/'
  }
  const res = (await useApiClient.get(request[authStore.role],
    {
      params: {
        searchQuery: search.value,
        ...(sortBy.value && { sortBy: sortBy.value }),
        ...(sortDirection.value && { sortDirection: sortDirection.value }),
        ...(minCommentsCount.value && { minCommentsCount: minCommentsCount.value }),
        ...(limit.value && { limit: limit.value }),
        ...(tagsIds.value.length && { tagIds: tagsIds.value }),
        ...(currentPage.value && { offset: limit.value * (currentPage.value - 1) })
      } as any
    }))

  posts.value = (res as any).posts
  meta.value = (res as any).meta
}

onMounted(async () => {
  const request: Record<TRole, keyof paths> = {
    admin: '/api/admin/post/',
    user: '/api/user/post/'
  }

  tags.value = await useApiClient.get('/api/tags/')

  const res = await useApiClient.get(request[authStore.role])

  posts.value = (res as any).posts
  meta.value = (res as any).meta
})
</script>
