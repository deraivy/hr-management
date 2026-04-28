<template>
  <div class="w-full md:container mx-auto p-5">
    <h2 class="text-2xl font-semibold mb-4">Offices</h2>
    <div class="border border-b w-full border-gray-100" />

    <div class="mt-6 border border-gray-200 rounded-md px-4 py-2">
      <div class="flex justify-between items-center py-4">
        <h2>
          Uniplex Studio VI
          <span class="bg-emerald-500 rounded-md text-white p-1 text-sm"
            >HQ</span
          >
        </h2>

        <div @click="isEditing">
          <AppIcon icon="mage:dots" class="w-5 h-5" />
        </div>
      </div>

      <div class="border border-b w-full border-gray-100" />

      <div class="my-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="font-medium text-gray-500 w-52"
            >Number of employees</span
          >
          <span class="text-base font-semibold text-gray-800">50</span>
        </div>
        <div v-else class="flex items-center gap-6">
          <span class="font-medium text-gray-500 w-52"
            >Number of employees</span
          >
          <input
            type="number"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter number of employees"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Time Zone</span>
          <span
            >GMT<AppIcon icon="mdi:plus" class="w-4 h-4" />07:00 (UTC+07:00)
            Indochina Time</span
          >
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Time Zone</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Contact number</span>
          <span>+234 (0) 123 4567</span>
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Contact number</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Contact email</span>
          <span>uniplex@gmail.com</span>
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Contact email</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>
    </div>

    <div class="mt-6 border border-gray-200 rounded-md px-4 py-2">
      <div class="flex justify-between items-center py-4">
        <h2>
          Uniplex Studio VI
          <span class="bg-emerald-500 rounded-md text-white p-1 text-sm"
            >HQ</span
          >
        </h2>

        <div @click="isEditing">
          <AppIcon icon="mage:dots" class="w-5 h-5" />
        </div>
      </div>

      <div class="border border-b w-full border-gray-100" />

      <div class="my-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="font-medium text-gray-500 w-52"
            >Number of employees</span
          >
          <span class="text-base font-semibold text-gray-800">50</span>
        </div>
        <div v-else class="flex items-center gap-6">
          <span class="font-medium text-gray-500 w-52"
            >Number of employees</span
          >
          <input
            type="number"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter number of employees"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Time Zone</span>
          <span
            >GMT<AppIcon icon="mdi:plus" class="w-4 h-4" />07:00 (UTC+07:00)
            Indochina Time</span
          >
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Time Zone</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Contact number</span>
          <span>+234 (0) 123 4567</span>
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Contact number</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>

      <div class="mb-4">
        <div v-if="!isEditing" class="flex items-center gap-6">
          <span class="w-52 font-medium text-gray-500">Contact email</span>
          <span>uniplex@gmail.com</span>
        </div>
        <div v-else>
          <span class="font-medium text-gray-500 w-52">Contact email</span>
          <input
            type="text"
            class="text-base border rounded-md p-2 w-full"
            placeholder="Enter time zone"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OfficesView",
};
</script>

<style lang="scss" scoped></style>
