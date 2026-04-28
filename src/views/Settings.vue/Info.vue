<template>
  <div class="w-full md:container mx-auto p-5">
    <h2 class="text-2xl font-semibold mb-4">Company info</h2>
    <div class="border border-b w-full border-gray-100" />

    <div class="flex gap-4 mt-4">
      <div class="mb-2 w-full">
        <p class="mb-1">Company Name <span class="text-red-600">*</span></p>
        <input
          type="text"
          placeholder="subaby"
          class="w-full border border-gray-300 p-2 rounded-lg"
        />
      </div>

      <div class="mb-2 w-full">
        <p class="mb-1">Company Website <span class="text-red-600">*</span></p>
        <input
          type="text"
          placeholder="www.pixel.com"
          class="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
    </div>

    <div class="flex gap-4">
      <div class="mb-2 w-full">
        <p class="mb-1">Contact Number<span class="text-red-600">*</span></p>
        <input
          type="tel"
          placeholder="09135230456"
          class="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>

      <div class="mb-2 w-full">
        <p class="mb-1">Company Email <span class="text-red-600">*</span></p>
        <input
          type="email"
          placeholder="example@email.com"
          class="w-full border border-gray-300 rounded-lg p-2"
        />
      </div>
    </div>
    <div class="mt-2">
      <p class="mb-2">Company overview</p>
      <textarea
        name="overview"
        cols="5"
        rows="5"
        class="w-full border border-gray-300 p-2 rounded-lg"
      >
      </textarea>
    </div>

    <div class="w-28 mt-4 text-white p-2 text-center rounded-lg bg-[#12172b]">
      Save
    </div>
  </div>
</template>

<script>
export default {
  name: "InfoView",
};
</script>

<style lang="scss" scoped></style>
