<template>
  <div class="">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <div
          class="flex flex-col md:flex-row items-start md:items-center justify-between mb-4"
        >
          <div class="mb-6 md:mb-0">
            <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
              Employees Time Off
            </h2>
            <p class="mt-1 text-sm text-gray-500">
              Manage your Employees Time Off
            </p>
          </div>
          <div
            class="flex flex-col md:flex-row gap-4 items-left md:items-center"
          >
            <div class="relative">
              <input
                type="text"
                class="border border-gray-300 rounded-md py-2.5 px-2 w-full"
                placeholder="Search"
              />
              <AppIcon
                icon="heroicons-outline:search"
                class="w-5 h-5 text-gray-500 absolute right-3 top-1/2 -translate-y-1/2"
              />
            </div>
            <div
              class="bg-[#121828] gap-2 flex items-center py-2.5 px-6 rounded-lg text-white"
            >
              <AppIcon
                icon="heroicons-outline:document-download"
                class="w-6 h-6"
              />
              <span>Download</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-8">
          <DateRange />
          <select
            class="border border-gray-300 rounded-lg px-2 py-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <option value="">All Types</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
          <select
            class="border border-gray-300 rounded-lg px-2 py-2 w-full sm:w-auto text-sm sm:text-base"
          >
            <option value="">All Status</option>
            <option value="engineering">Engineering</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
            <option value="sales">Sales</option>
          </select>
        </div>

        <!-- Add your content here -->
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Employee Name
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  From
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  To
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type
                </th>

                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Attachment
                </th>
                <th
                  class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
              </tr>
            </thead>
            <tbody v-if="isLoading">
              <tr>
                <td><TableLoader /></td>
              </tr>
            </tbody>
            <tbody
              v-else-if="employeesOff.length > 0"
              class="divide-y divide-gray-300"
            >
              <tr
                v-for="leave in employeesOff"
                :key="leave.id"
                class="bg-white hover:bg-gray-50 transition duration-200"
              >
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  <div class="flex items-center gap-2">
                    <img
                      src="https://ui-avatars.com/api/?name=Chidera+Nwanoroh&background=6366f1&color=fff&size=40"
                      alt="avatar"
                      class="w-8 h-8 rounded-full"
                    />
                    <div>
                      <p class="font-medium text-gray-900">
                        {{ leave.user.first_name }}
                        {{ leave.user.last_name }}
                      </p>
                      <p class="text-sm text-gray-400">
                        {{ leave.user.email }}
                      </p>
                    </div>
                  </div>
                </td>

                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ formatDate(leave.start_date) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ formatDate(leave.end_date) }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ leave.leave_type }}
                </td>
                <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                  {{ leave.days }} day{{ leave.days > 1 ? "s" : "" }}
                </td>
                <!-- <td class="px-6 py-4 text-sm text-gray-900">
                        {{ leave.document_url }}
                      </td> -->

                <td class="px-6 py-2 whitespace-nowrap">
                  <div v-if="leave.document_url">
                    <a
                      :href="leave.document_url"
                      target="_blank"
                      class="inline-flex items-center gap-1.5 hover:underline text-sm"
                    >
                      <AppIcon icon="ep:document" class="w-5 h-5" />
                      <span class="truncate max-w-[160px]">
                        {{
                          leave.document_name ||
                          leave.document_url
                            .split("/")
                            .pop()
                            .split("?")[0]
                            .substring(0, 25) + "..."
                        }}
                      </span>
                    </a>
                  </div>
                  <span v-else class="text-gray-400 text-xs">—</span>
                </td>

                <td class="px-6 py-2">
                  <span
                    class="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full capitalize"
                    :class="{
                      'bg-amber-100 text-amber-800': leave.status === 'pending',
                      'bg-emerald-100 text-emerald-800':
                        leave.status === 'approved',
                      'bg-red-100 text-red-800': leave.status === 'rejected',
                    }"
                  >
                    <span
                      class="w-2 h-2 rounded-full"
                      :class="{
                        'bg-amber-500': leave.status === 'pending',
                        'bg-emerald-500': leave.status === 'approved',
                        'bg-red-500': leave.status === 'rejected',
                      }"
                    ></span>
                    {{ leave.status }}
                  </span>
                </td>
              </tr>
            </tbody>

            <!-- Empty State -->
            <tbody v-else>
              <tr>
                <td colspan="10" class="text-center p-5 text-gray-500">
                  <img src="/public/images/no-data.png" alt="" />
                </td>
              </tr>
            </tbody>
          </table>

          <div class="px-4">
            <vue-awesome-paginate
              :model-value="currentPage"
              :total-items="totalItems"
              :items-per-page="perPage"
              :page-size="5"
              @update:model-value="(page) => handlePageChange(page)"
              class="pagination-container"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import DateRange from "@/components/DateRange.vue";
import { employeeTimeOff } from "@/services/auth.timeoff.js";
import TableLoader from "@/components/TableLoader.vue";

export default {
  name: "EmployeeTimeOff",
  components: {
    DateRange,
    TableLoader,
  },

  setup() {
    const isLoading = ref(true);
    const employeesOff = ref([]);
    const currentPage = ref(1);
    const perPage = ref(2);
    const totalItems = ref(0);
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    };

    const handlePageChange = (page) => {
      currentPage.value = page;
      fetchEmployeesTimeOff(page);
    };

    const fetchEmployeesTimeOff = async (page = 1) => {
      isLoading.value = true;
      const response = await employeeTimeOff({
        page,
        per_page: perPage.value,
      });
      if (response?.status === 200 && response?.data) {
        employeesOff.value = response.data.data || [];
        totalItems.value = Number(
          response.data.total_items || response.data.total
        );
      } else {
        employeesOff.value = [];
        totalItems.value = 0;
      }
      isLoading.value = false;
    };

    onMounted(() => {
      fetchEmployeesTimeOff(currentPage.value);
    });

    return {
      fetchEmployeesTimeOff,
      isLoading,
      formatDate,
      employeesOff,
      handlePageChange,
      currentPage,
      perPage,
      totalItems,
    };
  },
};
</script>
