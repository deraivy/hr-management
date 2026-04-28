<template>
  <!-- Unified Document Upload Section -->
  <div class="mb-6 bg-white rounded-lg p-6 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-900">Documents</h2>
      <button
        class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
        @click="$refs.fileInput.click()"
      >
        <AppIcon icon="lets-icons:add-light" class="w-6 h-6 text-gray-400" />
      </button>
    </div>

    <!-- Document Type Selection -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-2">
        Document Type
      </label>
      <div class="flex gap-4">
        <div
          @click="selectedDocumentType = 'personal'"
          :class="[
            'flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200',
            selectedDocumentType === 'personal'
              ? 'border-blue-500 bg-blue-50 text-blue-700'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400',
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <AppIcon icon="mdi:file-document-outline" class="w-5 h-5" />
            <span>Personal Document</span>
          </div>
        </div>
        <div
          @click="selectedDocumentType = 'payslip'"
          :class="[
            'flex-1 py-3 px-4 rounded-lg border-2 transition-all duration-200',
            selectedDocumentType === 'payslip'
              ? 'border-green-500 bg-green-50 text-green-700'
              : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400',
          ]"
        >
          <div class="flex items-center justify-center gap-2">
            <AppIcon icon="mdi:currency-usd" class="w-5 h-5" />
            <span>Payslip</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Area -->
    <div
      class="flex flex-col items-center justify-center border-2 border-dashed rounded-lg py-8 transition-colors duration-200 cursor-pointer relative"
      :class="[
        selectedDocumentType === 'personal'
          ? 'border-blue-300 hover:bg-blue-50'
          : 'border-green-300 hover:bg-green-50',
      ]"
      @dragover.prevent
      @drop.prevent="handleDrop"
      @click="$refs.fileInput.click()"
    >
      <AppIcon
        :icon="
          selectedDocumentType === 'personal'
            ? 'mdi:file-document-outline'
            : 'mdi:currency-usd'
        "
        class="w-16 h-16 mb-4"
        :class="
          selectedDocumentType === 'personal'
            ? 'text-blue-400'
            : 'text-green-400'
        "
      />
      <h2 class="font-bold text-gray-900 text-xl mb-2">
        Drag and drop or click to upload
      </h2>
      <p class="text-gray-500 mb-4">
        {{
          selectedDocumentType === "personal"
            ? "Upload personal documents (CV, Certificates, IDs, etc.)"
            : "Upload salary slips and payment documents"
        }}
      </p>
      <div
        class="text-white py-3 px-4 rounded-lg flex items-center space-x-2"
        :class="
          selectedDocumentType === 'personal' ? 'bg-blue-600' : 'bg-green-600'
        "
      >
        <AppIcon icon="mdi:file-upload-outline" class="w-6 h-6 text-white" />
        <span>
          Upload
          {{
            selectedDocumentType === "personal"
              ? "Personal Document"
              : "Payslip"
          }}
        </span>
      </div>
      <input
        ref="fileInput"
        type="file"
        accept="image/*,.pdf,.doc,.docx"
        class="hidden"
        @change="handleFileChange"
      />
    </div>
  </div>

  <!-- Loading State -->
  <div
    v-if="loading"
    class="mb-6 bg-white rounded-lg p-6 border border-gray-100"
  >
    <div class="flex items-center justify-center py-8">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"
      ></div>
      <span class="ml-3 text-gray-600">Loading documents...</span>
    </div>
  </div>

  <!-- Unified Documents Table -->
  <div v-else class="mb-6 bg-white rounded-lg p-6 border border-gray-100">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-gray-900">All Documents</h2>
      <div class="flex items-center gap-4">
        <!-- Document Type Filter -->
        <select
          v-model="documentFilter"
          class="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Documents</option>
          <option value="personal">Personal Documents</option>
          <option value="payslip">Payslips</option>
        </select>
        <span class="text-sm text-gray-500">
          {{ filteredDocuments.length }} documents
        </span>
        <button
          @click="fetchDocuments"
          class="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
          title="Refresh"
        >
          <AppIcon icon="mdi:refresh" class="w-5 h-5 text-gray-400" />
        </button>
      </div>
    </div>

    <div class="overflow-x-auto rounded-lg">
      <table class="w-full table-auto" v-if="filteredDocuments.length > 0">
        <thead>
          <tr
            class="bg-gray-100 text-gray-600 uppercase text-xs leading-normal"
          >
            <th class="py-3 px-6 text-left">Document Name</th>
            <th class="py-3 px-6 text-center">Type</th>
            <th class="py-3 px-6 text-center">Upload Date</th>
            <th class="py-3 px-6 text-center">Actions</th>
          </tr>
        </thead>
        <tbody class="text-gray-600 text-sm">
          <tr
            v-for="doc in filteredDocuments"
            :key="doc.id"
            class="border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200"
          >
            <td class="py-4 px-6 text-left">
              <span class="flex items-center gap-2">
                <AppIcon
                  :icon="
                    doc.file_type === 'personal'
                      ? 'mdi:file-document-outline'
                      : 'mdi:currency-usd'
                  "
                  class="w-5 h-5"
                  :class="
                    doc.file_type === 'personal'
                      ? 'text-blue-400'
                      : 'text-green-400'
                  "
                />
                {{ doc.file_name }}
              </span>
            </td>
            <td class="py-4 px-6 text-center">
              <span
                class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium"
                :class="
                  doc.file_type === 'personal'
                    ? 'bg-blue-100 text-blue-800'
                    : 'bg-green-100 text-green-800'
                "
              >
                <AppIcon
                  :icon="
                    doc.file_type === 'personal'
                      ? 'mdi:file-document-outline'
                      : 'mdi:currency-usd'
                  "
                  class="w-3 h-3 mr-1"
                />
                {{ doc.file_type === "personal" ? "Personal" : "Payslip" }}
              </span>
            </td>
            <td class="py-4 px-6 text-center text-gray-500">
              {{ formatDate(doc.created_at) }}
            </td>
            <td class="py-4 px-6 text-center">
              <div class="flex items-center justify-center gap-3">
                <a
                  :href="doc.file_url"
                  target="_blank"
                  class="transform hover:text-green-600 hover:scale-110 transition-transform duration-200"
                  title="View"
                >
                  <AppIcon icon="mdi:eye" class="w-5 h-5" />
                </a>

                <button
                  class="transform hover:text-red-600 hover:scale-110 transition-transform duration-200"
                  title="Delete"
                  @click="deleteDocument(doc)"
                >
                  <AppIcon icon="mdi:delete" class="w-5 h-5" />
                </button>
                <button
                  class="transform hover:text-purple-600 hover:scale-110 transition-transform duration-200"
                  title="Download"
                  @click="downloadDocument(doc)"
                >
                  <AppIcon icon="mdi:download" class="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else class="text-center py-8 text-gray-500">
        <AppIcon
          icon="mdi:file-document-outline"
          class="w-12 h-12 mx-auto mb-2 text-gray-300"
        />
        <p v-if="documentFilter === 'all'">No documents uploaded yet</p>
        <p v-else-if="documentFilter === 'personal'">
          No personal documents uploaded yet
        </p>
        <p v-else>No payslips uploaded yet</p>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  uploadFile,
  uploadDocument,
  oneEmployee,
} from "../services/auth.employees";
import { useToast } from "vue-toastification";

