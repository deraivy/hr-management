<template>
  <div class="flex items-center gap-12 md:gap-2 h-screen">
    <!-- Left section with image and intro text -->
    <div class="w-full h-screen hidden md:flex flex-col">
      <div class="flex-1">
        <img
          src="images/on.jpeg"
          alt="HR Dashboard Illustration"
          class="w-full h-full object-cover"
        />
      </div>
      <div class="border-b-4 border-[#28a076]"></div>
      <div
        class="bg-[#121828] flex-[0.4] p-12 text-white flex flex-col justify-center"
      >
        <p class="text-lg font-semibold mb-2">
          <span class="text-[#28a076] text-2xl font-bold">H</span> HRDashboard
        </p>
        <h2 class="text-5xl font-bold mb-6">
          Let's empower your employees today.
        </h2>
        <p class="text-sm text-gray-300 mb-6">
          We help complete all your conveyancing needs easily.
        </p>
      </div>
    </div>

    <!-- Right section with form -->
    <div class="w-full p-8 lg:px-24">
      <form @submit.prevent="handleLogin">
        <div class="flex flex-col gap-4">
          <label for="email" class="text-sm">
            Email Address <span class="text-red-500">*</span>
          </label>
          <input
            v-model="data.email"
            type="email"
            id="email"
            placeholder="input your registered email"
            class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:ring-2 focus:border-green-700 placeholder-gray-400 placeholder:text-sm"
            :class="{ 'border-red-500': errors.email }"
          />
          <p v-if="errors.email" class="text-red-500 text-sm">
            {{ errors.email }}
          </p>
        </div>

        <div class="flex flex-col gap-4 mt-4">
          <label for="password" class="text-sm">
            Password <span class="text-red-500">*</span>
          </label>
          <input
            v-model="data.password"
            type="password"
            id="password"
            placeholder="input your password account"
            class="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-green-700 focus:ring-2 focus:border-green-700 placeholder-gray-400 placeholder:text-sm"
            :class="{ 'border-red-500': errors.password }"
          />
          <p v-if="errors.password" class="text-red-500 text-sm">
            {{ errors.password }}
          </p>
        </div>

        <div class="mt-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me" class="text-sm">Remember me</label>
          </div>
          <router-link to="/resetpassword" class="text-sm"
            >Forgot Password</router-link
          >
        </div>

        <button
          type="submit"
          :class="[
            'w-full px-4 py-2 rounded-md mt-6 transition text-center',
            isFormFilled && !isLoading
              ? 'bg-gray-900 text-white hover:bg-[#121028]'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed',
          ]"
          :disabled="!isFormFilled || isLoading"
        >
          <span v-if="isLoading" class="flex items-center justify-center">
            <svg
              class="animate-spin h-5 w-5 mr-2 text-white"
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
            Loading...
          </span>
          <span v-else>Login</span>
        </button>
      </form>

      <p class="mt-4 text-sm text-center">
        You're new here?
        <span class="text-[#28a076] font-semibold">
          <router-link to="/register">Create Account</router-link>
        </span>
      </p>

      <footer class="text-sm text-gray-500 text-center py-4">
        © 2025 HRDashboard. All rights reserved.
      </footer>
    </div>
  </div>
</template>

<script>
import { login } from "@/services/auth.service";
import { reactive, computed, ref } from "vue";
import { useToast } from "vue-toastification";
import { session } from "@/utils";
import { useRouter } from "vue-router";

export default {
  name: "LoginView",
  setup() {
    const toast = useToast();
    const router = useRouter();
    const isLoading = ref(false);

    const data = reactive({
      email: "",
      password: "",
    });

    const errors = reactive({
      email: "",
      password: "",
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const validateForm = () => {
      let isValid = true;

      // Email validation
      if (!data.email) {
        errors.email = "Email is required";
        isValid = false;
      } else if (!emailRegex.test(data.email)) {
        errors.email = "Please enter a valid email address";
        isValid = false;
      } else {
        errors.email = "";
      }

      // Password validation
      if (!data.password) {
        errors.password = "Password is required";
        isValid = false;
      } else if (data.password.length < 6) {
        errors.password = "Password must be at least 6 characters long";
        isValid = false;
      } else {
        errors.password = "";
      }

      return isValid;
    };

    const isFormFilled = computed(() => {
      return data.email && data.password;
    });

    const handleLogin = async () => {
      if (!validateForm()) return;

      try {
        isLoading.value = true;
        const response = await login(data);
        if (response && response.data) {
          toast.success(response.data.detail || "Login successful");

          // Save session data
          session.set("sessionData", response.data);

          // Check the steps object to determine completion
          const steps = response.data.steps || {};
          const isComplete =
            steps.first_step &&
            steps.second_step &&
            steps.third_step &&
            steps.fourth_step;

          if (isComplete) {
            // All steps are complete, redirect to dashboard
            router.push("/dashboard").then(() => {
              window.location.reload();
            });
          } else {
            // Find the first incomplete step
            const stepMap = [
              { key: "first_step", step: 1 },
              { key: "second_step", step: 2 },
              { key: "third_step", step: 3 },
              { key: "fourth_step", step: 4 },
            ];
            const firstIncompleteStep =
              stepMap.find((s) => !steps[s.key])?.step || 1;

            // Redirect to the multi-step form with the first incomplete step
            router.push({
              name: "multistepform",
              query: { step: firstIncompleteStep },
            });
          }
        }
      } catch (error) {
        toast.error(
          error.response?.data?.detail || "Login failed. Please try again."
        );
      } finally {
        isLoading.value = false;
      }
    };

    return {
      data,
      errors,
      isFormFilled,
      handleLogin,
      isLoading,
    };
  },
};
</script>
