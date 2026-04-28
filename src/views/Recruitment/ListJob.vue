<template>
  <div class="w-full md:container p-5 mx-auto">
    <div class="bg-white p-4 rounded-lg shadow-md">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <!-- Breadcrumb -->
        <div>
          <h2 class="text-xl font-semibold mb-1">Recruitment</h2>
          <div class="flex items-center space-x-0.5">
            <router-link to="/job" class="text-gray-500 text-sm"
              >List job</router-link
            >
            <AppIcon icon="heroicons:chevron-right-20-solid" />
            <p class="font-medium text-sm">3D Design</p>
          </div>
        </div>
        <div
          class="flex items-center space-x-2 flex-col sm:flex-row gap-3 w-full md:w-auto"
        >
          <!-- Search Input -->
          <div class="relative">
            <input
              type="text"
              class="border border-gray-200 rounded-lg p-2 w-full pr-10"
              placeholder="Search what you need"
            />
            <AppIcon
              icon="fluent:search-32-regular"
              class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
          </div>

          <!-- Add Candidate Button -->
          <div
            @click="addJob = true"
            class="bg-[#121829] text-white p-2 rounded-md flex items-center space-x-2 cursor-pointer hover:bg-[#1a1f36]"
          >
            Add Candidate
            <AppIcon icon="akar-icons:chevron-down-small" class="text-white" />
          </div>

          <!--  -->
          <button
            @click="isList = !isList"
            class="relative w-16 h-8 bg-gray-200 rounded-full flex items-center transition p-1"
          >
            <!-- Circle -->
            <div
              :class="[
                'w-6 h-6 rounded-full bg-[#11ad5d] shadow-md transform transition flex items-center justify-center',
                isList ? 'translate-x-0' : 'translate-x-4',
              ]"
            >
              <!-- Icon inside circle -->
              <div v-if="isList">
                <AppIcon
                  icon="heroicons:bars-3-20-solid"
                  class="w-4 h-4 text-white"
                />
              </div>
              <div v-else>
                <AppIcon icon="proicons:apps" class="w-4 h-4 text-white" />
              </div>
            </div>
          </button>
        </div>
      </div>

      <table
        v-if="isList"
        class="min-w-full divide-y divide-gray-200 overflow-x-auto mt-12"
      >
        <thead class="bg-gray-50">
          <tr>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Name
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Phone Number
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              CV
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Created Date
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Stages
            </th>
            <th
              scope="col"
              class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr>
            <td class="px-4 py-4 whitespace-nowrap">
              <div class="flex items-center">
                <div class="flex-shrink-0 h-10 w-10">
                  <img
                    class="h-10 w-10 rounded-full"
                    src="https://i.pravatar.cc/150?img=1"
                    alt=""
                  />
                </div>
                <div class="ml-4">
                  <div class="text-sm font-medium text-gray-900">
                    Jane Cooper
                  </div>
                  <div class="text-sm text-gray-500">
                    jane.cooper@example.com
                  </div>
                </div>
              </div>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              (555) 123-4567
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              Admin
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              Admin
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              Applied
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
              <a href="#" class="ml-2 text-red-600 hover:text-red-900"
                >Delete</a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <div v-else>
        <div class="flex overflow-x-auto gap-4 mt-6">
          <div
            v-for="n in 6"
            :key="n"
            class="bg-[#f2f2f2] w-full p-4 rounded-lg min-w-[300px] flex flex-col items-start"
          >
            <div class="flex items-center justify-between w-full text-gray-500">
              <p class="flex items-center gap-2">
                Applied
                <span
                  class="text-green-700 p-2 w-4 h-4 text-xs border border-green-700 rounded-md flex items-center justify-center"
                >
                  1
                </span>
              </p>
              <AppIcon icon="ic:round-add" class="text-gray-500 w-5 h-5" />
            </div>

            <div class="bg-white mt-4 p-4 rounded-lg w-full">
              <div class="flex items-center space-x-2">
                <div class="bg-green-300 rounded-full w-10 h-10 p-2">CN</div>
                <div>
                  <h1>Jane Cooper</h1>
                  <p class="text-sm">chi@gmail.com</p>
                </div>
              </div>

              <div class="flex justify-between items-center mt-4">
                <div class="flex justify-between items-center space-x-1">
                  <div class="flex items-center gap-0.5">
                    <AppIcon
                      icon="basil:chat-outline"
                      class="text-gray-400 w-7 h-7"
                    />
                    <span>2</span>
                  </div>

                  <div class="flex items-center gap-0.5">
                    <AppIcon
                      icon="proicons:dot-circle"
                      class="text-gray-400 w-5 h-5"
                    />
                    <span>2</span>
                  </div>
                </div>
                <AppIcon
                  icon="pepicons-pencil:dots-x"
                  class="text-gray-400 w-7 h-7"
                />
              </div>
            </div>

            <div class="bg-white mt-4 p-4 rounded-lg w-full">
              <div class="flex items-center space-x-2">
                <div class="bg-green-300 rounded-full w-10 h-10 p-2">CN</div>
                <div>
                  <h1>Jane Cooper</h1>
                  <p class="text-sm">chi@gmail.com</p>
                </div>
              </div>

              <div class="flex justify-between items-center mt-4">
                <div class="flex justify-between items-center space-x-1">
                  <div class="flex items-center gap-0.5">
                    <AppIcon
                      icon="basil:chat-outline"
                      class="text-gray-400 w-7 h-7"
                    />
                    <span>2</span>
                  </div>

                  <div class="flex items-center gap-0.5">
                    <AppIcon
                      icon="proicons:dot-circle"
                      class="text-gray-400 w-5 h-5"
                    />
                    <span>2</span>
                  </div>
                </div>
                <AppIcon
                  icon="pepicons-pencil:dots-x"
                  class="text-gray-400 w-7 h-7"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal -->
  <div v-if="addJob" class="fixed justify-end inset-0 bg-black/50 z-50">
    <h2>Create New Job</h2>
    <div>
      <div>
        <div class="bg-white rounded border border-gray-300">1</div>
        Job Information
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "ListJobView",
  setup() {
    const addJob = ref(false);
    const isList = ref(true);

    return {
      addJob,
      isList,
    };
  },
};
</script>

<style lang="scss" scoped></style>
