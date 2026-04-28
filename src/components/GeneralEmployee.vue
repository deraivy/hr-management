<template>
  <div class="mb-6 border border-gray-200 p-4 rounded-lg">
    <div class="flex justify-between items-center">
      <h2 class="text-xl font-semibold text-gray-900">Personal Info</h2>
      <button
        @click="isEditing = !isEditing"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
      </button>
    </div>
    <div class="border-t border-gray-200 my-4"></div>
    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      <!-- Full Name -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Full Name</span>
        <span class="text-base font-semibold text-gray-800">{{
          displayFullName
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Full Name</span>
        <input
          v-model="form.fullname"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter full name"
        />
      </div>

      <!-- Gender -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Gender</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.gender || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Gender</span>
        <select
          v-model="form.gender"
          class="text-base border rounded-md p-2 w-full"
        >
          <option value="">Select gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </div>

      <!-- Date of Birth -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Date of Birth</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          formatDate(employee.general?.date_of_birth || "-")
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Date of Birth</span
        >
        <input
          v-model="form.date_of_birth"
          type="date"
          class="text-base border rounded-md p-2 w-full"
        />
      </div>

      <!-- Marital Status -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Marital Status</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.marital_status || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Marital Status</span
        >
        <select
          v-model="form.marital_status"
          class="text-base border rounded-md p-2 w-full"
        >
          <option value="">Select marital status</option>
          <option value="single">Single</option>
          <option value="married">Married</option>
          <option value="divorced">Divorced</option>
          <option value="widowed">Widowed</option>
        </select>
      </div>

      <!-- Nationality -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Nationality</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.nationality || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Nationality</span
        >
        <input
          v-model="form.nationality"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter nationality"
        />
      </div>

      <!-- Personal Tax ID -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Personal Tax ID</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.personal_tax_id || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Personal Tax ID</span
        >
        <input
          v-model="form.personal_tax_id"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter tax ID"
        />
      </div>

      <!-- Email -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Email</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.email || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Email</span>
        <input
          v-model="form.email"
          type="email"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter email"
        />
      </div>

      <!-- Social Insurance -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Social Insurance</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.social_insurance || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Social Insurance</span
        >
        <input
          v-model="form.social_insurance"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter social insurance"
        />
      </div>

      <!-- Health Insurance -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Health Insurance</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.health_care || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Health Insurance</span
        >
        <input
          v-model="form.health_care"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter health insurance"
        />
      </div>

      <!-- Phone Number -->
      <div
        v-if="!isEditing"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Phone Number</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.phone_number || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Phone Number</span
        >
        <input
          v-model="form.phone_number"
          type="tel"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter phone number"
        />
      </div>

      <!-- Buttons (only show when editing) -->
      <div
        v-if="isEditing"
        class="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4"
      >
        <button
          @click="cancel"
          class="px-4 py-2 rounded-md border hover:bg-gray-100 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          @click="save"
          :disabled="isSaving"
          class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center gap-2"
        >
          <span v-if="isSaving">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Address -->
  <div class="border border-b border-gray-200 p-4 rounded-lg mb-6">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-xl">Address</h2>
      <button
        @click="isEditingAddress = !isEditingAddress"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
      </button>
    </div>

    <div class="space-y-3">
      <!-- Primary Address -->
      <div
        v-if="!isEditingAddress"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Primary Address</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.address?.address || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Primary Address</span
        >
        <input
          v-model="formAddress.address"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter primary address"
        />
      </div>

      <!-- Country -->
      <div
        v-if="!isEditingAddress"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Country</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.address?.country || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Country</span>
        <input
          v-model="formAddress.country"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter country"
        />
      </div>

      <!-- State/Province -->
      <div
        v-if="!isEditingAddress"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >State/Province</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.address?.state || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >State/Province</span
        >
        <input
          v-model="formAddress.state"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter state or province"
        />
      </div>

      <!-- City -->
      <div
        v-if="!isEditingAddress"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">City</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.address?.city || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">City</span>
        <input
          v-model="formAddress.city"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter city"
        />
      </div>

      <!-- Post Code -->
      <div
        v-if="!isEditingAddress"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Post Code</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.address?.postcode || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Post Code</span>
        <input
          v-model="formAddress.postcode"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter post code"
        />
      </div>

      <!-- Buttons (only show when editing) -->
      <div
        v-if="isEditingAddress"
        class="col-span-2 flex justify-end gap-2 mt-4"
      >
        <button
          @click="cancelAddress"
          class="px-4 py-2 rounded-md border hover:bg-gray-100 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          @click="saveAddress"
          :disabled="isSavingAddress"
          class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center gap-2"
        >
          <span v-if="isSavingAddress">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Emergency Contact -->
  <div class="border border-gray-200 p-4 rounded-lg">
    <div class="flex items-center justify-between mb-4">
      <h2 class="font-semibold text-xl">Emergency Contact</h2>
      <button
        @click="isEditingEmergency = !isEditingEmergency"
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
      >
        <AppIcon icon="ei:pencil" class="w-6 h-6 text-gray-400" />
      </button>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4">
      <!-- First Name -->
      <div
        v-if="!isEditingEmergency"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >First Name</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.emergency_contact_first_name || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >First Name</span
        >
        <input
          v-model="formEmergency.first_name"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter first name"
        />
      </div>

      <!-- Last Name -->
      <div
        v-if="!isEditingEmergency"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Last Name</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.emergency_contact_last_name || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Last Name</span>
        <input
          v-model="formEmergency.last_name"
          type="text"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter last name"
        />
      </div>

      <!-- Relationship -->
      <div
        v-if="!isEditingEmergency"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Relationship</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.emergency_contact_relationship || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Relationship</span
        >
        <select
          v-model="formEmergency.relationship"
          class="text-base border rounded-md p-2 w-full"
        >
          <option value="">Select relationship</option>
          <option value="brother">Brother</option>
          <option value="child">Child</option>
          <option value="cousin">Cousin</option>
          <option value="daughter">Daughter</option>
          <option value="father">Father</option>
          <option value="friend">Friend</option>
          <option value="husband">Husband</option>
          <option value="mother">Mother</option>
          <option value="sister">Sister</option>
          <option value="son">Son</option>
          <option value="wife">Wife</option>
        </select>
      </div>

      <!-- Phone Number -->
      <div
        v-if="!isEditingEmergency"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Phone Number</span
        >
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.emergency_contact_phone_number || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32"
          >Phone Number</span
        >
        <input
          v-model="formEmergency.phone_number"
          type="tel"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter phone number"
        />
      </div>

      <!-- Email -->
      <div
        v-if="!isEditingEmergency"
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Email</span>
        <span class="text-base font-semibold text-gray-800">{{
          employee.general?.emergency_contact_email || "-"
        }}</span>
      </div>
      <div
        v-else
        class="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6"
      >
        <span class="text-sm font-medium text-gray-500 sm:w-32">Email</span>
        <input
          v-model="formEmergency.email"
          type="email"
          class="text-base border rounded-md p-2 w-full"
          placeholder="Enter email"
        />
      </div>

      <!-- Buttons (only show when editing) -->
      <div
        v-if="isEditingEmergency"
        class="col-span-1 md:col-span-2 flex justify-end gap-2 mt-4"
      >
        <button
          @click="cancelEmergency"
          class="px-4 py-2 rounded-md border hover:bg-gray-100 text-sm sm:text-base"
        >
          Cancel
        </button>
        <button
          @click="saveEmergency"
          :disabled="isSavingEmergency"
          class="px-4 py-2 rounded-md bg-green-600 text-white hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base flex items-center gap-2"
        >
          <span v-if="isSavingEmergency">Saving...</span>
          <span v-else>Save</span>
        </button>
      </div>
    </div>
  </div>

  <!-- Toast Notification -->
  <div v-if="showToast" class="fixed bottom-4 right-4 z-50">
    <div
      :class="[
        'rounded-lg shadow-lg p-4 max-w-sm transform transition-all duration-300',
        toastType === 'success'
          ? 'bg-green-50 border border-green-200'
          : toastType === 'error'
          ? 'bg-red-50 border border-red-200'
          : 'bg-blue-50 border border-blue-200',
      ]"
    >
      <div class="flex items-center">
        <div
          :class="[
            'flex-shrink-0 mr-3',
            toastType === 'success'
              ? 'text-green-400'
              : toastType === 'error'
              ? 'text-red-400'
              : 'text-blue-400',
          ]"
        >
          <AppIcon
            v-if="toastType === 'success'"
            icon="ei:check"
            class="w-6 h-6"
          />
          <AppIcon
            v-if="toastType === 'error'"
            icon="ei:close"
            class="w-6 h-6"
          />
          <AppIcon v-if="toastType === 'info'" icon="ei:info" class="w-6 h-6" />
        </div>
        <div class="flex-1">
          <p
            :class="[
              'text-sm font-medium',
              toastType === 'success'
                ? 'text-green-800'
                : toastType === 'error'
                ? 'text-red-800'
                : 'text-blue-800',
            ]"
          >
            {{ toastMessage }}
          </p>
        </div>
        <button
          @click="showToast = false"
          class="ml-4 text-gray-400 hover:text-gray-600"
        >
          <AppIcon icon="ei:close" class="w-4 h-4" />
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits, watch, computed } from "vue";

