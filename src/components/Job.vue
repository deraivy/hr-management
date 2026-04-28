<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mb-6 border border-gray-200 p-4 rounded-lg">
    <div class="flex items-center justify-between">
      <h2 class="font-semibold text-xl">Employment Information</h2>
      <button
        @click="isEditing = !isEditing"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
      </button>
    </div>
    <div class="border-b border-gray-200 my-4"></div>

    <!-- Employee ID -->
    <div v-if="!isEditing" class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Employee ID</span>
      <span class="text-base font-semibold text-gray-800">
        {{ employee.job?.employee_id || "-" }}
      </span>
    </div>
    <div v-else class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Employee ID</span>
      <input
        v-model="form.employee_id"
        type="number"
        class="text-base border rounded-md p-2 w-full"
        placeholder="Enter Employee ID"
      />
    </div>

    <!-- Service Year -->
    <div v-if="!isEditing" class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Service Year</span>
      <span class="text-base font-semibold text-gray-800">
        {{ employee.job?.service_year || "-" }}
      </span>
    </div>
    <div v-else class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Service Year</span>
      <input
        v-model="form.service_year"
        type="text"
        class="text-base border rounded-md p-2 w-full"
        placeholder="Enter Service Year"
      />
    </div>

    <!-- Join Date -->
    <div v-if="!isEditing" class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Join Date</span>
      <span class="text-base font-semibold text-gray-800">
        {{ employee.job?.join_date || "-" }}
      </span>
    </div>
    <div v-else class="flex items-center gap-6 mb-2">
      <span class="text-sm font-medium text-gray-500 w-32">Join Date</span>
      <input
        v-model="form.join_date"
        type="date"
        class="text-base border rounded-md p-2 w-full"
        placeholder="Select Join Date"
      />
    </div>

    <!-- Buttons -->
    <div v-if="isEditing" class="flex justify-end gap-2 mt-4">
      <button
        @click="cancel"
        class="px-4 py-2 rounded-md border hover:bg-gray-100"
      >
        Cancel
      </button>
      <button
        @click="save"
        class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch } from "vue";

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["update"]);

const isEditing = ref(false);
const form = ref({
  employee_id: props.employee.job?.employee_id || "",
  service_year: props.employee.job?.service_year || "",
  join_date: props.employee.job?.join_date || "",
});

watch(
  () => props.employee.job,
  (newJob) => {
    form.value = {
      employee_id: newJob?.employee_id || "",
      service_year: newJob?.service_year || "",
      join_date: newJob?.join_date || "",
    };
  },
  { deep: true, immediate: true }
);

const save = () => {
  const cleanData = {};

  if (form.value.employee_id) cleanData.employee_id = form.value.employee_id;
  if (form.value.service_year) cleanData.service_year = form.value.service_year;
  if (form.value.join_date) cleanData.join_date = form.value.join_date;

  console.log("🟢 Saving Employment Info:", cleanData);

  emit("update", {
    edit_type: "job",
    data: cleanData,
  });

  isEditing.value = false;
};

const cancel = () => {
  form.value = {
    employee_id: props.employee.job?.employee_id || "",
    service_year: props.employee.job?.service_year || "",
    join_date: props.employee.job?.join_date || "",
  };
  isEditing.value = false;
};
</script>
