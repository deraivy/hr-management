<template>
  <div class="flex items-center gap-12 md:gap-2 h-screen">
    <div class="w-full px-8 lg:px-24">
      <h2 class="text-4xl font-semibold">
        Manage employees easily starting from now
      </h2>
      <p class="mt-2">Get started for free today!</p>

      <div class="flex flex-col gap-4 mt-4">
        <label for="name" class="text-sm"
          >Full Name <span class="text-red-500">*</span></label
        >
        <input
          v-model="data.name"
          type="text"
          id="name"
          placeholder="input your full name"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:ring-2 focus:border-green-700 placeholder-gray-400 placeholder:text-sm"
          :class="{ 'border-red-500': errors.name }"
          @blur="validateName"
          :disabled="isLoading"
        />
        <p v-if="errors.name" class="text-red-500 text-sm">{{ errors.name }}</p>
      </div>

      <div class="flex flex-col mt-4 gap-4">
        <label for="email" class="text-sm"
          >Work Email <span class="text-red-500">*</span></label
        >
        <input
          v-model="data.email"
          type="email"
          id="email"
          placeholder="example@company.com"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:ring-2 focus:border-green-700 placeholder-gray-400 placeholder:text-sm"
          :class="{ 'border-red-500': errors.email }"
          @blur="validateEmail"
          :disabled="isLoading"
        />
        <p v-if="errors.email" class="text-red-500 text-sm">
          {{ errors.email }}
        </p>
      </div>

      <div class="flex flex-col gap-4 mt-4">
        <label for="password" class="text-sm"
          >Password <span class="text-red-500">*</span></label
        >
        <input
          v-model="data.password"
          type="password"
          id="password"
          placeholder="input your password account"
          class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:ring-2 focus:border-green-700 placeholder-gray-400 placeholder:text-sm"
          :class="{ 'border-red-500': errors.password }"
          @blur="validatePassword"
          :disabled="isLoading"
        />
        <p v-if="errors.password" class="text-red-500 text-sm">
          {{ errors.password }}
        </p>
      </div>

      <!-- Register button with loader -->
      <div
        class="flex items-center justify-center w-full px-4 py-3 rounded-md mt-6 transition disabled:cursor-not-allowed"
        :class="[
          isFormFilled && !isLoading
            ? 'bg-[#121828] text-white hover:bg-[#121028]'
            : 'bg-gray-300 text-gray-500',
        ]"
        :disabled="!isFormFilled || isLoading"
        @click="handleRegister"
      >
        <svg
          v-if="isLoading"
          class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            class="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            stroke-width="4"
          ></circle>
          <path
            class="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
        <span>{{ isLoading ? "Registering..." : "Create Account" }}</span>
      </div>

      <p class="mt-4 text-sm text-start">
        Already have an account?
        <span class="text-[#28a076] font-semibold">
          <router-link to="/">Login Here</router-link>
        </span>
      </p>

      <!-- Footer at the bottom -->
      <footer class="text-sm text-gray-500 text-center py-4">
        © 2025 HRDashboard. All rights reserved.
      </footer>
    </div>

    <!-- image part -->
    <div class="w-full bg-[#239b6e] h-screen hidden md:flex flex-col">
      <!-- Header Text -->
      <div class="px-16 py-8 mt-8">
        <h2 class="text-4xl font-bold text-white">
          Let's empower your employees today
        </h2>
        <p class="mt-4 text-white">
          We help complete all your conveyancing needs easily
        </p>
      </div>

      <!-- Image fills remaining space -->
      <div class="flex-1 ml-16">
        <img
          src="/images/register.png"
          alt="HR Dashboard Illustration"
          class="w-full h-full object-cover rounded-tl-xl"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, computed, ref } from "vue";
import { register } from "@/services/auth.service";
import router from "@/router";
import { useToast } from "vue-toastification";

export default {
  name: "RegisterView",
  setup() {
    const toast = useToast();
    const isLoading = ref(false);

    const data = reactive({
      name: "",
      email: "",
      password: "",
    });

    const errors = reactive({
      name: "",
      email: "",
      password: "",
    });

    const blurred = reactive({
      name: false,
      email: false,
      password: false,
    });

    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validate name on blur
    const validateName = () => {
      blurred.name = true;
      errors.name = "";
      if (!data.name && blurred.name) {
        errors.name = "Name is required";
      }
    };

    // Validate email on blur
    const validateEmail = () => {
      blurred.email = true;
      errors.email = "";
      if (!data.email && blurred.email) {
        errors.email = "Work Email is required";
      } else if (data.email && !emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
      }
    };

    // Validate password on blur
    const validatePassword = () => {
      blurred.password = true;
      errors.password = "";
      if (!data.password && blurred.password) {
        errors.password = "Password is required";
      } else if (data.password && data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
      }
    };

    // Validate entire form for button state
    const validateForm = () => {
      let isValid = true;

      // Clear all errors
      errors.name = "";
      errors.email = "";
      errors.password = "";

      // Name validation
      if (!data.name.trim()) {
        errors.name = "Name is required";
        isValid = false;
      }

      // Email validation
      if (!data.email.trim()) {
        errors.email = "Work Email is required";
        isValid = false;
      } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      }

      // Password validation
      if (!data.password) {
        errors.password = "Password is required";
        isValid = false;
      } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
        isValid = false;
      }

      return isValid;
    };

    // Computed property to check if form is valid
    const isFormFilled = computed(() => {
      return (
        data.name.trim() && data.email.trim() && data.password && validateForm()
      );
    });

    // Handle registration
    const handleRegister = async () => {
      if (!validateForm()) {
        toast.warning("Please fix the form errors before submitting.");
        return;
      }

      isLoading.value = true;

      try {
        // Assuming your register function returns a promise
        const response = await register(data);

        // Debug: Log the response to see what you're getting
        console.log("Register response:", response);

        // Check if response has error property first
        if (response && response.error) {
          // Handle error response
          const errorMessage = response.error.detail || "Registration failed";
          toast.error(errorMessage, { timeout: 10000 });
        }
        // Check if response has data with access_token
        else if (response && response.data && response.data.access_token) {
          const token = response.data.access_token;

          // Save token
          sessionStorage.setItem(
            "sessionData",
            JSON.stringify({
              access_token: token,
              user: response.data.user || {},
            })
          );

          toast.success(response.data.detail || "Registered Successfully!");
          router.push({ name: "multistepform" });
        }
        // Handle unexpected response format
        else {
          console.error("Unexpected response format:", response);
          toast.error("Unexpected response from server. Please try again.");
        }
      } catch (error) {
        console.error("Registration catch error:", error);

        // If your register function throws errors, handle them here
        if (error.response) {
          // Axios error with response
          const errorData = error.response.data;

          if (errorData && errorData.detail) {
            toast.error(errorData.detail, { timeout: 10000 });
          } else if (errorData && errorData.message) {
            toast.error(errorData.message, { timeout: 10000 });
          } else {
            toast.error(
              `Error: ${error.response.status} - Registration failed`
            );
          }
        } else if (error.message) {
          toast.error(error.message);
        } else {
          toast.error("An unknown error occurred. Please try again.");
        }
      } finally {
        isLoading.value = false;
      }
    };

    return {
      data,
      errors,
      blurred,
      validateName,
      validateEmail,
      validatePassword,
      isFormFilled,
      handleRegister,
      isLoading,
    };
  },
};
</script>
