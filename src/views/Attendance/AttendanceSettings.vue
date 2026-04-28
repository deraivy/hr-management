<template>
  <div class="w-full md:container mx-auto px-5 py-12">
    <div class="mb-8">
      <h1 class="text-2xl font-bold text-gray-900 mb-2">Setting Attendance</h1>
      <p class="text-gray-600">Setting your attendance</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-8 gap-4">
      <div class="col-span-2 h-[190px] bg-white rounded-md p-4">
        <!-- tab -->
        <div
          @click="activeTab = 'general'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-2.5 mb-2',
            activeTab === 'general'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <div class="flex items-center space-x-1">
            <AppIcon
              icon="ep:setting"
              :class="[
                'w-6 h-6 transition-colors duration-200',
                activeTab === 'general' ? 'text-green-600' : 'text-gray-400',
              ]"
            />
            <span>General</span>
          </div>
        </div>

        <div
          @click="activeTab = 'locations'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-2.5 mb-2',
            activeTab === 'locations'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <div class="flex items-center space-x-1">
            <AppIcon
              icon="fontisto:world-o"
              :class="[
                'w-6 h-6 transition-colors duration-200',
                activeTab === 'locations' ? 'text-green-600' : 'text-gray-400',
              ]"
            />
            <span class="font-medium text-sm">Locations & Privacy</span>
          </div>
        </div>

        <div class="flex items-center space-x-1"></div>
        <div
          @click="activeTab = 'qr'"
          :class="[
            'flex items-center gap-3 cursor-pointer transition-all duration-200 rounded-lg px-4 py-2.5',
            activeTab === 'qr'
              ? 'bg-gray-200 shadow-sm'
              : 'hover:bg-gray-100 text-gray-700',
          ]"
        >
          <div class="flex items-center space-x-1">
            <AppIcon
              icon="flowbite:list-outline"
              :class="[
                'w-8 h-8 transition-colors duration-200',
                activeTab === 'qr' ? 'text-green-600' : 'text-gray-400',
              ]"
            />
            <span class="font-medium text-sm">QR Code</span>
          </div>
        </div>
      </div>

      <div class="col-span-6 bg-white rounded-md p-6">
        <!-- General Settings -->
        <div v-if="activeTab === 'general'" class="">
          <div class="flex items-center justify-between">
            <h2 class="text-lg font-semibold mb-4">General</h2>
            <button
              @click="isEditing = !isEditing"
              class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
            >
              <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
            </button>
          </div>

          <!-- set work time -->
          <div class="flex items-center gap-2">
            <div>
              <p class="mb-1">Start Time <span class="text-red-500">*</span></p>

              <div v-if="!isEditing">
                <span class="border border-gray-300 p-2 w-full rounded-md">
                  {{ work_hour?.start_time ?? "Not set" }}
                </span>
              </div>

              <div v-else>
                <input
                  v-model="time.start_time"
                  type="time"
                  class="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>

            <!-- End Time -->
            <div>
              <p class="mb-1">End Time <span class="text-red-500">*</span></p>

              <div v-if="!isEditing">
                <span class="border border-gray-300 p-2 w-full rounded-md">
                  {{ work_hour?.end_time || "Not set" }}
                </span>
              </div>

              <div v-else>
                <input
                  v-model="time.end_time"
                  type="time"
                  class="border border-gray-300 p-2 w-full"
                />
              </div>
            </div>
          </div>

          <button @click="addWorkHours" class="bg-pink-300 p-4">
            {{ isLoading ? "Saving..." : "Save" }}
          </button>

          <div class="mt-4">
            <p class="mb-1">
              Attendance Start Date <span class="text-red-500">*</span>
            </p>
            <input
              type="date"
              class="w-full border border-gray-300 px-2 py-2 rounded-md"
            />
          </div>
          <div class="mt-4">
            <p class="mb-1">
              Attendance Approval Cycle <span class="text-red-500">*</span>
            </p>
            <div class="flex flex-col md:flex-row items-center gap-4">
              <div class="w-full">
                <select
                  name=""
                  id=""
                  class="border border-gray-300 w-full p-2 rounded-md outline-none"
                >
                  <option value="">Gain</option>
                  <option value="">Gain</option>
                  <option value="">Gain</option>
                </select>
              </div>

              <div class="w-full">
                <select
                  name=""
                  id=""
                  class="border border-gray-300 w-full p-2 rounded-md outline-none"
                >
                  <option value="">Gain</option>
                  <option value="">Gain</option>
                  <option value="">Gain</option>
                </select>
              </div>
            </div>
          </div>

          <div class="flex flex-col md:flex-row mt-4 gap-4">
            <div class="w-full">
              <p class="mb-1">Repeat On <span class="text-red-500">*</span></p>
              <div class="relative w-full">
                <select
                  class="border border-gray-300 rounded-md px-2 py-2 w-full outline-none appearance-none pr-8"
                >
                  <option class="">Every valid check in and out</option>
                  <option class="bg-white text-gray-700">Option 1</option>
                  <option class="bg-white text-gray-700">Option 2</option>
                </select>

                <AppIcon
                  icon="mdi:chevron-down"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none"
                />
              </div>
            </div>

            <div class="w-full">
              <p class="mb-1">Location <span class="text-red-500">*</span></p>
              <div class="relative w-full">
                <select
                  class="border border-gray-300 rounded-md px-2 py-2 w-full outline-none appearance-none pr-8"
                >
                  <option class="">Every valid check in and out</option>
                  <option class="bg-white text-gray-700">Option 1</option>
                  <option class="bg-white text-gray-700">Option 2</option>
                </select>

                <AppIcon
                  icon="mdi:chevron-down"
                  class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Location & Policy Settings -->
        <div v-if="activeTab === 'locations'" class="">
          <h2 class="text-lg font-semibold mb-4">Locations & Policy</h2>
          <div class="border border-gray-300 rounded-md p-4">
            <div class="flex justify-between">
              <h2 class="text-lg font-semibold">Unpixel</h2>

              <AppIcon icon="pepicons-pencil:dots-y" class="w-10 h-5" />
            </div>
            <div class="border-b mt-2 border-gray-200" />

            <div class="max-w-xl">
              <div class="grid grid-cols-1 md:grid-cols-6 mt-4">
                <div class="col-span-3 space-y-2 text-gray-400">
                  <p>Clocking in/out from</p>
                  <p>QR Code</p>
                  <p>Geofencing</p>
                  <p>Accurate Address</p>
                  <p>Radius</p>
                  <p>Policy</p>
                </div>
                <div class="col-span-3 space-y-2 font-medium text-gray-900">
                  <p>Desktop, Mobile</p>
                  <p>Yes</p>
                  <p>Active</p>
                  <p>100 Queen St W, Toronto, ON M5H 2N3, Kanada</p>
                  <p>1 kilometers</p>
                  <p>Not allow clock in/out outside the office</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- QR Code Settings -->
        <div v-if="activeTab === 'qr'" class="">
          <h2 class="text-lg font-semibold mb-4">QR Code</h2>
          <p>
            Auto generate new QR everytime <span class="text-red-500">*</span>
          </p>
          <div class="flex items-start space-x-1 mt-4">
            <div>
              <AppIcon icon="quill:info" class="w-5 h-5" />
            </div>
            <p>
              Generate a qr code to make everyone clock in/out by scanning the
              GroveHr app
              <span class="text-green-500 font-medium"
                >Start displaying QR code</span
              >
            </p>
          </div>
          <div class="flex space-x-2 mt-4">
            <!-- First (smaller) select -->
            <div class="relative w-42">
              <select
                class="appearance-none w-full border border-gray-300 p-2 rounded-md"
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </select>
              <AppIcon
                icon="mdi:chevron-down"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none"
              />
            </div>

            <!-- Second (normal) select -->
            <div class="relative w-full">
              <select
                class="appearance-none border border-gray-300 p-2 rounded-md w-full"
              >
                <option>Every 1 sec</option>
                <option>Every 2 min</option>
                <option>Every 3 hour</option>
              </select>
              <AppIcon
                icon="mdi:chevron-down"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>
          <div class="mt-4">
            <p class="mb-1">
              Security type <span class="text-red-500">*</span>
            </p>
            <div class="relative w-full">
              <select
                class="border border-gray-300 rounded-md px-2 py-2 w-full outline-none appearance-none pr-8"
              >
                <option class="">Public URL for everyone</option>
                <option class="bg-white text-gray-700">Option 1</option>
                <option class="bg-white text-gray-700">Option 2</option>
              </select>

              <AppIcon
                icon="mdi:chevron-down"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 w-5 h-5 pointer-events-none"
              />
            </div>
          </div>

          <!-- Your content here -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { getWorkHours, workHours } from "@/services/auth.attendance";
import { onMounted, ref } from "vue";
const activeTab = ref("general");
const work_hour = ref(null);
const time = ref({
  start_time: "",
  end_time: "",
});

const isLoading = ref(false);
const isEditing = ref(false);

const fetchWorkHours = async () => {
  const response = await getWorkHours();
  if (response?.status === 200) {
    work_hour.value = response.data.data;
  } else {
    console.log("Failed to fetch work hours");
  }
};
const addWorkHours = async () => {
  isLoading.value = true;

  // Send correct body
  const response = await workHours({
    start_time: time.value.start_time,
    end_time: time.value.end_time,
  });

  if (response?.status === 201) {
    time.value = { start_time: "", end_time: "" };
  } else {
    console.log("Failed to add work hours");
  }

  console.log(response);
  isLoading.value = false;
};

onMounted(() => {
  fetchWorkHours();
});
</script>
