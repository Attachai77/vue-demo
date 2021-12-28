<template>
  <div class="home">
    <h4>Leave request</h4>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Employee name</th>
            <th scope="col">Leave type</th>
            <th scope="col">Duration</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
            <th scope="col">Approver</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="leave in leaves" :key="leave._id">
            <th scope="row">{{ leave?.status }}</th>
            <td>{{ leave?.requesterId?.name }}</td>
            <td>{{ leave.requestType }}</td>
            <td>{{ leave.duration }}</td>
            <td>{{ moment(leave.dateFrom) }}</td>
            <td>{{ moment(leave.dateTo) }}</td>
            <td>{{ leave?.approverId?.name }}</td>
            <td><i class="bi-eye"></i></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import { defineComponent } from "vue";

export default defineComponent({
  name: "LeaveRequest",
  data() {
    return {
      leaves: [],
    };
  },
  async mounted(): Promise<void> {
    const resp = await axios.get(
      "https://us-central1-hrm---bot-1.cloudfunctions.net/api/leave-request"
    );
    this.leaves = resp?.data?.data ?? [];
  },
  methods: {
    moment: function (date: any) {
      if (!date) {
        return "-";
      }
      return moment(date).format("DD MMM YYYY");
    },
  },
});
</script>
