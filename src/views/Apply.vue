<template>
  <header class="shadow-md bg-white sticky top-0 z-10">
    <nav class="w-full md:container mx-auto p-5">
      <div class="flex items-center justify-between">
        <router-link
          to="/"
          class="text-lg font-semibold mb-2 flex items-center gap-2"
        >
          <div
            class="bg-[#28a076] text-white w-8 h-8 rounded-lg flex items-center justify-center"
          >
            <span class="text-xl font-bold">H</span>
          </div>
          <span class="text-gray-800 font-bold">HRDashboard</span>
        </router-link>
        <div class="flex gap-6">
          <router-link
            to="/"
            class="text-gray-600 hover:text-[#28a076] font-medium transition-colors"
          >
            Home
          </router-link>
          <router-link
            to="/career"
            class="text-gray-600 hover:text-[#28a076] font-medium transition-colors"
          >
            Career
          </router-link>
        </div>
        <router-link
          to="/login"
          class="bg-[#28a076] hover:bg-[#229167] text-white px-6 py-2 rounded-lg font-medium transition-colors shadow-sm"
        >
          Login
        </router-link>
      </div>
    </nav>
  </header>

  <div class="w-full md:container mx-auto p-5">
    <div class="mt-8">
      <h1 class="text-3xl font-bold text-gray-800 text-left md:text-center">
        Apply for Job
      </h1>
      <p class="text-gray-600 mt-2 text-left md:text-center">
        Please fill out the form below to submit your application
      </p>
    </div>

    <div class="flex justify-center items-start mt-8">
      <div
        class="bg-white border border-gray-200 rounded-xl p-8 shadow-sm w-full max-w-2xl"
      >
        <div class="space-y-6">
          <!-- Full Name -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Full Name <span class="text-red-500">*</span>
            </label>
            <input
              v-model="application.full_name"
              type="text"
              placeholder="John Doe"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28a076] focus:border-transparent transition-all outline-none"
            />
          </div>

          <!-- Email -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Email Address <span class="text-red-500">*</span>
            </label>
            <input
              v-model="application.email"
              type="email"
              placeholder="john@example.com"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28a076] focus:border-transparent transition-all outline-none"
            />
          </div>

          <!-- Phone Number -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Phone Number <span class="text-red-500">*</span>
            </label>
            <input
              v-model="application.phone_number"
              type="text"
              placeholder="+234 361-237-567"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28a076] focus:border-transparent transition-all outline-none"
            />
          </div>

          <!-- Resume Upload -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Resume / CV <span class="text-red-500">*</span>
            </label>

            <!-- Upload Area -->
            <div v-if="!uploadedFile && !application.resume" class="space-y-3">
              <label
                class="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-8 cursor-pointer hover:border-[#28a076] hover:bg-gray-50 transition-all"
              >
                <div class="mb-4">
                  <AppIcon
                    name="iconamoon:file-add-light"
                    class="w-12 h-12 text-gray-400"
                  />
                </div>
                <div class="text-center">
                  <p class="text-sm font-medium text-gray-700">
                    {{
                      isImageLoading
                        ? "Uploading your file..."
                        : "Click to upload or drag and drop"
                    }}
                  </p>
                  <p class="text-xs text-gray-500 mt-1">
                    PDF, PNG, JPG (Max 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  class="hidden"
                  accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                  @change="handleFile"
                  :disabled="isImageLoading"
                />
              </label>
            </div>

            <!-- Uploaded File Display -->
            <div v-if="uploadedFile || application.resume" class="space-y-3">
              <!-- File Uploaded Success -->
              <div class="border border-green-200 bg-green-50 rounded-xl p-4">
                <div class="flex items-center justify-between">
                  <div class="flex items-center gap-3">
                    <div class="bg-green-100 p-2 rounded-lg">
                      <AppIcon
                        v-if="
                          uploadedFile && uploadedFile.type.startsWith('image/')
                        "
                        name="iconamoon:image-light"
                        class="w-6 h-6 text-green-600"
                      />
                      <AppIcon
                        v-else
                        name="iconamoon:file-text-light"
                        class="w-6 h-6 text-green-600"
                      />
                    </div>
                    <div>
                      <p class="font-medium text-green-800">
                        ✓ File uploaded successfully
                      </p>
                      <p class="text-sm text-gray-600 truncate max-w-xs">
                        {{
                          uploadedFile
                            ? uploadedFile.name
                            : extractFileNameFromUrl(application.resume)
                        }}
                      </p>
                    </div>
                  </div>
                  <button
                    @click="removeFile"
                    type="button"
                    class="text-red-600 hover:text-red-800 text-sm font-medium hover:bg-red-50 px-3 py-1 rounded-lg transition-colors"
                  >
                    Remove
                  </button>
                </div>
              </div>

              <!-- Replace File Button -->
              <label class="block">
                <div
                  class="border border-gray-200 rounded-lg p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div class="flex items-center gap-3">
                    <AppIcon
                      name="iconamoon:refresh-light"
                      class="w-5 h-5 text-gray-500"
                    />
                    <div>
                      <p class="text-sm font-medium text-gray-700">
                        Want to upload a different file?
                      </p>
                      <p class="text-xs text-gray-500">
                        Click to replace current file
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    class="hidden"
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    @change="handleFile"
                    :disabled="isImageLoading"
                  />
                </div>
              </label>
            </div>

            <!-- Loading State -->
            <div
              v-if="isImageLoading"
              class="border border-gray-200 rounded-xl p-6"
            >
              <div class="flex items-center gap-4">
                <div
                  class="animate-spin rounded-full h-8 w-8 border-b-2 border-[#28a076]"
                ></div>
                <div>
                  <p class="font-medium text-gray-700">Uploading file...</p>
                  <p class="text-sm text-gray-500">
                    Please wait while we upload your resume
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Cover Letter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Cover Letter <span class="text-gray-400">(Optional)</span>
            </label>
            <textarea
              v-model="application.cover_letter"
              rows="6"
              placeholder="Tell us why you're the perfect candidate for this position..."
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#28a076] focus:border-transparent transition-all outline-none resize-none"
            ></textarea>
            <p class="text-xs text-gray-500 mt-2">
              Briefly describe your qualifications and why you're interested in
              this role
            </p>
          </div>

          <!-- Submit Button -->
          <div class="pt-4">
            <div
              @click="addApplication"
              :disabled="isLoading || !isFormValid"
              class="w-full p-4 rounded-lg text-white font-medium transition-all duration-200 flex items-center justify-center gap-2"
              :class="
                isLoading || !isFormValid
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-[#28a076] hover:bg-[#229167] shadow-md hover:shadow-lg'
              "
            >
              <AppIcon
                v-if="isLoading"
                name="iconamoon:spinner-light"
                class="w-5 h-5 animate-spin"
              />
              {{
                isLoading ? "Submitting Application..." : "Submit Application"
              }}
            </div>

            <!-- Form Validation Message -->
            <p
              v-if="!isFormValid"
              class="text-sm text-amber-600 mt-3 text-center"
            >
              Please fill in all required fields and upload your resume
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { apply } from "@/services/auth.recuitment";
import { useToast } from "vue-toastification";
import { uploadFile } from "@/services/auth.employees";
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "ApplyView",
  setup() {
    const isImageLoading = ref(false);
    const toast = useToast();
    const route = useRoute();
    const router = useRouter();
    const jobId = route.params.id;
    const isLoading = ref(false);
    const uploadedFile = ref(null);

    let browserId = localStorage.getItem("browser_id");
    if (!browserId) {
      browserId = generateBrowserId();
      localStorage.setItem("browser_id", browserId);
    }

    const application = ref({
      full_name: "",
      email: "",
      phone_number: "",
      resume: "",
      cover_letter: "",
      browser_id: browserId,
    });

    // Form validation computed property
    const isFormValid = computed(() => {
      return (
        application.value.full_name.trim() &&
        application.value.email.trim() &&
        application.value.phone_number.trim() &&
        application.value.resume
      );
    });

    const generateBrowserId = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from({ length: 30 }, () =>
        chars.charAt(Math.floor(Math.random() * chars.length))
      ).join("");
    };

    const handleFile = async (event) => {
      const file = event.target.files[0];
      if (!file) return;

      const allowedTypes = [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "image/png",
        "image/jpeg",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error(
          "Invalid file format. Please upload PDF, PNG, or JPG files."
        );
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File exceeds 5MB limit. Please upload a smaller file.");
        return;
      }

      // Store file info for display
      uploadedFile.value = {
        name: file.name,
        type: file.type,
        size: file.size,
      };

      isImageLoading.value = true;

      try {
        const fileUrl = await uploadToCloudinary(file);
        application.value.resume = fileUrl;

        toast.success("Resume uploaded successfully!", {
          timeout: 3000,
          position: "top-right",
        });
      } catch (error) {
        uploadedFile.value = null;
        application.value.resume = "";
        toast.error("File upload failed. Please try again.");
        console.error(error);
      } finally {
        isImageLoading.value = false;
      }
    };

    const removeFile = () => {
      uploadedFile.value = null;
      application.value.resume = "";
      toast.info("File removed. Please upload a new resume.");
    };

    const extractFileNameFromUrl = (url) => {
      if (!url) return "Uploaded file";
      try {
        const parts = url.split("/");
        const fileName = parts[parts.length - 1];
        // Decode URI encoded file names
        return decodeURIComponent(fileName);
      } catch (error) {
        return "Uploaded file";
      }
    };

    const generateID = () => {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      return Array.from(
        { length: 30 },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join("");
    };

    const uploadToCloudinary = async (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const base64 = reader.result.split(",")[1];

            const payload = {
              public_id: generateID(),
              file: base64,
              action: "upload",
              folder: "hr_mgt/docs",
            };

            const response = await uploadFile(payload);
            const fileUrl = response?.data?.data?.file_url;

            if (!fileUrl) {
              reject("Upload failed");
              return;
            }

            resolve(fileUrl);
          } catch (err) {
            reject(err);
          }
        };

        reader.onerror = () => reject("File reading failed");
        reader.readAsDataURL(file);
      });
    };

    const addApplication = async () => {
      if (!isFormValid.value) {
        toast.warning("Please fill in all required fields before submitting.", {
          timeout: 4000,
          position: "top-right",
        });
        return;
      }

      isLoading.value = true;

      const payload = {
        full_name: application.value.full_name,
        email: application.value.email,
        phone_number: application.value.phone_number,
        resume: application.value.resume,
        cover_letter: application.value.cover_letter,
        browser_id: application.value.browser_id,
      };

      try {
        const response = await apply(jobId, payload);

        if (response?.status === 201) {
          toast.success(
            response.data?.detail || "Application submitted successfully!",
            {
              position: "top-right",
              timeout: 3000,
              closeOnClick: true,
            }
          );

          // Reset form
          application.value = {
            full_name: "",
            email: "",
            phone_number: "",
            resume: "",
            cover_letter: "",
            browser_id: browserId,
          };
          uploadedFile.value = null;

          setTimeout(() => {
            router.push({ name: "home" });
          }, 1500);
        } else if (response?.status === 404 || response?.status === 400) {
          toast.warning(
            response.data?.detail || "You have already applied for this job",
            {
              position: "top-right",
              timeout: 10000,
              closeOnClick: true,
            }
          );
        } else {
          toast.error(response.data?.detail || "Failed to submit application", {
            position: "top-right",
            timeout: 5000,
          });
        }
      } catch (error) {
        toast.error("An error occurred. Please try again.", {
          position: "top-right",
          timeout: 5000,
        });
        console.error(error);
      } finally {
        isLoading.value = false;
      }
    };

    return {
      addApplication,
      application,
      isImageLoading,
      handleFile,
      isLoading,
      uploadedFile,
      removeFile,
      extractFileNameFromUrl,
      isFormValid,
    };
  },
};
</script>

<style scoped>
.truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}
</style>
