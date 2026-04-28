<template>
  <div class="w-full md:container mx-auto p-5">
    <h2 class="text-2xl font-semibold mb-4">Change Password</h2>
    <div class="border border-b w-full border-gray-100" />
    <div class="mt-6">
      <p class="mb-1">Old Password <span class="text-red-600">*</span></p>
      <input
        class="border border-gray-200 w-full rounded-md p-2"
        placeholder="Enter old password"
      />
    </div>

    <div class="mt-4">
      <p class="mb-1">New Password <span class="text-red-600">*</span></p>
      <input
        class="border border-gray-200 w-full rounded-md p-2"
        placeholder="Enter old password"
      />
    </div>

    <div class="mt-4">
      <p class="mb-1">Confirm Password <span class="text-red-600">*</span></p>
      <input
        class="border border-gray-200 w-full rounded-md p-2"
        placeholder="Enter old password"
      />
    </div>

    <div class="w-32 mt-6 text-white p-2 text-center rounded-lg bg-[#12172b]">
      Save
    </div>
  </div>
</template>

<script>
export default {
  name: "PasswordView",
};
</script>

<style lang="scss" scoped></style>
