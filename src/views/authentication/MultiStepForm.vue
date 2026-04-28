<template>
  <div>
    <header
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-4"
    >
      <div class="flex gap-1 items-center">
        <h2 class="text-green-800 font-bold text-4xl">H</h2>
        <h2 class="text-[#121828] font-semibold text-xl">HRDashboard</h2>
      </div>
    </header>

    <div class="border-b border-gray-200"></div>

    <section
      class="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 2xl:px-16 py-8"
    >
      <div
        class="flex flex-col md:flex-row items-center justify-center min-h-screen gap-12"
      >
        <div class="flex flex-col flex-1 order-2 md:order-1">
          <div class="flex items-center gap-2 mb-4">
            <div
              v-for="step in 4"
              :key="step"
              :class="[
                'rounded-md w-4 h-4',
                currentStep >= step ? 'bg-[#27a178]' : 'bg-gray-200',
              ]"
            ></div>
          </div>
          <p class="text-gray-400 uppercase text-sm tracking-wider">
            STEP {{ currentStep }} OF 4
          </p>
          <h1 class="text-3xl font-bold mt-12 text-[#121828]">
            {{ stepTitles[currentStep - 1] }}
          </h1>
          <p class="text-gray-400 py-5">
            {{ stepDescriptions[currentStep - 1] }}
          </p>

          <div class="flex gap-2">
            <div
              v-if="currentStep === 1"
              type="button"
              class="mt-6 w-32 text-center text-[#121828] border border-[#121828] py-3 px-8 rounded-md hover:bg-gray-100"
              @click="handleCancel"
            >
              Cancel
            </div>
            <div
              v-if="currentStep > 1"
              type="button"
              class="mt-6 w-32 text-center text-[#121828] border border-[#121828] py-3 px-8 rounded-md hover:bg-gray-100"
              @click="previousStep"
            >
              Back
            </div>
            <div
              type="button"
              class="mt-6 w-32 text-center bg-[#121828] text-white py-3 px-8 rounded-md hover:bg-[#1a2536] flex items-center justify-center"
              @click="nextStep"
              :disabled="isLoading"
            >
              <span v-if="!isLoading">
                {{ currentStep === 4 ? "Submit" : "Continue" }}
              </span>
              <span v-else class="loader"></span>
            </div>
          </div>
        </div>

        <div
          class="bg-gray-200 w-full p-4 rounded-md flex-1 order-1 md:order-2"
        >
          <div class="bg-white rounded-md p-4 h-[600px] sm:h-[700px]">
            <!-- Step 1 -->
            <div v-if="currentStep === 1">
              <p class="mb-4 text-lg font-bold text-[#121828]">
                Type the name of your company
              </p>
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Company Name <span class="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  v-model="formData.name"
                  class="mt-2 w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 outline-none focus:ring focus:ring-[#28a076] focus:border-[#28a076]"
                  placeholder="Speedpay"
                />
                <p v-if="errors.name" class="text-red-500 text-sm mt-1">
                  {{ errors.name }}
                </p>
              </div>
              <div class="mt-4">
                <label
                  for="company-domain-name"
                  class="block text-sm font-medium text-gray-700"
                >
                  Company Domain Name <span class="text-red-500">*</span>
                </label>
                <div
                  class="flex items-center mt-2 w-full rounded-md border border-gray-300 overflow-hidden focus-within:ring-2 focus-within:ring-[#28a076]"
                >
                  <input
                    type="text"
                    id="company-domain-name"
                    v-model="formData.domain"
                    class="flex-1 px-3 py-2 text-sm text-gray-900 placeholder-gray-400 focus:outline-none"
                    placeholder="speedpay"
                  />
                  <span
                    class="px-3 py-2 text-sm text-gray-500 bg-gray-100 border-l border-gray-300"
                  >
                    .hrline.com
                  </span>
                </div>
                <p v-if="errors.domain" class="text-red-500 text-sm mt-1">
                  {{ errors.domain }}
                </p>
              </div>
              <p
                class="mt-4 mb-2 text-sm text-gray-400 flex items-center gap-1"
              >
                <span
                  class="inline-flex items-center justify-center w-4 h-4 rounded-full border border-gray-300 text-xs font-semibold"
                  >i</span
                >
                We will create a unique company URL to log into HRDashboard
              </p>
              <div class="mt-6">
                <h2 class="text-lg font-bold my-4 text-[#121828]">
                  What is the size of your company
                </h2>
                <div
                  class="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                >
                  <label
                    v-for="size in sizes"
                    :key="size"
                    :for="`size-${size}`"
                    class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
                  >
                    <span class="text-black text-sm">{{ size }}</span>
                    <input
                      type="radio"
                      :id="`size-${size}`"
                      v-model="formData.size"
                      :value="size"
                      name="company-size"
                      class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                    />
                  </label>
                </div>
              </div>
            </div>

            <!-- Step 2 -->
            <div v-if="currentStep === 2">
              <p class="mb-4 text-sm text-gray-500">
                Your workspace domain name
              </p>
              <h2 class="mb-4 text-2xl font-bold text-[#121828]">
                {{ derivedWorkspaceDomain }}
              </h2>
              <div class="border-b border-gray-200 my-6"></div>
              <h2 class="font-bold text-[#121828] text-lg mb-6">
                What is your industry
              </h2>

              <!-- Loading State -->
              <div
                v-if="isIndustryLoading"
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <div
                  v-for="n in 6"
                  :key="n"
                  class="flex justify-between items-center px-4 py-4 bg-gray-200 rounded-lg animate-pulse"
                >
                  <div class="w-2/3 h-4 bg-gray-300 rounded"></div>
                  <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </div>

              <!-- Industry List -->
              <div
                v-else
                class="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                <label
                  v-for="item in industry"
                  :key="item.id"
                  :for="`industry-${item.id}`"
                  class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
                >
                  <span class="text-black text-sm">{{ item.name }}</span>
                  <input
                    type="radio"
                    :id="`industry-${item.id}`"
                    v-model="formData.industry_id"
                    :value="item.id"
                    name="company-industry"
                    class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                  />
                </label>
              </div>

              <p v-if="errors.industry_id" class="text-red-500 text-sm mt-2">
                {{ errors.industry_id }}
              </p>
            </div>

            <!-- Step 3 -->
            <div v-if="currentStep === 3">
              <p class="mb-4 text-sm text-gray-500">
                Your workspace domain name
              </p>
              <h2 class="mb-4 text-2xl font-bold text-[#121828]">
                {{ derivedWorkspaceDomain }}
              </h2>
              <div class="border-b border-gray-200 my-6"></div>

              <h2 class="font-bold text-[#121828] mb-4">Choose Role</h2>
              <!-- Loading State -->
              <div
                v-if="isRoleLoading"
                class="grid grid-cols-2 lg:grid-cols-3 gap-6"
              >
                <div
                  v-for="n in 6"
                  :key="n"
                  class="flex justify-between items-center px-4 py-4 bg-gray-200 rounded-lg animate-pulse"
                >
                  <div class="w-2/3 h-4 bg-gray-300 rounded"></div>
                  <div class="w-4 h-4 bg-gray-300 rounded-full"></div>
                </div>
              </div>
              <!-- Role List -->
              <div v-else class="grid grid-cols-2 lg:grid-cols-3 gap-6">
                <label
                  v-for="role in workerRole"
                  :key="role.id"
                  :for="`role-${role.id}`"
                  class="relative flex items-center px-3 py-3 gap-3 rounded-lg font-medium text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none"
                >
                  <span class="text-black text-sm">{{ role.name }}</span>
                  <input
                    type="radio"
                    :id="`role-${role.id}`"
                    v-model="formData.companyrole"
                    :value="role.id"
                    name="company-role"
                    class="absolute right-3 w-4 h-4 border-gray-300 accent-[#28a076] focus:ring-[#28a076]"
                  />
                </label>
              </div>
              <p v-if="errors.roleError" class="text-red-500 text-sm mt-2">
                {{ errors.roleError }}
              </p>

              <!-- <div class="mt-6">
                <label
                  for="role"
                  class="block text-sm font-medium text-gray-700"
                >
                  Input Your Role (if Other is selected)
                </label>
                <input
                  type="text"
                  id="role"
                  v-model="formData.role"
                  :disabled="
                    !otherRoleId || formData.companyrole !== otherRoleId
                  "
                  class="mt-2 w-full border border-gray-300 rounded-md p-2 placeholder-gray-400 outline-none focus:ring focus:ring-[#28a076] focus:border-[#28a076] disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="e.g., Designer"
                />
              </div> -->
            </div>

            <!-- Step 4 -->
            <div v-if="currentStep === 4">
              <p class="text-gray-500 mb-4">Your domain name</p>
              <h2 class="mb-4 text-2xl font-bold text-[#121828]">
                {{ derivedWorkspaceDomain }}
              </h2>
              <div class="border-b border-gray-200 my-6"></div>

              <p class="mb-4 font-semibold text-2xl">
                Choose according to your needs
              </p>
              <!-- Debug Output -->
              <p
                v-if="reason.length === 0 && !isReasonLoading"
                class="text-red-500"
              >
                No reasons loaded. Check console for API response.
              </p>
              <!-- Loading State -->
              <div v-if="isReasonLoading" class="grid grid-cols-1 gap-2">
                <div
                  v-for="n in 4"
                  :key="n"
                  class="flex flex-col px-3 py-3 bg-gray-200 rounded-lg animate-pulse"
                >
                  <div class="w-1/2 h-4 bg-gray-300 rounded mb-2"></div>
                  <div class="w-3/4 h-3 bg-gray-300 rounded"></div>
                </div>
              </div>
              <!-- Reason List -->
              <div v-else>
                <label
                  v-for="item in reason"
                  :key="item.id"
                  :for="`choose-${item.id}`"
                  class="relative flex flex-col px-3 py-3 gap-2 rounded-lg font-semibold text-gray-700 border hover:border-2 hover:border-[#28a076] has-[:checked]:border-[#28a076] has-[:checked]:ring-1 has-[:checked]:ring-[#28a076] cursor-pointer select-none mb-2"
                >
                  <div class="flex items-center gap-3">
                    <span class="text-black text-sm font-semibold">{{
                      item.name
                    }}</span>
                    <input
                      type="radio"
                      :id="`choose-${item.id}`"
                      v-model="formData.companychoose"
                      :value="item.id"
                    />
                  </div>
                  <span class="text-gray-500 text-xs">{{
                    item.description
                  }}</span>
                </label>
              </div>
              <p v-if="errors.companychoose" class="text-red-500 text-sm mt-2">
                {{ errors.companychoose }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  industries,
  reasons,
  roles,
  stepOne,
  stepTwo,
  stepThree,
  stepFour,
} from "@/services/auth.service";
import { useToast } from "vue-toastification";

