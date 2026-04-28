<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="border border-transparent w-96">
      <p class="text-base text-center font-semibold">
        <span class="text-green-600 font-bold text-center">H</span>HRDashboard
      </p>
      <h2 class="text-2xl font-bold py-4 text-center">Update your password</h2>
      <p class="text-sm text-center">
        Set your new password with minimum of 8 characters, including letters,
        numbers, and special characters.
      </p>

      <form @submit.prevent="handleSubmit">
        <div class="mt-8">
          <label for="newPassword"
            >New Password <span class="text-red-500">*</span></label
          >
          <input
            type="password"
            id="newPassword"
            v-model="form.newPassword"
            class="w-full border rounded-md p-2 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="***********"
            :class="{ 'border-red-500': errors.newPassword }"
          />
          <p v-if="errors.newPassword" class="text-red-500 text-sm mt-1">
            {{ errors.newPassword }}
          </p>
        </div>

        <div class="mt-8">
          <label for="confirmPassword"
            >Confirm New Password <span class="text-red-500">*</span></label
          >
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="w-full border rounded-md p-2 mt-2 placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-green-700"
            placeholder="Re-enter your password"
            :class="{ 'border-red-500': errors.confirmPassword }"
          />
          <p v-if="errors.confirmPassword" class="text-red-500 text-sm mt-1">
            {{ errors.confirmPassword }}
          </p>
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mt-4 text-center">
          {{ errorMessage }}
        </p>

        <button
          type="submit"
          class="w-full bg-[#121828] text-white py-2 rounded-md mt-6 disabled:bg-gray-400"
          :disabled="isLoading"
        >
          {{ isLoading ? "Submitting..." : "Submit" }}
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useToast } from "vue-toastification";
import { updatePassword } from "@/services/auth.service";

export default {
  name: "UpdatePasswordView",
  setup() {
    const router = useRouter();
    const route = useRoute();
    const toast = useToast();

    const form = reactive({
      newPassword: "",
      confirmPassword: "",
    });

    const errors = reactive({
      newPassword: "",
      confirmPassword: "",
    });

    const errorMessage = ref("");
    const isLoading = ref(false);
    const isValidSession = ref(true);

    // Retrieve salt and email
    const salt = sessionStorage.getItem("resetSalt");
    const email = route.query.email || sessionStorage.getItem("resetEmail");

    // Validate session data in onMounted
    onMounted(() => {
      if (!salt) {
        toast.error("Invalid session. Please complete OTP verification again.");
        router.push("/resetpassword");
        isValidSession.value = false;
      }
      if (!email) {
        toast.error(
          "No email found. Please start the password reset process again."
        );
        router.push("/resetpassword");
        isValidSession.value = false;
      }
    });

    const validateForm = () => {
      let valid = true;

      // Clear errors
      errors.newPassword = "";
      errors.confirmPassword = "";

      const password = form.newPassword;
      const confirm = form.confirmPassword;

      const hasLetter = /[A-Za-z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*]/.test(password);

      if (!password) {
        errors.newPassword = "New password is required.";
        valid = false;
      } else if (
        password.length < 8 ||
        !hasLetter ||
        !hasNumber ||
        !hasSpecial
      ) {
        errors.newPassword =
          "Password must be at least 8 characters and include letters, numbers, and special characters (e.g., @, #, $).";
        valid = false;
      }

      if (!confirm) {
        errors.confirmPassword = "Please confirm your password.";
        valid = false;
      } else if (password !== confirm) {
        errors.confirmPassword = "Passwords do not match.";
        valid = false;
      }

      return valid;
    };

    const handleSubmit = async () => {
      if (!isValidSession.value) return;

      errorMessage.value = "";
      if (!validateForm()) return;

      isLoading.value = true;
      const payload = {
        salt,
        password: form.newPassword,
        confirm_password: form.confirmPassword,
      };

      const response = await updatePassword(payload);
      isLoading.value = false;

      let responseData;
      if (response.data) {
        responseData = response.data;
      } else {
        responseData = response;
      }

      if (
        responseData.success ||
        (responseData.detail && !responseData.error)
      ) {
        toast.success("Password updated successfully!");
        sessionStorage.removeItem("resetSalt");
        sessionStorage.removeItem("resetEmail");
        router.push("/");
      } else if (responseData.detail) {
        errorMessage.value = responseData.detail;
        toast.error(responseData.detail);
      } else if (responseData.error && responseData.error.detail) {
        errorMessage.value = responseData.error.detail;
        toast.error(responseData.error.detail);
      } else {
        errorMessage.value = "Failed to update password. Please try again.";
        toast.error("Failed to update password. Please try again.");
      }
    };

    return {
      form,
      errors,
      errorMessage,
      isLoading,
      handleSubmit,
    };
  },
};
</script>
