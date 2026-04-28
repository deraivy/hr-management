<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="border border-transparent w-96">
      <p class="text-base text-center font-semibold">
        <span class="text-green-600 font-bold text-center">H</span>HRDashboard
      </p>
      <h2 class="text-2xl font-bold py-4 text-center">Reset Password</h2>
      <p class="text-sm text-center">
        Enter your email address and we will send you password reset instruction
      </p>

      <form @submit.prevent="handleResetPassword">
        <div class="mt-8">
          <label for="email">
            Registered Email <span class="text-red-500">*</span>
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full border border-gray-300 rounded-md p-2 mt-2 placeholder-gray-400 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Enter your email address"
          />
        </div>

        <div class="flex flex-col">
          <button
            type="submit"
            class="w-full text-center bg-[#121828] text-white py-2 rounded-md mt-6"
          >
            Submit
          </button>

          <router-link
            to="/"
            class="w-full text-center border border-[#121828] text-black py-2 rounded-md mt-6"
          >
            Back to Login
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast } from "vue-toastification";
import { resetPassword } from "../../services/auth.service";

export default {
  name: "ResetPasswordView",
  setup() {
    const router = useRouter();
    const toast = useToast();
    const email = ref("");

    const handleResetPassword = async () => {
      try {
        // Validate email format
        if (!email.value || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
          toast.error("Please enter a valid email address.");
          return;
        }

        const data = { email: email.value };
        const response = await resetPassword(data);

        if (response.data) {
          sessionStorage.setItem("resetEmail", email.value);
          toast.success(response.data.detail);
          router.push({
            path: "/otp",
            query: { email: email.value }, // Optional: keep query param as fallback
          });
        } else {
          toast.error(response.error.detail);
        }
      } catch (error) {
        console.error("Reset password error:", error);
        toast.error("An error occurred while sending the reset instructions.");
      }
    };

    return {
      email,
      handleResetPassword,
    };
  },
};
</script>
