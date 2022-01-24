<template>
  <div class="Activate">
    <div v-if="isLoading" class="text-center">
      <div
        class="spinner-border text-success m-5"
        style="width: 3rem; height: 3rem"
        role="status"
      ></div>
    </div>
    <h5 class="text-success" v-if="activated && activatedResult">
      Your account has been activated
    </h5>
    <h5 class="text-danger" v-if="activated && !activatedResult">
      Your account has not been activated, Something went wrong ...
    </h5>
    <button
      v-if="activated"
      v-on:click="closeLiffWindows"
      type="button"
      class="btn btn-info"
    >
      Done
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import liff from "@line/liff";
import axios from "axios";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "Activate",
  created() {
    document.title = "Scan QR";
  },
  data() {
    return {
      QRCodeResult: "Something ...",
      isLoading: false,
      activated: false,
      activatedResult: false,
    };
  },
  async mounted(): Promise<void> {
    const route = useRoute();
    const userId = route.params.userId as string;
    await this.activateStaff(userId);
  },
  methods: {
    async activateStaff(userId: string) {
      this.isLoading = true;
      try {
        const resp = await axios.get(
          `https://us-central1-hrm---bot-1.cloudfunctions.net/api/users/${userId}/activate`
        );
        this.activatedResult = resp.data.success;
      } catch (error) {
        console.log("activateStaff", error);
      }

      setTimeout(() => {
        this.isLoading = false;
        this.activated = true;
      }, 2000);
    },
    async closeLiffWindows() {
      await liff.closeWindow();
    },
  },
});
</script>