export default {
  name: "DocumentView",
  setup() {
    const toast = useToast();
    const route = useRoute();
    const docLoading = ref(false);
    const loading = ref(true);
    const documents = reactive([]);
    const fileInput = ref(null);
    const selectedDocumentType = ref("personal");
    const documentFilter = ref("all");

    const userId = ref(route.params.id);

    // Computed property for filtered documents
    const filteredDocuments = computed(() => {
      if (documentFilter.value === "all") {
        return documents;
      }
      return documents.filter((doc) => doc.file_type === documentFilter.value);
    });

    // Fetch documents from backend
    const fetchDocuments = async () => {
      try {
        loading.value = true;
        console.log("Fetching documents for user:", userId.value);

        const response = await oneEmployee(userId.value);
        console.log("Documents API response:", response);

        // Clear existing documents
        documents.length = 0;

        // Process the nested response structure
        if (response?.data?.document) {
          const { personal = [], payslip = [] } = response.data.document;

          // Combine personal and payslip documents into one array
          const allDocuments = [
            ...personal.map((doc) => ({ ...doc, file_type: "personal" })),
            ...payslip.map((doc) => ({ ...doc, file_type: "payslip" })),
          ];

          // Sort by creation date (newest first)
          allDocuments.sort(
            (a, b) => new Date(b.created_at) - new Date(a.created_at)
          );

          // Add to reactive array
          documents.push(...allDocuments);

          console.log("Processed documents:", documents);
        } else {
          console.warn("No document data found in response");
        }
      } catch (error) {
        console.error("Error fetching documents:", error);
        toast.error("Failed to load documents.");
      } finally {
        loading.value = false;
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
      try {
        const reader = new FileReader();
        return new Promise((resolve, reject) => {
          reader.onload = async () => {
            const fileBase64 = reader.result?.split(",")[1];
            if (!fileBase64) {
              reject(new Error("Failed to read file."));
              return;
            }
            const data = {
              public_id: generateID(),
              file: fileBase64,
              action: "upload",
              folder: "hr_mgt/docs",
            };

            const response = await uploadFile(data);
            const fileUrl = response?.data?.data?.file_url;

            console.log("Extracted file URL:", fileUrl);

            if (!fileUrl) {
              console.error("Cloudinary response structure:", response);
              reject(
                new Error("Failed to get file URL from Cloudinary response.")
              );
              return;
            }

            resolve(fileUrl);
          };
          reader.onerror = () => reject(new Error("File reading failed."));
          reader.readAsDataURL(file);
        });
      } catch (error) {
        console.error("Cloudinary upload error:", error);
        toast.error("Failed to upload document to Cloudinary.");
        throw error;
      }
    };

    const saveMetadataToBackend = async (fileName, fileUrl, fileType) => {
      if (!userId.value) {
        throw new Error("User ID not found in route params.");
      }

      const payload = {
        file_name: fileName,
        file_url: fileUrl,
        file_type: fileType,
        user_id: userId.value,
      };

      console.log("Saving to backend:", payload);
      return await uploadDocument(payload);
    };

    const handleFileChange = async (event) => {
      const file = event.target.files?.[0];
      if (!file) {
        toast.error("No file selected.");
        return;
      }

      if (!selectedDocumentType.value) {
        toast.error("Please select a document type first.");
        return;
      }

      const allowedTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];

      if (!allowedTypes.includes(file.type)) {
        toast.error("Invalid file type. Allowed: Images, PDF, DOC, DOCX.");
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        toast.error("File must be less than 5MB.");
        return;
      }

      try {
        docLoading.value = true;

        // 1️⃣ Upload file to Cloudinary
        const fileUrl = await uploadToCloudinary(file);
        console.log("Uploaded file URL:", fileUrl);

        // 2️⃣ Send metadata to backend with selected document type
        const backendResponse = await saveMetadataToBackend(
          file.name,
          fileUrl,
          selectedDocumentType.value
        );
        console.log("Backend response:", backendResponse);

        // 3️⃣ Refresh the documents list to include the new one
        await fetchDocuments();

        toast.success(
          `${
            selectedDocumentType.value === "personal"
              ? "Personal document"
              : "Payslip"
          } uploaded successfully!`
        );
      } catch (error) {
        console.error("Upload error:", error);

        if (error.response?.data?.detail) {
          toast.error(`Backend error: ${error.response.data.detail}`);
        } else {
          toast.error(error.message || "Document upload failed.");
        }
      } finally {
        docLoading.value = false;
        if (fileInput.value) fileInput.value.value = "";
      }
    };

    const handleDrop = async (event) => {
      const file = event.dataTransfer.files?.[0];
      if (file) {
        const syntheticEvent = { target: { files: [file] } };
        await handleFileChange(syntheticEvent);
      }
    };

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    };

    const editDocument = (doc) => {
      toast.info(`Edit ${doc.file_type} document: ${doc.file_name}`);
    };

    const deleteDocument = async (doc) => {
      if (confirm(`Are you sure you want to delete "${doc.file_name}"?`)) {
        try {
          // Here you would call your delete API endpoint
          // await deleteDocumentAPI(doc.id);

          // For now, just remove from local state
          const index = documents.findIndex((d) => d.id === doc.id);
          if (index > -1) {
            documents.splice(index, 1);
            toast.success("Document deleted successfully!");
          }
        } catch (error) {
          console.error("Error deleting document:", error);
          toast.error("Failed to delete document.");
        }
      }
    };

    const downloadDocument = (doc) => {
      const link = document.createElement("a");
      link.href = doc.file_url;
      link.download = doc.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("Document download started!");
    };

    // Fetch documents when component mounts
    onMounted(() => {
      fetchDocuments();
    });

    return {
      docLoading,
      loading,
      documents,
      filteredDocuments,
      fileInput,
      selectedDocumentType,
      documentFilter,
      handleFileChange,
      handleDrop,
      editDocument,
      deleteDocument,
      downloadDocument,
      formatDate,
      fetchDocuments,
    };
  },
};
</script>
