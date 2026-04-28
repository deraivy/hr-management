<template>
  <div>
    <section
      class="relative bg-[url(/images/bi.jpg)] bg-cover bg-center text-white min-h-96 flex flex-col"
    >
      <!-- Dark overlay -->
      <div class="absolute inset-0 bg-black/30"></div>

      <!-- Navigation -->
      <div class="relative z-20 w-full">
        <header class="container mx-auto px-5 pt-5 pb-2">
          <nav class="flex items-center justify-between">
            <router-link to="/" class="text-lg font-semibold flex items-center">
              <span class="text-[#28a076] text-2xl font-bold">H</span>
              <span class="ml-1">HRDashboard</span>
            </router-link>

            <div class="flex items-center gap-6">
              <div class="flex gap-6">
                <router-link
                  to="/"
                  class="hover:text-[#11ad5d] transition-colors"
                >
                  Home
                </router-link>
                <router-link
                  to="/career"
                  class="hover:text-[#11ad5d] transition-colors"
                >
                  Career
                </router-link>
              </div>

              <div
                class="bg-[#28a076] hover:bg-[#28a076] hover:text-white rounded-full text-white px-6 py-2"
              >
                Login
              </div>
            </div>
          </nav>
        </header>
      </div>

      <!-- Hero Content (Centered) -->
      <div class="relative z-10 flex-1 flex items-center justify-center">
        <div class="text-center px-4">
          <h2 class="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Job Vacancies
          </h2>
          <p class="text-lg md:text-xl opacity-90 max-w-2xl mx-auto">
            Discover open positions and apply today.
          </p>
        </div>
      </div>
    </section>

    <div class="w-full max-w-4xl mx-auto p-5">
      <div v-if="isLoading" class="space-y-4 mt-12">
        <div
          v-for="n in 3"
          :key="n"
          class="bg-white p-4 rounded-md shadow-sm animate-pulse"
        >
          <!-- Title -->
          <div class="h-5 bg-gray-300 rounded w-1/3 mb-3"></div>

          <!-- Meta -->
          <div class="flex gap-2 mb-2">
            <div class="h-4 bg-gray-300 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/6"></div>
          </div>

          <!-- Job type -->
          <div class="h-4 bg-gray-300 rounded w-1/5 mb-3"></div>

          <!-- Footer -->
          <div class="flex justify-between">
            <div class="h-4 bg-gray-300 rounded w-1/4"></div>
            <div class="h-4 bg-gray-300 rounded w-1/5"></div>
          </div>
        </div>
      </div>

      <div v-else-if="postings && postings.length > 0">
        <div
          v-for="job in postings"
          :key="job.id"
          class="bg-white rounded-xl shadow-sm border border-gray-200 transition-shadow duration-300 overflow-hidden mt-12"
        >
          <div class="p-6">
            <!-- Header: Title and Organization -->
            <div class="flex justify-between items-start mb-4">
              <div>
                <h2 class="text-2xl font-semibold text-gray-900">
                  {{ job.title }}
                </h2>
              </div>
              <span
                class="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full"
              >
                {{ job.applied_count }} applied
              </span>
            </div>

            <!-- Location -->
            <div class="flex items-center gap-6 mb-4">
              <div class="flex items-center gap-1 text-gray-700">
                <AppIcon
                  icon="famicons:location-outline"
                  class="w-5 h-5 text-[#696969]"
                />
                <p class="text-[#696969]">{{ job.location }}</p>
              </div>
              <div class="flex items-center gap-1">
                <AppIcon
                  icon="fluent:briefcase-20-regular"
                  class="w-6 h-6 text-[#696969]"
                />
                <p class="text-[#696969]">
                  {{ job.organization }}
                </p>
              </div>
              <div class="flex items-center gap-1">
                <AppIcon
                  icon="ph:money-wavy-light"
                  class="w-6 h-6 text-[#696969]"
                />
                <p class="text-[#696969]">
                  ₦{{ job.min_salary || currency }} - ₦{{
                    job.max_salary || currency
                  }}
                </p>
              </div>
            </div>

            <!-- Tags -->
            <div class="flex flex-wrap items-center gap-3 mb-6">
              <span
                class="bg-blue-100 text-blue-800 px-2.5 py-1 rounded-full text-sm"
              >
                {{ job.department }}
              </span>
              <span
                class="bg-green-100 text-green-800 px-2.5 py-1 rounded-full text-sm capitalize"
              >
                {{ job.job_type }}
              </span>
              <span
                class="bg-purple-100 text-purple-800 px-2.5 py-1 rounded-full text-sm"
              >
                {{ job.quantity }} openings
              </span>
            </div>

            <!-- Description with Read More -->
            <!-- <div class="text-gray-700 leading-relaxed mb-8">
              <p>
                {{ job.description }}
              </p>
            </div> -->

            <!-- Action Button -->
            <div class="flex justify-between items-center">
              <p class="text-sm text-gray-500">
                Posted on {{ job.created_at }} • Closes
                {{ job.closing_date }}
              </p>
              <router-link
                v-if="job.can_apply && !job.is_closed"
                :to="{
                  name: 'apply',
                  query: { title: job.title },
                  params: { id: job.id },
                }"
                class="text-center font-semibold px-3.5 py-2 rounded-lg bg-black hover:bg-blue-700 text-white transition-colors duration-200"
              >
                Apply Now
              </router-link>

              <span
                v-else
                class="text-center font-semibold px-3.5 py-2 rounded-lg bg-gray-400 text-gray-200 cursor-not-allowed"
                aria-disabled="true"
              >
                Already Applied
              </span>
            </div>
          </div>
        </div>
      </div>

      <div v-else>No postings found</div>
    </div>
  </div>
</template>

<script>
import { getApplicantPosting } from "@/services/auth.recuitment";
import { onMounted, ref } from "vue";
export default {
  name: "CareerView",
  setup() {
    const isLoading = ref(false);
    const postings = ref([]);

    const fetchApplicantPosts = async () => {
      isLoading.value = true;
      const response = await getApplicantPosting();
      if (response.status === 200) {
        postings.value = response.data.postings || [];
      }
      isLoading.value = false;
    };

    onMounted(fetchApplicantPosts);

    return {
      isLoading,
      postings,
      fetchApplicantPosts,
    };
  },
};
</script>

<style lang="scss" scoped></style>
