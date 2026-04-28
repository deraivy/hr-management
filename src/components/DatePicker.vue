<template>
  <div class="relative w-full">
    <!-- Input Field to Display Selected Date -->
    <div class="relative w-full flex items-center">
      <input
        type="text"
        class="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
        :class="{ 'border-red-500': error }"
        placeholder="Select a date"
        :value="formattedSelectedDate"
        @click="toggleCalendar"
        readonly
      />
      <svg
        class="absolute right-2 w-5 h-5 text-gray-500 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
        />
      </svg>
    </div>

    <!-- Error Message -->
    <span v-if="error" class="text-lg text-red-500">{{ error }}</span>

    <!-- Calendar (shown/hidden based on state) -->
    <div
      v-if="isCalendarOpen"
      class="absolute z-10 mt-1 flex flex-col bg-white border border-gray-200 shadow-lg rounded-xl overflow-hidden"
    >
      <div class="p-2 space-y-0.5">
        <!-- Months -->
        <div class="grid grid-cols-5 items-center gap-x-2 mx-1 pb-2">
          <div class="col-span-1">
            <button
              type="button"
              class="flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              aria-label="Previous Month"
              @click="prevMonth"
            >
              <svg
                class="shrink-0"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m15 18-6-6 6-6" />
              </svg>
            </button>
          </div>
          <div class="col-span-3 flex justify-center items-center gap-x-1">
            <select
              v-model="currentMonth"
              class="text-lg font-medium text-gray-800 border border-gray-200 rounded-md focus:outline-none"
            >
              <option
                v-for="(month, index) in months"
                :key="index"
                :value="index"
              >
                {{ month }}
              </option>
            </select>
            <select
              v-model="currentYear"
              class="text-lg font-medium text-gray-800 border border-gray-200 rounded-md focus:outline-none"
            >
              <option v-for="year in yearOptions" :key="year" :value="year">
                {{ year }}
              </option>
            </select>
          </div>
          <div class="col-span-1 flex justify-end">
            <button
              type="button"
              class="flex justify-center items-center text-gray-800 hover:bg-gray-100 rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none focus:bg-gray-100"
              aria-label="Next Month"
              @click="nextMonth"
            >
              <svg
                class="shrink-0"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="m9 18 6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        <!-- Weeks -->
        <div class="flex pb-1">
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Mo</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Tu</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >We</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Th</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Fr</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Sa</span
          >
          <span class="m-px w-9 block text-center text-lg text-gray-500"
            >Su</span
          >
        </div>
        <!-- Days -->
        <div class="flex" v-for="(week, index) in calendarDays" :key="index">
          <div v-for="(day, dayIndex) in week" :key="dayIndex">
            <button
              type="button"
              class="m-px size-9 flex justify-center items-center border-[1.5px] border-transparent text-lg rounded-full disabled:opacity-50 disabled:pointer-events-none focus:outline-none"
              :class="[
                day ? 'text-gray-800' : 'text-transparent',
                isSelected(day)
                  ? 'bg-blue-500 text-white border-blue-500'
                  : 'hover:border-blue-500 hover:text-white',
              ]"
              :disabled="!day"
              @click="selectDate(day)"
            >
              {{ day || "" }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, watch } from "vue";

export default {
  name: "DatePicker",
  props: {
    modelValue: {
      type: [Date, String, null],
      default: null,
    },
    error: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const isCalendarOpen = ref(false);
    const currentMonth = ref(new Date().getMonth());
    const currentYear = ref(new Date().getFullYear());
    const selectedDate = ref(
      props.modelValue ? new Date(props.modelValue) : null
    );

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const yearOptions = computed(() => {
      const years = [];
      const currentYearVal = new Date().getFullYear();
      for (let i = currentYearVal - 100; i <= currentYearVal + 10; i++) {
        years.push(i);
      }
      return years;
    });

    const calendarDays = computed(() => {
      const daysInMonth = new Date(
        currentYear.value,
        currentMonth.value + 1,
        0
      ).getDate();
      const firstDay = new Date(
        currentYear.value,
        currentMonth.value,
        1
      ).getDay();
      const weeks = [];
      let week = [];
      const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1; // Adjust for Monday start

      // Add empty slots for days before the first day of the month
      for (let i = 0; i < adjustedFirstDay; i++) {
        week.push(null);
      }

      // Add days of the month
      for (let day = 1; day <= daysInMonth; day++) {
        week.push(day);
        if (week.length === 7) {
          weeks.push(week);
          week = [];
        }
      }

      if (week.length > 0) {
        while (week.length < 7) {
          week.push(null);
        }
        weeks.push(week);
      }

      return weeks;
    });

    const formattedSelectedDate = computed(() => {
      if (!selectedDate.value) return "";
      const day = selectedDate.value.getDate();
      const month = months[selectedDate.value.getMonth()];
      const year = selectedDate.value.getFullYear();
      return `${day} ${month} ${year}`;
    });

    const toggleCalendar = () => {
      isCalendarOpen.value = !isCalendarOpen.value;
    };

    const prevMonth = () => {
      if (currentMonth.value === 0) {
        currentMonth.value = 11;
        currentYear.value--;
      } else {
        currentMonth.value--;
      }
    };

    const nextMonth = () => {
      if (currentMonth.value === 11) {
        currentMonth.value = 0;
        currentYear.value++;
      } else {
        currentMonth.value++;
      }
    };

    const isSelected = (day) => {
      if (!day || !selectedDate.value) return false;
      return (
        selectedDate.value.getDate() === day &&
        selectedDate.value.getMonth() === currentMonth.value &&
        selectedDate.value.getFullYear() === currentYear.value
      );
    };

    const selectDate = (day) => {
      if (day) {
        const dateObj = new Date(currentYear.value, currentMonth.value, day);
        selectedDate.value = dateObj;

        // Format as YYYY-MM-DD (backend requirement)
        const formatted = dateObj.toISOString().split("T")[0];

        // Emit the formatted string
        emit("update:modelValue", formatted);

        isCalendarOpen.value = false;
      }
    };

    // Sync with parent modelValue
    watch(
      () => props.modelValue,
      (newValue) => {
        selectedDate.value = newValue ? new Date(newValue) : null;
      }
    );

    return {
      isCalendarOpen,
      currentMonth,
      currentYear,
      months,
      yearOptions,
      calendarDays,
      formattedSelectedDate,
      toggleCalendar,
      prevMonth,
      nextMonth,
      isSelected,
      selectDate,
    };
  },
};
</script>
