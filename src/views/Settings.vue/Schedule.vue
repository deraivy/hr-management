<template>
  <div class="w-full md:container mx-auto p-5">
    <div>
      <div class="flex justify-between items-center">
        <h2 class="text-2xl font-semibold">Work Schedule</h2>

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
            @click="addNew = true"
            class="text-center p-2 rounded-lg bg-[#12172b] text-white items-center flex"
          >
            <AppIcon icon="mdi:plus" class="w-5 h-5" /> Add New
          </div>
        </div>
      </div>
      <div class="border border-b my-3 w-full border-gray-100" />

      <div class="border rounded-lg p-5">
        <div class="flex justify-between gap-2 items-center">
          <div>
            <h2
              class="font-medium text-base lg:text-xl flex gap-2.5 items-center"
            >
              Mon - Fri, Duration 40 hours/week
              <span class="bg-gray-200 rounded-md text-xs uppercase p-1"
                >default</span
              >
            </h2>
          </div>
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
        </div>
        <div class="border border-b my-3 w-full border-gray-100" />
        <div class="space-y-2.5 mt-6">
          <div class="flex gap-6">
            <span class="w-62 text-gray-400">Standard working hours/day</span>
            <span class="font-semibold">08:00 - 17:00</span>
          </div>

          <div class="flex gap-6">
            <span class="w-62 text-gray-400">Effective from</span>
            <span class="font-semibold">08:00 - 17:00</span>
          </div>

          <div class="flex gap-6">
            <span class="w-62 text-gray-400">Schedule type</span>
            <span class="font-semibold">Duration Based</span>
          </div>

          <div class="flex gap-6">
            <span class="w-62 text-gray-400">Total working hours/day</span>
            <span class="font-semibold">08:00 - 17:00</span>
          </div>

          <div class="flex gap-6">
            <span class="w-62 text-gray-400">Daily working</span>
            <div class="flex flex-col space-y-1.5">
              <div class="flex gap-6">
                <span class="font-semibold w-20">Monday</span>
                <span class="text-gray-700">8h 00m</span>
              </div>

              <div class="flex gap-6">
                <span class="font-semibold w-20">Tuesday</span>
                <span class="text-gray-700">8h 00m</span>
              </div>

              <div class="flex gap-6">
                <span class="font-semibold w-20">Wednesday</span>
                <span class="text-gray-700">8h 00m</span>
              </div>

              <div class="flex gap-6">
                <span class="font-semibold w-20">Thurday</span>
                <span class="text-gray-700">8h 00m</span>
              </div>

              <div class="flex gap-6">
                <span class="font-semibold w-20">Friday</span>
                <span class="text-gray-700">8h 00m</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="border rounded-lg p-5 mt-4">
        <h2 class="font-medium text-xl flex gap-2.5 items-center">
          Mon - Fri, Duration 40 hours/week
        </h2>
      </div>
    </div>

    <div
      v-if="addNew"
      class="bg-black/50 fixed z-50 flex items-center justify-end inset-0"
    >
      <div
        @click="showModal = false"
        class="bg-white w-10 h-10 p-2 rounded-full shadow-lg text-gray-500 hover:text-gray-700 mr-2 hidden md:block"
      >
        <AppIcon icon="codicon:chevron-right" class="w-6 h-6" />
      </div>
      <div class="bg-white h-full w-1/2 p-6">
        <h2 class="mb-6 text-xl font-semibold">Add New Work Schedule</h2>
        <div class="mb-4">
          <p class="mb-1">Schedule Name <span class="text-red-500">*</span></p>
          <input
            type="text"
            class="w-full border border-gray-300 rounded-md p-2"
            placeholder="Remote work"
          />
        </div>

        <div class="flex flex-col md:flex-row gap-4 w-full mb-4">
          <div class="w-full">
            <p class="mb-1">
              Effective from <span class="text-red-500">*</span>
            </p>
            <input
              type="date"
              class="w-full border border-gray-300 rounded-md p-2"
            />
          </div>
          <div class="w-full">
            <p class="mb-1">Standard working hours/day</p>
            <input
              type="time"
              class="w-full border border-gray-300 rounded-md p-2"
              placeholder="8h 00m"
            />
          </div>
        </div>

        <h2 class="text-xl font-semibold mb-4">Schedule type</h2>

        <div class="flex flex-col md:flex-row gap-4">
          <div>
            <label
              class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
            >
              <span class="text-black text-sm">Duration-based</span>
              <input
                type="radio"
                name="duration-based"
                class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
              />
            </label>
            <p class="text-gray-500 mt-2 text-xs">
              Schedule with fixed start and end time. Only time clocked during
              the schedule will be counted as paid time
            </p>
          </div>
          <div>
            <label
              class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
            >
              <span class="text-black text-sm">Duration-based</span>
              <input
                type="radio"
                name="duration-based"
                class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
              />
            </label>

            <p class="text-gray-500 mt-2 text-xs">
              Schedule with fixed start and end time. Only time clocked during
              the schedule will be counted as paid time
            </p>
          </div>
        </div>

        <h2 class="text-xl font-semibold my-4">Working time</h2>
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead class="bg-gray-200">
              <tr>
                <th class="p-3 text-left">Working Day</th>
                <th class="p-3 text-left">Time</th>
              </tr>
            </thead>

            <tbody>
              <tr v-for="day in days" :key="day.name" class="border-b">
                <!-- Day + Toggle -->
                <td class="p-3 flex items-center gap-4">
                  <span>{{ day.name }}</span>

                  <div
                    @click="day.enabled = !day.enabled"
                    :class="[
                      'relative w-12 h-7 rounded-full flex items-center p-1 cursor-pointer transition',
                      day.enabled ? 'bg-[#11ad5d]' : 'bg-gray-300',
                    ]"
                  >
                    <div
                      :class="[
                        'w-5 h-5 rounded-full bg-white shadow transform transition flex items-center justify-center',
                        day.enabled ? 'translate-x-2.5' : 'translate-x-0',
                      ]"
                    >
                      <AppIcon
                        v-if="day.enabled"
                        icon="material-symbols:done"
                        class="w-3.5 h-3.5 text-[#11ad5d]"
                      />
                    </div>
                  </div>
                </td>

                <!-- Time -->
                <td class="p-3">
                  <input
                    v-if="day.enabled"
                    v-model="day.time"
                    class="border rounded px-2 py-1"
                  />
                  <span v-else class="text-gray-400">Closed</span>
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
import { ref } from "vue";
export default {
  name: "ScheduleView",

  setup() {
    const isList = ref(false);
    const addNew = ref(false);

    const days = ref([
      { name: "Monday", enabled: true, time: "09:00 - 18:00" },
      { name: "Tuesday", enabled: true, time: "09:00 - 18:00" },
      { name: "Wednesday", enabled: true, time: "09:00 - 18:00" },
    ]);
    return {
      isList,
      addNew,
      days,
    };
  },
};
</script>

<style lang="scss" scoped></style>
