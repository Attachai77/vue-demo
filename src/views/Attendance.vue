<template>
  <div class="attendance">
    <h4>Time Attendance</h4>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Time</th>
            <th scope="col">Name</th>
            <th scope="col">#</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attandance in attendances" :key="attandance._id">
            <td>{{ moment(attandance?.datetime).format("lll") }}</td>
            <td>{{ attandance?.user?.name }}</td>
            <td>
              <span
                v-if="attandance?.type === `CLOCK_IN`"
                class="badge rounded-pill bg-success"
                >clock in</span
              >
              <span
                v-if="attandance?.type === `CLOCK_OUT`"
                class="badge rounded-pill bg-warning"
                >clock out</span
              >
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import axios from "axios";
import moment from "moment";

export default defineComponent({
  name: "Attendance",
  data() {
    return {
      attendances: [],
    };
  },
  created() {
    document.title = "Time Attendance";
  },
  async mounted(): Promise<void> {
    const attandances = await axios.get(
      "https://us-central1-hrm---bot-1.cloudfunctions.net/api/attendances"
    );
    this.attendances = attandances?.data?.data;
  },
  methods: {
    moment: function (date: any) {
      return moment(date);
    },
  },
});
</script>
