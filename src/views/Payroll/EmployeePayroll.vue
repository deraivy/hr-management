<template>
  <div class="w-full md:container mx-auto px-5 py-12">
    <div class="bg-white px-5 py-3 rounded-lg">
      <!-- Header -->
      <div
        class="flex flex-col md:flex-row justify-between items-left md:items-center mb-6"
      >
        <div class="mb-6 md:mb-0">
          <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
            Payroll
          </h2>
          <p class="mt-1 text-sm text-gray-500">Your report payroll so far</p>
        </div>

        <div class="flex flex-col md:flex-row gap-4 items-left md:items-center">
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

      <!-- Table -->
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200">
          <thead class="bg-gray-50">
            <tr>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Employee ID
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Total Comp
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Salary
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Allowance
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deduction
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                One-off
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-gray-200">
            <!-- Loading -->
            <tr v-if="isLoading">
              <td colspan="9" class="p-6 text-center">
                <TableLoader :isLoading="isLoading" />
              </td>
            </tr>

            <!-- Empty state -->
            <tr v-else-if="payrolls.length === 0">
              <td colspan="9" class="p-6 text-center text-gray-500">
                <img
                  src="/images/no-data.png"
                  alt="No data"
                  class="mx-auto w-18 h-18"
                />
                <p class="mt-2">No payroll records found</p>
              </td>
            </tr>

            <!-- Data rows -->
            <tr
              v-else
              v-for="payroll in payrolls"
              :key="payroll.id"
              class="bg-white hover:bg-gray-50 transition"
            >
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                <p class="text-sm font-medium">
                  {{ payroll.full_name }}
                </p>
                <p class="text-xs text-gray-400">
                  {{ payroll.email }}
                </p>
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.employment_id || "-" }}
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.total || 0 }}
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.compensations?.Salary || 0 }}
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.compensations?.Allowance || 0 }}
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.compensations?.Deduction || 0 }}
              </td>

              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                {{ payroll.compensations?.["One-Off"] || 0 }}
              </td>
              <td class="px-4 sm:px-6 py-4 whitespace-nowrap text-gray-900">
                <div class="flex items-center gap-4">
                  <!-- <router-link
                    v-if="payroll.user_id"
                    :to="{
                      name: 'payroll-detail',
                      params: { id: payroll.user_id },
                    }"
                    class="text-blue-600 hover:underline"
                  >
                    Edit
                  </router-link> -->
                  <router-link
                    v-if="payroll.user_id"
                    :to="{
                      name: 'payroll-detail',
                      params: { id: payroll.user_id },
                    }"
                    class="bg-black p-1 rounded-md hover:bg-black/80"
                  >
                    <AppIcon
                      icon="proicons:eye"
                      class="text-white w-4 h-4 sm:w-5 sm:h-5"
                    />
                  </router-link>
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- Pagination -->
        <vue-awesome-paginate
          :model-value="currentPage"
          :total-items="totalItems"
          :items-per-page="perPage"
          :max-pages-shown="5"
          @update:model-value="handlePageChange"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { getPayroll } from "@/services/auth.payroll";
import TableLoader from "@/components/TableLoader.vue";

const isLoading = ref(false);
const payrolls = ref([]);
const currentPage = ref(1);
const perPage = ref(1);
const totalItems = ref(0);

const handlePageChange = (page) => {
  currentPage.value = page;
  fetchPayroll(page);
};

const fetchPayroll = async (page = 1) => {
  isLoading.value = true;

  const response = await getPayroll({
    page,
    perPage: perPage.value,
  });

  if (response?.status === 200) {
    payrolls.value = response.data?.data || [];
    totalItems.value = response.data?.total_items || 0;
  } else {
    payrolls.value = [];
    totalItems.value = 0;
  }

  isLoading.value = false;
};

onMounted(() => {
  fetchPayroll(currentPage.value);
});
</script>

<style scoped>
table th,
table td {
  white-space: nowrap;
}

.pagination-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
  padding: 10px 0;
}

:deep(.back-button) {
  margin-right: 5px;
}

:deep(.next-button) {
  margin-left: 5px;
}

/* All number buttons */
:deep(.paginate-buttons) {
  height: 32px;
  width: 32px;
  border-radius: 6px;
  cursor: pointer;
  background-color: white;
  border: 1px solid #e5e5e5;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: #f2f2f3 0px 1px 2px 0px;
}

:deep(.paginate-buttons:hover) {
  background-color: #f2f2f3;
  transform: translateY(-1px);
}

/* Active (selected) page */
:deep(.active-page) {
  background-color: #e5e5e5;
  border-color: #e5e5e5;
  color: black;
}

/* Dots (…) */
:deep(.dots) {
  padding: 0 4px;
  color: #999;
  font-size: 16px;
}

/* PREVIOUS + NEXT buttons (black background) */
:deep(.back-button),
:deep(.next-button) {
  height: 36px;
  width: 36px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: black !important;
  border: 1px solid black !important;
  transition: all 0.2s ease;
}

:deep(.back-button:hover),
:deep(.next-button:hover) {
  background-color: #f2f2f3 !important;
  transform: translateY(-1px);
}

:deep(.back-button:disabled),
:deep(.next-button:disabled) {
  opacity: 0.4;
  cursor: not-allowed;
  background-color: #f2f2f3 !important;
}

/* Modal transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
