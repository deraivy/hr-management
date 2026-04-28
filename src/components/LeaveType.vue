<template>
  <div>
    <!-- Slider Version -->
    <div v-if="mode === 'slider'" class="w-full mx-auto mt-12">
      <div class="flex items-center justify-center gap-4">
        <!-- Prev Button -->
        <!-- <button
          class="swiper-button-prev-custom bg-white rounded-full shadow p-2 hover:bg-gray-100"
        >
          <AppIcon icon="material-symbols:chevron-left" class="w-6 h-6" />
        </button> -->

        <!-- Swiper -->
        <div class="relative w-full">
          <div v-if="isLoading">
            <p>Loading types</p>
          </div>
          <swiper
            v-else-if="leaveTypes.length"
            :breakpoints="{
              640: { slidesPerView: 2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 4 },
            }"
            :space-between="30"
            :pagination="{ clickable: true }"
            :navigation="{
              nextEl: '.swiper-button-next-custom',
              prevEl: '.swiper-button-prev-custom',
            }"
            :modules="modules"
            class="mySwiper flex flex-row gap-4"
          >
            <swiper-slide
              v-for="type in leaveTypes"
              :key="type.name"
              class="bg-white w-[300px] sm:w-[200px] rounded-lg p-4 shadow hover:shadow-lg transition-shadow flex flex-col justify-between"
            >
              <div class="flex items-center justify-between">
                <h2 class="text-lg font-semibold text-gray-800">
                  {{ type.name }}
                </h2>
                <AppIcon icon="octicon:info-24" class="w-5 h-5 text-gray-400" />
              </div>
              <p class="text-base mt-2 text-gray-600">
                {{ type.duration }} Days
              </p>
            </swiper-slide>
          </swiper>
          <div v-else>
            <p>No leave types found.</p>
          </div>
        </div>

        <!-- Next Button -->
        <!-- <button
          class="swiper-button-next-custom bg-white rounded-full shadow p-2 hover:bg-gray-100"
        >
          <AppIcon icon="material-symbols:chevron-right" class="w-6 h-6" />
        </button> -->
      </div>
    </div>

    <!-- Select Dropdown Version -->
    <div v-else-if="mode === 'select'" class="w-full">
      <div v-if="isLoading">
        <p>Loading types...</p>
      </div>
      <select
        v-else
        :value="modelValue"
        @change="$emit('update:modelValue', $event.target.value)"
        class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
      >
        <option value="">Select leave type</option>
        <option
          v-for="type in leaveTypes"
          :key="type.id"
          :value="type.id"
          class="py-2"
        >
          {{ type.name }} ({{ type.duration }} Days)
        </option>
      </select>
      <div
        v-if="!isLoading && !leaveTypes.length"
        class="text-gray-500 text-sm mt-2"
      >
        No leave types available
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/css";
import "swiper/css/pagination";
import { leaveType } from "@/services/auth.timeoff.js";

export default {
  name: "LeaveTypeSelector",
  components: {
    Swiper,
    SwiperSlide,
  },
  props: {
    mode: {
      type: String,
      default: "slider", // 'slider' or 'select'
      validator: (value) => ["slider", "select"].includes(value),
    },
    modelValue: {
      type: String,
      default: "",
    },
  },
  emits: ["update:modelValue"],
  setup(props) {
    const leaveTypes = ref([]);
    const isLoading = ref(false);

    const getLeaveTypes = async () => {
      isLoading.value = true;

      try {
        const response = await leaveType();

        if (response?.status === 200 && response?.data) {
          leaveTypes.value = response.data.data || [];
        } else {
          console.error("Failed to fetch leave types");
          leaveTypes.value = [];
        }
      } catch (error) {
        console.error("Error fetching leave types:", error);
        leaveTypes.value = [];
      } finally {
        isLoading.value = false;
      }
    };

    onMounted(() => {
      getLeaveTypes();
    });

    return {
      leaveTypes,
      isLoading,
      getLeaveTypes,
      props,
    };
  },
};
</script>
