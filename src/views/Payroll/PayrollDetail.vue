<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="bg-white p-4 rounded-lg shadow-sm">
      <div class="flex items-center py-2 mb-4">
        <AppIcon
          icon="jam:chevron-left"
          @click="goBack"
          class="w-6 h-6 text-gray-500 hover:text-black transition-colors cursor-pointer"
        />
        <h2 class="text-base sm:text-lg md:text-xl font-bold text-gray-700">
          Payroll Detail
        </h2>
      </div>

      <div class="p-4 rounded-lg border border-gray-300">
        <div v-if="isLoading" class="animate-pulse space-y-8">
          <!-- User Header Skeleton -->
          <div class="flex items-center space-x-4">
            <div class="rounded-full bg-gray-300 h-12 w-12"></div>
            <div class="space-y-2">
              <div class="h-6 bg-gray-300 rounded w-48"></div>
              <div class="h-4 bg-gray-300 rounded w-32"></div>
            </div>
          </div>

          <!-- Details Grid Skeleton -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-6">
              <div class="flex items-center gap-6">
                <span class="text-sm font-medium text-gray-500 w-32"
                  >Employee Status</span
                >
                <div class="h-5 bg-gray-300 rounded w-40"></div>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500 w-32">Employment Type</span>
                <div class="h-5 bg-gray-300 rounded w-32"></div>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500 w-32">Geofencing</span>
                <div class="h-5 bg-gray-300 rounded w-24"></div>
              </div>
            </div>

            <div class="space-y-6">
              <div class="flex items-center gap-6">
                <span class="text-gray-500 w-32">Job Title</span>
                <div class="h-5 bg-gray-300 rounded w-48"></div>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500 w-32">Job Date</span>
                <div class="h-5 bg-gray-300 rounded w-32"></div>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500 w-32">Last Working Date</span>
                <div class="h-5 bg-gray-300 rounded w-20"></div>
              </div>
            </div>
          </div>

          <!-- Total Compensation Skeleton -->
          <div class="bg-gray-200 rounded-md flex justify-between p-4">
            <div class="h-6 bg-gray-300 rounded w-40"></div>
            <div class="h-7 bg-gray-300 rounded w-28"></div>
          </div>

          <!-- Pay Details Loop Skeleton (show 3-4 placeholders) -->
          <div
            v-for="n in 4"
            :key="n"
            class="border border-gray-300 rounded-md flex justify-between p-4"
          >
            <div class="h-5 bg-gray-300 rounded w-56"></div>
            <div class="h-6 bg-gray-300 rounded w-24"></div>
          </div>

          <!-- Attendance Skeleton -->
          <div class="border border-gray-300 rounded-md p-4">
            <div class="flex items-center justify-between mb-4">
              <div class="h-6 bg-gray-300 rounded w-32"></div>
              <div class="h-6 bg-gray-300 rounded w-24"></div>
            </div>
            <div class="bg-gray-200 grid grid-cols-2 gap-4 p-4 rounded-md">
              <div class="h-4 bg-gray-300 rounded w-24"></div>
              <div class="h-4 bg-gray-300 rounded w-32"></div>
            </div>
            <div class="grid grid-cols-2 gap-4 p-4">
              <div class="h-5 bg-gray-300 rounded w-20"></div>
              <div class="h-5 bg-gray-300 rounded w-28"></div>
            </div>
          </div>

          <!-- Dependents Skeleton -->
          <div
            class="border border-gray-300 p-4 rounded-md flex items-center justify-between"
          >
            <div class="h-6 bg-gray-300 rounded w-32"></div>
            <div class="h-10 bg-gray-300 rounded-lg w-32"></div>
          </div>

          <!-- Bank Information Skeleton -->
          <div class="border border-gray-300 p-4 rounded-md">
            <div class="flex justify-between mb-4">
              <div class="h-6 bg-gray-300 rounded w-40"></div>
              <div class="h-6 w-6 bg-gray-300 rounded"></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div class="space-y-6">
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Bank Name</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-48"></div>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Branch</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-32"></div>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >SWIFT/BIC</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-24"></div>
                </div>
              </div>
              <div class="space-y-6">
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Account Name</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-56"></div>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Account Number</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-40"></div>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >IBAN</span
                  >
                  <div class="h-5 bg-gray-300 rounded w-32"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else-if="payroll && payroll.user_info">
          <div class="flex items-center space-x-2">
            <img src="" alt="" class="border rounded-full w-12 h-12" />
            <div>
              <h3 class="font-medium text-lg">
                {{ payroll.user_info.name || "-" }}
              </h3>
              <p class="text-sm text-gray-500">
                {{ payroll.user_info.employment_details.job_title || "-" }}
              </p>
            </div>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 text-gray-800">
            <div class="space-y-4">
              <div class="flex items-center gap-6">
                <span class="text-sm font-medium text-gray-500 w-32"
                  >Employee Status</span
                >
                <span class="text-base font-semibold text-gray-800">
                  {{
                    payroll.user_info.employment_details.employment_status ||
                    "-"
                  }}
                </span>
              </div>
              <div class="flex items-center gap-6 mb-2">
                <span class="text-gray-500">Employment Type</span>
                <span class="font-medium">
                  {{
                    payroll.user_info.employment_details.employment_type || "-"
                  }}</span
                >
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500">Geofencing</span>
                <span class="font-medium">30 Sep 2024</span>
              </div>
            </div>

            <div class="space-y-4">
              <div class="flex items-center gap-6 mb-2">
                <span class="text-gray-500">Job Title</span>
                <span class="font-medium">Junior UI/UX Designer</span>
              </div>
              <div class="flex items-center gap-6 mb-2">
                <span class="text-gray-500">Job Date</span>
                <span class="font-medium"
                  >{{ payroll.user_info.employment_details.join_date || "-" }}
                </span>
              </div>
              <div class="flex items-center gap-6">
                <span class="text-gray-500">Last Working Date</span>
                <span class="font-medium">-</span>
              </div>
            </div>
          </div>

          <div
            class="bg-[#f2f2f2] w-full rounded-md flex justify-between mt-6 p-4"
          >
            <h2>Total Compesation</h2>
            <p class="font-medium">$18,500</p>
          </div>

          <!-- Loop through each pay detail item -->
          <div
            v-for="(item, index) in payroll.pay_detail"
            :key="index"
            class="border border-gray-300 w-full rounded-md flex justify-between mt-6 p-4"
          >
            <h2>{{ item.compensation_type || "-" }}</h2>
            <p class="font-medium">{{ item.amount || "-" }}</p>
          </div>

          <div class="border border-gray-300 rounded-md p-4 mt-6">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-medium">Attendance</h2>
              <p class="font-medium">40h 30m</p>
            </div>

            <div
              class="bg-[#f2f2f2] grid grid-cols-2 gap-4 mt-4 p-4 rounded-md"
            >
              <p>Deflict</p>
              <p>Actual work hours</p>
            </div>
            <div class="grid grid-cols-2 gap-4 p-4">
              <p>{{ payroll.attendance.duration || "-" }}</p>
              <p>{{ payroll.attendance.total_duration || "-" }}</p>
            </div>
          </div>

          <div
            class="border border-gray-300 mt-4 p-4 rounded-md flex items-center justify-between"
          >
            <h2 class="text-lg font-medium">Dependents</h2>
            <div class="relative w-32">
              <select
                class="block w-full appearance-none rounded-lg pr-10 text-gray-700 outline-none"
              >
                <option value="">-</option>
                <option value="">Option 1</option>
                <option value="">Option 2</option>
              </select>

              <AppIcon
                icon="mdi:chevron-down"
                class="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 pointer-events-none text-gray-500"
              />
            </div>
          </div>

          <!-- Bank information -->
          <div class="border border-gray-300 p-4 rounded-md mt-6">
            <div class="flex justify-between">
              <h2 class="text-lg font-medium">Bank Information</h2>
              <AppIcon
                icon="codicon:chevron-down"
                class="w-6 h-6 text-gray-400 cursor-pointer"
              />
            </div>
            <div class="border-b border-gray-300 mt-4" />
            <div
              class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 text-gray-800"
            >
              <div class="space-y-4">
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Bank Name</span
                  >
                  <span class="text-base font-semibold text-gray-800"
                    >{{ payroll.bank_details.bank_name || "-" }}
                  </span>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Branch</span
                  >
                  <span class="text-base font-semibold text-gray-800">- </span>
                </div>

                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >SWIFT/BIC</span
                  >
                  <span class="text-base font-semibold text-gray-800">- </span>
                </div>
              </div>

              <div class="space-y-4">
                <div class="flex items-center gap-6 mb-2">
                  <span class="text-gray-500"></span>
                  <span class="font-medium"></span>
                </div>
                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Account Name</span
                  >
                  <span class="text-base font-semibold text-gray-800">{{
                    payroll.bank_details.account_name || "-"
                  }}</span>
                </div>

                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >Account Number</span
                  >
                  <span class="text-base font-semibold text-gray-800">{{
                    payroll.bank_details.account_number || "-"
                  }}</span>
                </div>

                <div class="flex items-center gap-6">
                  <span class="text-sm font-medium text-gray-500 w-32"
                    >IBAN</span
                  >
                  <span class="text-base font-semibold text-gray-800">-</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { onePayroll } from "@/services/auth.payroll";

const route = useRoute();
const router = useRouter();
const payroll = ref(null);
const isLoading = ref(false);
const error = ref(null);
const goBack = () => {
  router.go(-1);
};
const fetchPayroll = async () => {
  try {
    isLoading.value = true;
    error.value = null; // Reset error
    const userId = route.params.id;
    const res = await onePayroll(userId);

    if (res.data && Object.keys(res.data).length > 0) {
      payroll.value = res.data;
      console.log("Payroll set successfully:", payroll.value);
    } else {
      payroll.value = null;
      error.value = "No payroll data available";
    }
  } catch (err) {
    console.error("Error details:", err);
    error.value =
      err.response?.data?.detail || err.message || "Failed to load payroll";
    payroll.value = null; // Ensure payroll is null on error
  } finally {
    isLoading.value = false;
  }
};

onMounted(fetchPayroll);
</script>
