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
            <th scope="col">Activated</th>
            <th scope="col">Activate QR-Code</th>
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
            <td>
              <span v-if="user.activated" class="badge rounded-pill bg-success"
                >Yes</span
              >
              <span
                v-if="!user.activated"
                class="badge rounded-pill bg-secondary"
                >No</span
              >
            </td>
            <td>
              <i
                v-on:click="openQRCodeModal(user.userId)"
                class="bi bi-qr-code"
                style="cursor: pointer"
              ></i>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="showModal" class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header"> Scan QR-Code to activate account</slot>
          </div>

          <div class="modal-body">
            <canvas id="canvas"></canvas>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-info" v-on:click="closeModal">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  display: block;
  margin-top: 1rem;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.5s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.btn-info {
  color: #fff;
}
</style>

<script lang="ts">
import axios from "axios";
import moment from "moment";
import { defineComponent } from "vue";
import QRCode from "qrcode";

export default defineComponent({
  name: "User",
  data() {
    return {
      users: [],
      showModal: false,
      userId: "",
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
    openQRCodeModal: function (userId: string) {
      this.showModal = true;
      this.userId = userId;

      setTimeout(() => {
        const canvas = document.getElementById("canvas");

        QRCode.toCanvas(canvas, userId, function (error: any) {
          if (error) console.error(error);
          console.log("success!");
        });
      }, 1500);

      // setTimeout(() => {
      // this.showModal = true;
      // }, 1000);
    },
    closeModal: function () {
      this.showModal = false;
    },
  },
});
</script>
