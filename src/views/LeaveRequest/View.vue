<template>
  <div class="view-leave-request">
    <div class="container">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title" v-html="displayStatus()"></h5>

          <h6 class="card-subtitle mb-2 text-muted mt-3">
            {{ leave?.requesterId?.name || "-" }}
          </h6>

          <label
            >Request type: <span>{{ leave.requestType }}</span></label
          ><br />
          <label
            >Duration: <span>{{ leave.duration }}</span></label
          ><br />
          <label
            >From: <span>{{ moment(leave.dateFrom) }}</span></label
          ><br />
          <label
            >To: <span>{{ moment(leave.dateTo) }}</span></label
          ><br />
          <label
            >Note: <span>{{ leave.note }}</span></label
          ><br />
          <label
            >Approver name:
            <span>{{ leave?.approverId?.name || "-" }}</span></label
          >
        </div>
      </div>
      <div class="text-center">
        <button
          type="button"
          class="btn btn-primary mt-5"
          v-on:click="closeLiff"
        >
          Close
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.view-leave-request {
  text-align: left;
}
label {
  font-weight: bold;
  margin-top: 5px;
}
span {
  font-weight: normal;
}
</style>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import liff from "@line/liff";
import { defineComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "ViewLeaveRequest",
  data() {
    return {
      leave: {
        status: "",
      },
    };
  },
  created() {
    document.title = "Leave Request";
  },
  async mounted(): Promise<void> {
    const route = useRoute();
    const leaveRequestId = route.params.id as string;
    const resp = await axios.get(
      `https://us-central1-hrm---bot-1.cloudfunctions.net/api/leave-request/${leaveRequestId}`
    );

    this.leave = resp?.data?.data ?? {};
  },
  methods: {
    moment: function (date: any) {
      if (!date) {
        return "-";
      }
      return moment(date).format("DD MMM YYYY");
    },
    displayStatus: function () {
      switch (this.leave?.status) {
        case "APPROVED":
          return `<span class="badge rounded-pill bg-success">Approved</span>`;
        case "REJECTED":
          return `<span class="badge rounded-pill bg-danger">Rejected</span>`;
        default:
          return `<span class="badge rounded-pill bg-secondary">-</span>`;
      }
    },
    closeLiff: async function () {
      liff.closeWindow();
    },
  },
});
</script>
