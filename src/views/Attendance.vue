<template>
  <div class="attendance">
    <h4>Employee Attendance</h4>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Clock In / CLock Out</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="attandance in attendances" :key="attandance._id">
            <th scope="row">1</th>
            <td>{{ attandance?.user?.name }}</td>
            <td>{{ attandance?.type }}</td>
            <td>{{ moment(attandance?.datetime).format('lll') }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import moment from "moment";

export default {
  name: "App",
  data() {
    return {
      attendances: [],
      user: "xxxx",
    };
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
  }
},
} as any;
</script>
