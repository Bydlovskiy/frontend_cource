<template>
  <el-tabs v-model="activeName" class="p-4">
    <el-tab-pane label="Soft" name="soft">
      <el-table :data="users">
        <el-table-column>
          <template #default="{ row }">
            {{ row.email }}
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="{ row }">
            {{ row.firstName }} {{ row.lastName }}
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="{ row }">
            {{ row.role }}
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="{ row }">
            {{ row.deletedAt }}
          </template>
        </el-table-column>

        <el-table-column>
          <template #default="{ row }">
            <el-button @click="handleRestore(row.id)">Restore</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-tab-pane>
    <el-tab-pane label="Hard" name="hard">Hard</el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
const activeName = ref('soft')

const users = ref<any[]>([])

async function handleRestore (id: string) {
  try {
    await useApiClient.post('/api/admin/users/restore', { id })
    users.value = users.value.filter((user: any) => user.id !== id)
    ElNotification.success('User restored successfully')
  } catch (e) {
    console.log(e)
    ElNotification.error('User restored failed')
  }
}

onMounted(async () => {
  users.value = (await useApiClient.get('/api/admin/users/soft-deleted')).users
  console.log(users.value)
})
</script>