const props = defineProps({
  employee: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["update"]);

// Toast notification
const showToast = ref(false);
const toastMessage = ref("");
const toastType = ref("success"); // 'success', 'error', 'info'

// Show toast function
const showToastMessage = (message, type = "success") => {
  toastMessage.value = message;
  toastType.value = type;
  showToast.value = true;

  // Auto hide after 3 seconds
  setTimeout(() => {
    showToast.value = false;
  }, 3000);
};

const formatDate = (dateString) => {
  if (!dateString) return "-";
  const [dateOnly] = dateString.split("T");
  const date = new Date(dateOnly);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

// Computed property for full name display
const displayFullName = computed(() => {
  return (
    props.employee.general?.fullname || props.employee.general?.full_name || "-"
  );
});

// Personal Info
const isEditing = ref(false);
const isSaving = ref(false);
const form = ref({
  fullname: "",
  gender: "",
  email: "",
  nationality: "",
  phone_number: "",
  health_care: "",
  marital_status: "",
  personal_tax_id: "",
  date_of_birth: "",
  social_insurance: "",
});

// Initialize form from props
const initializeForm = () => {
  form.value = {
    fullname:
      props.employee.general?.fullname ||
      props.employee.general?.full_name ||
      "",
    gender: props.employee.general?.gender || "",
    email: props.employee.general?.email || "",
    nationality: props.employee.general?.nationality || "",
    phone_number: props.employee.general?.phone_number || "",
    health_care: props.employee.general?.health_care || "",
    marital_status: props.employee.general?.marital_status || "",
    personal_tax_id: props.employee.general?.personal_tax_id || "",
    date_of_birth: props.employee.general?.date_of_birth || "",
    social_insurance: props.employee.general?.social_insurance || "",
  };
};

// Initialize on component mount
initializeForm();

watch(
  () => props.employee?.general,
  (newGeneral) => {
    if (newGeneral) {
      initializeForm();
    }
  },
  { deep: true }
);

const save = async () => {
  try {
    isSaving.value = true;

    const cleanData = {};

    // Map form fields to API fields
    if (form.value.fullname) cleanData.full_name = form.value.fullname;
    if (form.value.gender) cleanData.gender = form.value.gender;
    if (form.value.email) cleanData.email = form.value.email;
    if (form.value.nationality) cleanData.nationality = form.value.nationality;
    if (form.value.phone_number)
      cleanData.phone_number = form.value.phone_number;
    if (form.value.health_care) cleanData.health_care = form.value.health_care;
    if (form.value.marital_status)
      cleanData.marital_status = form.value.marital_status;
    if (form.value.personal_tax_id)
      cleanData.personal_tax_id = form.value.personal_tax_id;
    if (form.value.date_of_birth)
      cleanData.date_of_birth = form.value.date_of_birth;
    if (form.value.social_insurance)
      cleanData.social_insurance = form.value.social_insurance;

    console.log("🔄 Saving personal info:", cleanData);

    // Emit the update event
    emit("update", {
      edit_type: "general",
      data: cleanData,
    });

    // Show success toast
    showToastMessage("Personal information updated successfully!", "success");

    isEditing.value = false;
  } catch (error) {
    console.error("Error saving personal info:", error);
    showToastMessage("Failed to update personal information", "error");
  } finally {
    isSaving.value = false;
  }
};

const cancel = () => {
  initializeForm();
  isEditing.value = false;
};

// Address
const isEditingAddress = ref(false);
const isSavingAddress = ref(false);
const formAddress = ref({
  address: props.employee.address?.address || "",
  country: props.employee.address?.country || "",
  state: props.employee.address?.state || "",
  city: props.employee.address?.city || "",
  postcode: props.employee.address?.postcode || "",
});

watch(
  () => props.employee.address,
  (newAddress) => {
    formAddress.value = {
      address: newAddress?.address || "",
      country: newAddress?.country || "",
      state: newAddress?.state || "",
      city: newAddress?.city || "",
      postcode: newAddress?.postcode || "",
    };
  },
  { deep: true, immediate: true }
);

const saveAddress = async () => {
  try {
    isSavingAddress.value = true;

    const cleanData = {};

    // Add address fields
    if (formAddress.value.address)
      cleanData.address = formAddress.value.address;
    if (formAddress.value.country)
      cleanData.country = formAddress.value.country;
    if (formAddress.value.state) cleanData.state = formAddress.value.state;
    if (formAddress.value.city) cleanData.city = formAddress.value.city;
    if (formAddress.value.postcode)
      cleanData.postcode = formAddress.value.postcode;

    console.log("Saving address:", cleanData);

    emit("update", {
      edit_type: "general",
      data: cleanData,
    });

    // Show success toast
    showToastMessage("Address updated successfully!", "success");

    isEditingAddress.value = false;
  } catch (error) {
    console.error("Error saving address:", error);
    showToastMessage("Failed to update address", "error");
  } finally {
    isSavingAddress.value = false;
  }
};

const cancelAddress = () => {
  formAddress.value = {
    address: props.employee.address?.address || "",
    country: props.employee.address?.country || "",
    state: props.employee.address?.state || "",
    city: props.employee.address?.city || "",
    postcode: props.employee.address?.postcode || "",
  };
  isEditingAddress.value = false;
};

// Emergency Contact
const isEditingEmergency = ref(false);
const isSavingEmergency = ref(false);
const formEmergency = ref({
  first_name: props.employee.general?.emergency_contact_first_name || "",
  last_name: props.employee.general?.emergency_contact_last_name || "",
  relationship: props.employee.general?.emergency_contact_relationship || "",
  phone_number: props.employee.general?.emergency_contact_phone_number || "",
  email: props.employee.general?.emergency_contact_email || "",
});

watch(
  () => props.employee.general,
  (newGeneral) => {
    formEmergency.value = {
      first_name: newGeneral?.emergency_contact_first_name || "",
      last_name: newGeneral?.emergency_contact_last_name || "",
      relationship: newGeneral?.emergency_contact_relationship || "",
      phone_number: newGeneral?.emergency_contact_phone_number || "",
      email: newGeneral?.emergency_contact_email || "",
    };
  },
  { deep: true, immediate: true }
);

const saveEmergency = async () => {
  try {
    isSavingEmergency.value = true;

    const cleanData = {};

    // Map fields directly
    if (formEmergency.value.first_name) {
      cleanData.emergency_contact_first_name = formEmergency.value.first_name;
    }
    if (formEmergency.value.last_name) {
      cleanData.emergency_contact_last_name = formEmergency.value.last_name;
    }
    if (formEmergency.value.relationship) {
      cleanData.emergency_contact_relationship =
        formEmergency.value.relationship;
    }
    if (formEmergency.value.phone_number) {
      cleanData.emergency_contact_phone_number =
        formEmergency.value.phone_number;
    }
    if (formEmergency.value.email) {
      cleanData.emergency_contact_email = formEmergency.value.email;
    }

    console.log("🔄 Saving Emergency Contact:", cleanData);

    // Send the update
    emit("update", {
      edit_type: "general",
      data: cleanData,
    });

    // Show success toast
    showToastMessage("Emergency contact updated successfully!", "success");

    isEditingEmergency.value = false;
  } catch (error) {
    console.error("Error saving emergency contact:", error);
    showToastMessage("Failed to update emergency contact", "error");
  } finally {
    isSavingEmergency.value = false;
  }
};

const cancelEmergency = () => {
  formEmergency.value = {
    first_name: props.employee.general?.emergency_contact_first_name || "",
    last_name: props.employee.general?.emergency_contact_last_name || "",
    relationship: props.employee.general?.emergency_contact_relationship || "",
    phone_number: props.employee.general?.emergency_contact_phone_number || "",
    email: props.employee.general?.emergency_contact_email || "",
  };
  isEditingEmergency.value = false;
};
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .grid-cols-1 {
    grid-template-columns: 1fr;
  }

  .gap-4 {
    gap: 1rem;
  }
}

/* Smooth transitions */
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
</style>