// Router and toast setup
const router = useRouter();
const toast = useToast();

// Reactive state
const currentStep = ref(1);
const isLoading = ref(false);
const isIndustryLoading = ref(false);
const isRoleLoading = ref(false);
const isReasonLoading = ref(false);
const industry = ref([]);
const workerRole = ref([]);
const reason = ref([]);

// Form data
const formData = reactive({
  name: "",
  domain: "",
  size: "",
  // domain: "",
  industry_id: "",
  companychoose: "",
  companyrole: "",
  role: "",
});

const errors = reactive({
  name: "",
  domain: "",
  size: "",
  industry_id: "",
  roleError: "",
  companychoose: "",
});

// Company sizes
const sizes = ["1-10", "11-50", "51-100", "101-200", "201-500", "500+"];

// Fetch industries
const fetchIndustries = async () => {
  isIndustryLoading.value = true;
  const response = await industries();
  if (response && response.data.data) {
    industry.value = response.data.data;
    console.log("Industries fetched:", response.data.data);
  } else {
    // toast.error("Failed to fetch industries. Please try again.");
  }
  isIndustryLoading.value = false;
};

// Fetch Roles
const fetchRoles = async () => {
  isRoleLoading.value = true;
  const response = await roles();
  if (response && response.data.data) {
    workerRole.value = response.data.data;
  } else {
    // toast.error("Failed to fetch roles. Please try again.");
  }
  isRoleLoading.value = false;
};

