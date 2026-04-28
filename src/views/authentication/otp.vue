<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="w-80">
      <p class="text-base text-center font-semibold">
        <span class="text-green-600 font-bold">H</span>HRDashboard
      </p>
      <h2 class="text-2xl font-bold py-4 text-center">OTP Verification</h2>
      <p class="text-sm text-center text-gray-600">
        We've sent a code to
        <span class="font-medium">{{ email || "your email" }}</span
        >.
        <router-link to="/resetpassword" class="text-green-600 font-medium">
          Wrong email?
        </router-link>
      </p>

      <!-- OTP Inputs -->
      <div class="flex justify-center gap-4 mt-8">
        <input
          v-for="(digit, index) in otp"
          :key="index"
          type="text"
          maxlength="1"
          class="w-16 h-12 text-center border border-gray-300 rounded-md text-xl focus:outline-none focus:ring-2 focus:ring-green-700"
          v-model="otp[index]"
          @input="moveToNext(index, $event)"
        />
      </div>

      <!-- Submit Button -->
      <div
        @click="submitOtp"
        class="mt-6 w-full text-center bg-[#121828] text-white py-3 rounded-md cursor-pointer"
      >
        Submit
      </div>

      <!-- Resend OTP Link -->
      <p class="text-sm text-center mt-4">
        Didn't receive the code?
        <span
          @click="resendOtp"
          class="text-green-600 font-medium cursor-pointer hover:underline"
        >
          Resend OTP
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { verifyOtp, resendToken } from "@/services/auth.service";
import { useToast } from "vue-toastification";

export default {
  name: "OtpView",
  setup() {
    const route = useRoute();
    const router = useRouter();
    const toast = useToast();

    let email = ref("");
    if (route.query.email) {
      email.value = route.query.email;
    } else if (sessionStorage.getItem("resetEmail")) {
      email.value = sessionStorage.getItem("resetEmail");
    } else {
      toast.error("No email found. Please enter your email again.");
      router.push("/resetpassword");
    }

    const otp = ref(["", "", "", ""]);

    const moveToNext = (index, event) => {
      const input = event.target;
      if (input.value.length === 1 && index < otp.value.length - 1) {
        const nextSibling = input.nextElementSibling;
        if (nextSibling) {
          nextSibling.focus();
        }
      } else if (
        event.key === "Backspace" &&
        input.value.length === 0 &&
        index > 0
      ) {
        const previousSibling = input.previousElementSibling;
        if (previousSibling) {
          previousSibling.focus();
        }
      }
    };

    const submitOtp = async () => {
      const token = otp.value.join("");
      const payload = { email: email.value, token };

      if (token.length !== 4) {
        toast.error("Please enter the full 4-digit OTP.");
      } else {
        const response = await verifyOtp(payload);
        let responseData;
        if (response.data) {
          responseData = response.data;
        } else {
          responseData = response;
        }

        if (responseData.salt && responseData.detail) {
          sessionStorage.setItem("resetSalt", responseData.salt);
          toast.success(responseData.detail);
          sessionStorage.removeItem("resetEmail");
          router.push({
            path: "/updatepassword",
            query: {
              email: email.value,
              salt: responseData.salt,
            },
          });
        } else if (responseData.success === true) {
          toast.success("OTP verified successfully!");
          router.push("/updatepassword");
        } else if (responseData.error && responseData.error.detail) {
          toast.error(responseData.error.detail);
        } else {
          toast.error("Verification failed. Please try again.");
        }
      }
    };

    const resendOtp = async () => {
      const payload = { email: email.value };
      const response = await resendToken(payload);

      let responseData;
      if (response.data) {
        responseData = response.data;
      } else {
        responseData = response;
      }

      if (responseData.detail) {
        toast.success(responseData.detail || "New OTP sent successfully!");
        otp.value = ["", "", "", ""]; // Clear OTP inputs
      } else {
        toast.error("Failed to resend OTP. Please try again.");
      }
    };

    return {
      email,
      otp,
      moveToNext,
      submitOtp,
      resendOtp,
    };
  },
};
</script>
