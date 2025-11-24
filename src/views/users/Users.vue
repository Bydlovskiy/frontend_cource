<template>
  <div class="flex flex-col gap-2 p-5">
    <div>Users</div>

    <el-input v-model="search" @input="searchPosts" />

    <div class="flex gap-2">
      <el-input v-model="email" type="email" placeholder="Invite@Email.com" />

      <el-select v-model="sender">
        <el-option value="sendGrid" label="SendGrid" />
        <el-option value="resend" label="Resend" />
      </el-select>

      <el-select v-model="role">
        <el-option value="admin" label="Admin" />
        <el-option value="user" label="User" />
      </el-select>

      <el-button @click="handleInvite">Invite User</el-button>
    </div>

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

      <el-table-column>
        <template #default="{ row }">
          <el-button :disabled="row.status === 'CONFIRMED'" @click="handleResend(row)">Resend</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts" setup>

const users = ref<any[]>([])

const search = ref('')
const email = ref('')
const role = ref<'admin' | 'user'>('user')
const sender = ref<'sendGrid' | 'resend'>('sendGrid')

const columns = ref<TTableHeadings<any>>([
  { label: 'Email', value: 'email', width: 200 },
  { label: 'First Name', value: 'firstName', width: 200 },
  { label: 'Last Name', value: 'lastName', width: 200 },
  { label: 'Role', value: 'role', width: 200 },
  { label: 'Status', value: 'status', width: 200 }
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
    await useApiClient.post('/api/admin/users/deactivate', { email: user.email })
  } else {
    await useApiClient.post('/api/admin/users/activate', { email: user.email })
  }
}

async function handleInvite () {
  await useApiClient.post('/api/admin/invite/', { email: email.value, role: role.value, sender: sender.value })
}

async function handleResend (user: any) {
  await useApiClient.post('/api/admin/invite/resend', { email: user.email, sender: sender.value })
}

onMounted(async () => {
  users.value = (await useApiClient.get('/api/admin/users/')).users
})
</script>
