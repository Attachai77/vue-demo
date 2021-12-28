<template>
  <div class="ActivateQRCode">
    <h5>Please scan your QR Code to activate account</h5>
    <h5>{{ result }}</h5>
  </div>
</template>

<script lang="ts">
import liff from "@line/liff";
import { defineComponent } from "vue";

export default defineComponent({
  name: "ActivateQRCode",
  data() {
    return {
      result: "...",
    };
  },
  async mounted(): Promise<void> {
    await liff.init({ liffId: "1656744437-lr3yZB49" });
    if (!liff.isLoggedIn()) {
      liff.login();
    } else {
      const result = await liff.scanCodeV2();
      this.result = result.value as string;
      this.$router.push(`/activate/${this.result}`);
    }
  },
});
</script>
