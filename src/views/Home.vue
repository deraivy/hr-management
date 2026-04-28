<template>
  <div>
    <header class="w-full md:container mx-auto p-5">
      <nav class="flex items-center justify-between">
        <router-link to="/" class="text-lg font-semibold mb-2">
          <span class="text-[#28a076] text-2xl font-bold">H</span> HRDashboard
        </router-link>
        <div class="flex gap-3">
          <router-link to="/">Home</router-link>
          <router-link to="/career">Career</router-link>
        </div>

        <router-link
          to="/login"
          class="bg-[#28a076] hover:bg-[#28a076] hover:text-white rounded-full text-white px-6 py-2"
        >
          Login
        </router-link>
      </nav>
    </header>

    <!--  -->
    <section
      style="
        background: linear-gradient(to bottom right, #0f172a, #1e293b, #020617);
      "
      class="relative min-h-[calc(100vh-5rem)] w-full overflow-hidden rounded-b-[3rem] flex items-center justify-center"
    >
      <div
        class="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none"
      >
        <div
          class="absolute top-[-20%] left-[-10%] w-[450px] h-[450px] rounded-full bg-white blur-[120px]"
        ></div>
        <div
          class="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#38bdf8]/70 blur-[120px]"
        ></div>
      </div>

      <div class="max-w-4xl w-full px-4 relative z-10">
        <div class="flex flex-col items-center text-center justify-center">
          <h1
            class="text-5xl md:text-7xl font-extrabold text-white leading-tight mb-6 tracking-tight"
          >
            Transform HR for the <br />
            <span class="text-white/70">Modern Workplace</span>
          </h1>

          <p
            class="text-white/80 text-sm md:text-base max-w-lg mx-auto mb-10 leading-relaxed font-medium"
          >
            Our incredibly user-friendly platform makes everything—from hiring
            to offboarding—simple, fast, and stress-free
          </p>

          <div
            class="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button
              class="bg-white text-[#0f172a] px-8 py-3.5 rounded-full font-bold hover:bg-gray-100 transition shadow-lg shadow-black/30 whitespace-nowrap"
            >
              Get Started for Free →
            </button>

            <button
              class="bg-transparent border border-white/50 text-white px-8 py-3.5 rounded-full font-bold hover:bg-white/15 transition whitespace-nowrap"
            >
              See Our Pricing
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "HomeView",
};
</script>

<style lang="scss" scoped></style>