// Fetch Reasons
const fetchReasons = async () => {
  isReasonLoading.value = true;
  const response = await reasons();
  if (response && response.data.data) {
    reason.value = response.data.data;
    // toast.success("Reasons fetched successfully");
    console.log("Reasons fetched:", response.data.data);
  } else {
    // toast.error("Failed to fetch reasons. Please try again.");
  }

  isReasonLoading.value = false;
};

// Computed property to derive workspace domain
const derivedWorkspaceDomain = computed(() => {
  if (formData.domain) {
    return `${formData.domain}.hrline.com`;
  }
  return "yourcompany.hrline.com";
});

// Step titles
const stepTitles = [
  "We need some of your company information",
  "We can create a workspace for your team",
  "What is your role in your company",
  "What will you mainly use HRDashboard for?",
];

// Step descriptions
const stepDescriptions = [
  "This data is needed so we can easily provide solutions according to your company's capacity",
  "This data is needed so we can easily provide solutions according to your company's capacity",
  "This data is needed so we can easily provide solutions according to your company's capacity",
  "This data is needed so we can easily provide solutions according to your company's capacity",
];

// Clear errors
const clearErrors = () => {
  Object.keys(errors).forEach((key) => {
    errors[key] = "";
  });
};
const otherRoleId = computed(() => {
  const otherRole = workerRole.value.find(
    // eslint-disable-next-line prettier/prettier
    (role) => role.name.toLowerCase() === "other",
  );
  return otherRole ? otherRole.id : null;
});
// Validate current step
const validateStep = async () => {
  clearErrors();
  let isValid = true;
  isLoading.value = true;

  if (currentStep.value === 1) {
    if (!formData.name) {
      errors.name = "Company name is required";
      isValid = false;
    }
    if (!formData.domain) {
      errors.domain = "Company domain name is required";
      isValid = false;
    }
    if (!sizes.includes(formData.size)) {
      errors.size = "Please select a valid company size";
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await stepOne({
          name: formData.name,
          domain: formData.domain,
          size: formData.size,
        });

        if (!response || !response.data) {
          toast.error("Failed to submit company details.");
          isValid = false;
        } else if (response.data.error) {
          toast.error(response.data.error);
          isValid = false;
        }

        if (isValid) {
          formData.domain = derivedWorkspaceDomain.value;
        }
      } catch (error) {
        toast.error("Error submitting company details: " + error.detail);
        isValid = false;
      }
    }
  } else if (currentStep.value === 2) {
    if (!formData.industry_id) {
      errors.industry_id = "Please select an industry";
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await stepTwo({
          domain: formData.domain,
          industry_id: formData.industry_id,
        });

        if (!response || !response.data) {
          toast.error("Failed to submit company details.");
          isValid = false;
        } else if (response.data.error) {
          toast.error(response.data.error);
          isValid = false;
        }
      } catch (error) {
        toast.error("Error submitting industry details: " + error.detail);
        isValid = false;
      }
    }
  } else if (currentStep.value === 3) {
    if (!formData.companyrole) {
      errors.roleError = "Please select a role";
      isValid = false;
    } else if (formData.companyrole === otherRoleId.value && !formData.role) {
      errors.roleError = "Please input your role for 'Other'";
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await stepThree({
          role_id: formData.companyrole,
          role: formData.companyrole === otherRoleId.value ? formData.role : "",
        });

        if (!response || !response.data) {
          toast.error("Failed to submit role details.");
          isValid = false;
        } else if (response.data.error) {
          toast.error(response.data.error);
          isValid = false;
        }
      } catch (error) {
        toast.error(error.detail);
        isValid = false;
      }
    }
  } else if (currentStep.value === 4) {
    if (!formData.companychoose) {
      errors.companychoose = "Please select a reason";
      isValid = false;
    }

    if (isValid) {
      try {
        const response = await stepFour({
          reason_id: formData.companychoose,
        });

        if (!response || !response.data) {
          toast.error("Failed to submit reason details.");
          isValid = false;
        } else if (response.data.error) {
          toast.error(response.data.error);
          isValid = false;
        }
      } catch (error) {
        toast.error("Error submitting reason details: " || error.detail);
        isValid = false;
      }
    }
  }

  isLoading.value = false;
  return isValid;
};

// Navigation functions
const nextStep = async () => {
  if (currentStep.value < 4) {
    if (await validateStep()) {
      currentStep.value++;
    }
  } else {
    if (await validateStep()) {
      submitForm();
    }
  }
};

const previousStep = () => {
  if (currentStep.value > 1) {
    clearErrors();
    currentStep.value--;
  }
};

const handleCancel = () => {
  router.push("/cancel");
};

const submitForm = () => {
  isLoading.value = true;
  console.log("Form submitted:", { ...formData });
  setTimeout(() => {
    isLoading.value = false;
    router.push("/dashboard");
  }, 1000);
};

// Fetch data on mount
onMounted(() => {
  console.log("onMounted triggered");
  fetchIndustries();
  fetchRoles();
  fetchReasons();
});
</script>

<style scoped>
.loader {
  border: 3px solid #28a076; /* Green to match theme */
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
