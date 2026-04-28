<template>
  <div class="w-full md:container mx-auto p-5">
    <div class="mb-3 md:mb-0">
      <h2 class="text-lg sm:text-xl md:text-2xl mb-1 font-bold text-gray-700">
        Team Attendance
      </h2>
      <p class="mt-1 text-sm text-gray-500">Manage your team attendance</p>
    </div>
  </div>

  <div class="mt-8 bg-white w-full px-6 py-4 rounded-lg">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 my-6">
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

    <div class="overflow-x-auto pb-4">
      <div class="min-w-full inline-block align-middle">
        <div class="overflow-hidden rounded-lg border border-gray-300">
          <table class="table-auto min-w-full">
            <!-- Table Header -->
            <thead class="bg-[#fafafa] border-b border-gray-300">
              <tr>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Date
                </th>

                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Clock in
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Clock in location
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Clock out
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Clock out location
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Work Schedule
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  logged time
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Paid time
                </th>
                <th class="p-5 text-left font-semibold whitespace-nowrap">
                  Deflict
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
                <td class="px-6 py-4 whitespace-nowrap">Chidera</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import DateRange from "@/components/DateRange.vue";
</script>

<style lang="scss" scoped></style>
