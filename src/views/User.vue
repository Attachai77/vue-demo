<template>
  <div class="user">
    <h4>User</h4>
    <div class="container">
      <table class="table table-hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Active</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user._id">
            <td>
              <img
                :src="user.imgUrl"
                width="50"
                alt="..."
                class="img-thumbnail"
              />
            </td>
            <td>{{ user.name }}</td>
            <td>
              <span v-if="user.active" class="badge rounded-pill bg-success"
                >Active</span
              >
              <span v-if="!user.active" class="badge rounded-pill bg-secondary"
                >Inactive</span
              >
            </td>
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
      users: [],
    };
  },
  async mounted(): Promise<void> {
    const res = await axios.get(
      "https://us-central1-hrm---bot-1.cloudfunctions.net/api/users"
    );
    this.users = res?.data?.data;
  },
  methods: {
    moment: function (date: any) {
      return moment(date);
    },
  },
} as any;
</script>
