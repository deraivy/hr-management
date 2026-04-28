<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="flex items-center gap-4 mb-4">
      <AppIcon icon="proicons:chevron-left" class="w-6 h-6 text-gray-500" />
      <div>
        <div class="flex items-center gap-2">
          <h2 class="font-semibold text-2xl">Admin</h2>
          <div class="bg-gray-200 w-fit px-2 py-1 rounded-lg">default</div>
        </div>

        <p class="text-gray-400">
          Admin can see all fields, edit all fields and do everything the system
          offers
        </p>
      </div>
    </div>

    <div class="flex items-center border-b-2 border-gray-200 space-x-4">
      <!-- Permission Tab -->
      <div
        @click="activeTab = 'permission'"
        :class="[
          'cursor-pointer border-b-2 px-3 py-2 transition',
          activeTab === 'permission'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-700',
        ]"
      >
        Permission
      </div>

      <!-- Member Tab -->
      <div
        @click="activeTab = 'member'"
        :class="[
          'cursor-pointer border-b-2 px-3 py-2 transition',
          activeTab === 'member'
            ? 'border-green-600 text-green-600'
            : 'border-transparent text-gray-500 hover:text-green-600 hover:border-green-700',
        ]"
      >
        Member
      </div>
    </div>

    <div v-if="activeTab === 'permission'" class="mt-12">
      <div class="border border-gray-200 p-4 rounded-lg">
        <h2 class="text-lg font-medium">
          Users with this information can access the information of
        </h2>
        <div class="mt-4">
          <select name="" id="" class="border border-100 p-2 rounded-lg">
            <option value="All Employees">All Employees</option>
            <option value="Specific Employees">Specific Employees</option>
            <option value="Specific Employees">Specific Employees</option>
            <option value="Specific Employees">Specific Employees</option>
          </select>

          <table class="min-w-full divide-y divide-gray-200 mt-6">
            <thead class="bg-gray-200 rounded-xl">
              <tr>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Section
                </th>
                <th
                  class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
                >
                  Permission
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Profile picture</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Personal Info</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Address</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Emergency Contact</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Offboarding</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Bank Info</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>

              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Job information</td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="flex gap-2 items-center">
                    <AppIcon icon="tabler:pencil" />
                    <p>view & edit</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div v-if="activeTab === 'member'" class="mt-12">
      <div
        class="border border-gray-200 p-6 rounded-lg flex items-center justify-between"
      >
        <h2 class="font-medium text-lg">Add Admin Member</h2>

        <div class="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search member"
            class="w-full border rounded-lg py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-500"
          />

          <AppIcon
            icon="weui:search-filled"
            class="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>
      <div class="mt-4">
        <table class="min-w-full divide-y divide-gray-200 mt-6">
          <thead class="bg-gray-200 rounded-xl">
            <tr>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                Member
              </th>
              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                Email
              </th>

              <th
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 tracking-wider"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Pristina Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <AppIcon icon="tabler:pencil" />
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Pristina Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <AppIcon icon="tabler:pencil" />
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-nowrap">Pristina Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">Cassandra</td>
              <td class="px-6 py-4 whitespace-nowrap">
                <AppIcon icon="tabler:pencil" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "PermissionView",
  setup() {
    const activeTab = ref("member");
    return {
      activeTab,
    };
  },
};
</script>

<style lang="scss" scoped></style>
