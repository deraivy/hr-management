<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mb-6 bg-white rounded-lg px-6">
    <!-- Job Info Section -->
    <div
      class="mb-6 border border-gray-200 px-6 rounded-lg py-5 bg-white space-y-4"
    >
      <!-- Header -->
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-800">
          Employment Information
        </h2>
        <button
          @click="isEditing = !isEditing"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <div class="border-b border-gray-200 my-4"></div>

      <!-- Employee Status -->
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-500 w-32"
          >Employee Status</span
        >
        <div v-if="!isEditing" class="flex-1">
          <span
            :class="[
              'text-base font-semibold',
              employee.payroll?.employment_status === 'Active'
                ? 'text-green-600'
                : 'text-gray-800',
            ]"
          >
            {{ employee.payroll?.employment_status || "-" }}
          </span>
        </div>
        <div v-else class="flex-1">
          <select
            v-model="form.employment_status"
            class="border rounded-md p-2 w-full border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            <option disabled value="">Select Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
            <option value="On Boarding">On Boarding</option>
            <option value="On Leave">On Leave</option>
            <option value="Suspended">Suspended</option>
            <option value="Terminated">Terminated</option>
            <option value="Probation">Probation</option>
            <option value="Resigned">Resigned</option>
          </select>
        </div>
      </div>

      <!-- Job Title -->
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-500 w-32">Job Title</span>
        <div v-if="!isEditing" class="flex-1">
          <span class="text-base font-semibold text-gray-800">
            {{ employee.payroll?.job_title || "-" }}
          </span>
        </div>
        <div v-else class="flex-1">
          <input
            type="text"
            v-model="form.job_title"
            placeholder="Enter Job Title"
            class="border rounded-md p-2 w-full border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
          />
        </div>
      </div>

      <!-- Employment Type -->
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-500 w-32"
          >Employment Type</span
        >
        <div v-if="!isEditing" class="flex-1">
          <span class="text-base font-semibold text-gray-800">
            {{ employee.payroll?.employment_type || "-" }}
          </span>
        </div>
        <div v-else class="flex-1">
          <select
            v-model="form.employment_type"
            class="border rounded-md p-2 w-full border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            <option disabled value="">Select Employment Type</option>
            <option value="Full Time">Full Time</option>
            <option value="Part Time">Part Time</option>
            <option value="Contract">Contract</option>
            <option value="Freelance">Freelance</option>
            <option value="Intern">Intern</option>
            <option value="Volunteer">Volunteer</option>
          </select>
        </div>
      </div>

      <!-- Work Mode -->
      <div class="flex items-center gap-4">
        <span class="text-sm font-medium text-gray-500 w-32">Work Mode</span>
        <div v-if="!isEditing" class="flex-1">
          <span class="text-base font-semibold text-gray-800 capitalize">
            {{ employee.payroll?.work_mode || "-" }}
          </span>
        </div>
        <div v-else class="flex-1">
          <select
            v-model="form.work_mode"
            class="border rounded-md p-2 w-full border-gray-300 focus:ring-2 focus:ring-green-300 focus:outline-none"
          >
            <option disabled value="">Select Work Mode</option>
            <option value="Remote">Remote</option>
            <option value="Onsite">Onsite</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>
      </div>

      <!-- Buttons -->
      <div v-if="isEditing" class="flex justify-end gap-2 pt-4">
        <button
          @click="cancel"
          class="px-4 py-2 rounded-md border hover:bg-gray-100 text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="save"
          class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 transition-colors"
        >
          Save
        </button>
      </div>
    </div>

    <!-- Compensation Section -->
    <div class="space-y-4">
      <div class="flex items-center justify-between">
        <h2 class="font-semibold text-xl text-gray-800">
          Compensation Information
        </h2>
        <button
          @click="toggleCompensationEdit"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        >
          <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
        </button>
      </div>

      <!-- Total Compensation -->
      <div
        class="bg-gradient-to-r from-blue-50 to-white border border-gray-200 hover:bg-blue-100 transition-colors duration-200 py-3 px-5 rounded-lg flex justify-between items-center"
      >
        <h2 class="text-lg font-semibold text-gray-900">Total Compensation</h2>
        <p class="text-lg font-bold">
          ₦{{
            totalCompensation.toLocaleString(undefined, {
              minimumFractionDigits: 2,
            })
          }}
        </p>
      </div>

      <!-- Reusable Compensation Rows -->
      <div
        v-for="(label, key) in compensationLabels"
        :key="key"
        class="border border-gray-200 hover:bg-gray-50 transition-colors duration-200 py-3 px-5 rounded-lg flex justify-between items-center"
      >
        <h2 class="text-lg font-semibold text-gray-900">{{ label }}</h2>
        <div v-if="!isEditingCompensation">
          ₦{{ formatCurrency(getCompensationAmount(label)) }}
        </div>
        <div v-else>
          <input
            type="number"
            v-model.number="compensationEdits[key]"
            class="text-base font-semibold text-gray-600 bg-transparent border border-gray-300 rounded-md p-2 text-right w-32 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>
      </div>

      <!-- Compensation Action Buttons -->
      <div v-if="isEditingCompensation" class="flex justify-end gap-2 pt-4">
        <button
          @click="cancelCompensation"
          class="px-4 py-2 rounded-md border hover:bg-gray-100 text-gray-700 transition-colors"
        >
          Cancel
        </button>
        <button
          @click="saveAllCompensation"
          :disabled="loading"
          class="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
        >
          {{ loading ? "Saving..." : "Save All Compensation" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";
import { addCompensation } from "@/services/auth.employees";
import { useRoute } from "vue-router";

const props = defineProps({
  employee: { type: Object, required: true },
});

const route = useRoute();
const employeeId = ref(route.params.id);
const emit = defineEmits(["update"]);

const isEditing = ref(false);
const isEditingCompensation = ref(false);
const loading = ref(false);

const form = ref({
  employment_status: props.employee.payroll?.employment_status || "",
  job_title: props.employee.payroll?.job_title || "",
  employment_type: props.employee.payroll?.employment_type || "",
  work_mode: props.employee.payroll?.work_mode || "",
});

// All editable compensation types
const compensationLabels = {
  salary: "Salary",
  allowance: "Allowance",
  one_off: "One-Off",
  deduction: "Deduction",
};

const compensationEdits = ref({
  salary: 0,
  allowance: 0,
  one_off: 0,
  deduction: 0,
});

// Helper: Get compensation amount by type
const getCompensationAmount = (type) => {
  if (!props.employee.payroll?.compensation) return 0;
  const comp = props.employee.payroll.compensation.find(
    (c) => c.compensation_type?.toLowerCase() === type.toLowerCase()
  );
  return comp ? comp.amount : 0;
};

// Initialize edits
const initializeCompensationEdits = () => {
  for (const key in compensationLabels) {
    compensationEdits.value[key] = getCompensationAmount(
      compensationLabels[key]
    );
  }
};

// Format currency
const formatCurrency = (amount) =>
  parseFloat(amount || 0).toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const totalCompensation = computed(() => {
  const s = parseFloat(getCompensationAmount("Salary")) || 0;
  const a = parseFloat(getCompensationAmount("Allowance")) || 0;
  const o = parseFloat(getCompensationAmount("One-Off")) || 0;
  const d = parseFloat(getCompensationAmount("Deduction")) || 0;
  return s + a + o - d;
});

watch(
  () => props.employee,
  (newVal) => {
    if (newVal) initializeCompensationEdits();
  },
  { deep: true, immediate: true }
);

const toggleCompensationEdit = () => {
  isEditingCompensation.value = !isEditingCompensation.value;
  if (isEditingCompensation.value) initializeCompensationEdits();
};

const saveAllCompensation = async () => {
  loading.value = true;
  try {
    const userId = employeeId.value;
    if (!userId) throw new Error("User ID not found");

    const compensations = Object.entries(compensationLabels).map(
      ([key, label]) => ({
        compensation_type: label,
        amount: Number(compensationEdits.value[key]) || 0,
      })
    );

    const payload = { user_id: userId, compensations };
    console.log("🚀 Sending payload:", payload);

    const response = await addCompensation(payload);
    console.log("✅ Compensation API response:", response);

    if (response) {
      emit("update", {
        edit_type: "payroll",
        data: {
          ...props.employee.payroll,
          compensation: compensations,
        },
      });
      isEditingCompensation.value = false;
      alert("Compensation updated successfully!");
    }
  } catch (err) {
    console.error("💥 Error saving compensation:", err);
    alert(`Error: ${err.message}`);
  } finally {
    loading.value = false;
  }
};

const cancelCompensation = () => {
  initializeCompensationEdits();
  isEditingCompensation.value = false;
};

const save = () => {
  const payrollData = {
    employment_status: form.value.employment_status,
    job_title: form.value.job_title,
    employment_type: form.value.employment_type,
    work_mode: form.value.work_mode,
    compensation: props.employee.payroll?.compensation || [],
  };
  emit("update", { edit_type: "payroll", data: payrollData });
  isEditing.value = false;
};

const cancel = () => {
  form.value = {
    employment_status: props.employee.payroll?.employment_status || "",
    job_title: props.employee.payroll?.job_title || "",
    employment_type: props.employee.payroll?.employment_type || "",
    work_mode: props.employee.payroll?.work_mode || "",
  };
  initializeCompensationEdits();
  isEditing.value = false;
  isEditingCompensation.value = false;
};
</script>
