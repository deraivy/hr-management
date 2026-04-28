<template>
  <div class="w-full md:container mx-auto p-5">
    <!-- Header -->

    <div>
      <h2 class="text-lg sm:text-xl md:text-2xl font-bold text-gray-700">
        Employee Attendance
      </h2>
      <p class="mt-1 text-sm text-gray-500">Manage your employee attendance</p>
    </div>

    <!-- Table Container -->
    <div class="bg-white p-4 mt-12 rounded-lg shadow">
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
                Date
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock in
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock in location
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock out
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Clock out location
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Work Schedule
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Logged Time
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Note
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Overtime
              </th>
              <th
                class="px-4 sm:px-6 py-3 whitespace-nowrap text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Deficit
              </th>
            </tr>
          </thead>

          <!-- Table Body -->
          <tbody v-if="isLoading">
            <tr>
              <td><TableLoader /></td>
            </tr>
          </tbody>

          <!-- No Data -->
          <tbody v-else-if="attendance.length === 0">
            <tr>
              <td colspan="10" class="text-center p-5 text-gray-500">
                <img src="/public/images/no-data.png" alt="" />
              </td>
            </tr>
          </tbody>

          <!-- Attendance Rows -->
          <tbody v-else v-for="att in attendance" :key="att.id">
            <tr class="border-b">
              <td class="px-6 py-4 whitespace-nowrap">
                <div class="text-sm font-medium text-gray-900">
                  {{ att.user.first_name }} {{ att.user.last_name }}
                </div>
                <div class="text-sm text-gray-500">
                  {{ att.user.email }}
                </div>
              </td>
              <!-- <td class="px-6 py-4 whitespace-nowrap"></td> -->
              <td class="px-6 py-4 whitespace-nowrap">{{ att.created_at }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ att.check_in }}</td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ att.clock_in_location }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ att.check_out || "-" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ att.clock_out_location || "-" }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">
                {{ att.work_schedule }}
              </td>
              <td class="px-6 py-4 whitespace-nowrap">{{ att.logged_time }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ att.note || "-" }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ att.overtime }}</td>
              <td class="px-6 py-4 whitespace-nowrap">{{ att.deficit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import TableLoader from "@/components/TableLoader.vue";
import { getEmployeeAttendance } from "@/services/auth.attendance";

const isLoading = ref(false);
const attendance = ref([]);

const fetchEmployeeAttendance = async () => {
  isLoading.value = true;
  const response = await getEmployeeAttendance();
  if (response.status === 200) {
    attendance.value = response.data.data;
    console.log("Attendance fetched:", attendance.value);
  } else {
    attendance.value = [];
  }

  isLoading.value = false;
};

onMounted(() => {
  fetchEmployeeAttendance();
});
</script>
