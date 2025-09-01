<template>
  <div class="flex flex-col gap-2 p-5">
    <div>Users</div>

    <el-input v-model="search" @input="searchPosts" />

    <el-table :data="users" :columns="columns">
      <el-table-column>
        <template #default="{ row }">
          {{ row.firstName }} {{ row.lastName }}
        </template>
      </el-table-column>

      <el-table-column>
        <template #default="{ row }">
          {{ row.email }}
        </template>
      </el-table-column>

      <el-table-column>
        <template #default="{ row }">
          <el-switch v-model="row.isEnabled" @change="handleToggle(row)" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>

const users = ref<any[]>([])

const search = ref('')
const columns = ref<TTableHeadings<any>>([
  { label: 'Email', value: 'email', width: 200 },
  { label: 'First Name', value: 'firstName', width: 200 },
  { label: 'Last Name', value: 'lastName', width: 200 },
  { label: 'Is Enabled', value: 'isEnabled', width: 200 }
])

async function searchPosts () {
  const res = (await useApiClient.get('/api/admin/users/',
    {
      params: {
        searchQuery: search.value
      } as any
    }))

  users.value = (res as any).users
}

async function handleToggle (user: any) {
  if (!user.isEnabled) {
    await useApiClient.post('/api/admin/users/{subId}/deactivate', { isEnabled: user.isEnabled }, { dynamicKeys: { subId: user.subId } })
  } else {
    await useApiClient.post('/api/admin/users/{subId}/activate', { isEnabled: user.isEnabled }, { dynamicKeys: { subId: user.subId } })
  }
}

onMounted(async () => {
  users.value = (await useApiClient.get('/api/admin/users/')).users
})
</script>
