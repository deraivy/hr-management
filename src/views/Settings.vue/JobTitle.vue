<template>
  <div class="w-full md:container mx-auto p-5">
    <!-- job title -->
    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Job Title</h2>

        <div class="flex gap-4">
          <div class="relative">
            <input
              type="text"
              placeholder="Search job title"
              class="border rounded-md p-2"
            />
            <AppIcon
              icon="basil:search-outline"
              class="w-5 h-5 absolute top-1/2 -translate-y-1/2 right-2"
            />
          </div>
          <div
            class="text-center p-2 rounded-lg bg-[#12172b] text-white items-center flex"
          >
            <AppIcon icon="mdi:plus" class="w-5 h-5" /> Add New
          </div>
        </div>
      </div>
      <div class="border border-b my-3 w-full border-gray-100" />

      <div class="mt-8">
        <div
          class="overflow-x-auto border border-gray-200 rounded-lg shadow-sm"
        >
          <table class="min-w-full border-collapse bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th
                  class="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  Job Title
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  Number of Employees
                </th>
                <th
                  class="px-4 py-3 text-center text-sm font-semibold text-gray-700"
                >
                  Active
                </th>
                <th
                  class="px-4 py-3 text-left text-sm font-semibold text-gray-700"
                >
                  Actions
                </th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-200">
              <tr class="hover:bg-gray-50 transition">
                <td class="px-4 py-3 text-sm text-gray-800">Android Dev</td>

                <td class="px-4 py-3 text-sm text-gray-800">Android Dev</td>

                <td class="px-4 py-3 text-center">
                  <div
                    @click="isList = !isList"
                    :class="[
                      'relative mx-auto w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition',
                      isList ? 'bg-[#11ad5d]' : 'bg-gray-300',
                    ]"
                  >
                    <div
                      :class="[
                        'w-5 h-5 rounded-full bg-white shadow transform transition flex items-center justify-center',
                        isList ? 'translate-x-2.5' : 'translate-x-0',
                      ]"
                    >
                      <AppIcon
                        v-if="isList"
                        icon="material-symbols:done"
                        class="w-3.5 h-3.5 text-[#11ad5d]"
                      />
                    </div>
                  </div>
                </td>

                <td class="px-4 py-3">
                  <div class="flex items-center gap-2">
                    <button
                      class="p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition"
                    >
                      <AppIcon
                        icon="proicons:pencil"
                        class="w-4 h-4 text-white"
                      />
                    </button>

                    <button
                      class="p-2 bg-red-600 hover:bg-red-700 rounded-md transition"
                    >
                      <AppIcon
                        icon="material-symbols-light:delete-outline"
                        class="w-4 h-4 text-white"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "JobTitleView",
};
</script>

<style lang="scss" scoped></style>
