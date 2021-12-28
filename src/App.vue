<template>
  <div v-if="isWeb" id="nav">
    <router-link to="/">Home</router-link>|
    <router-link to="/user">User</router-link>|
    <router-link to="/attendance">Attendance</router-link>|
    <router-link to="/leave-request">Leave request</router-link>|
    <router-link to="/create-leave-request">Create Leave request</router-link>|
    <router-link to="/activate-staff-qr-code">Activate</router-link>
  </div>
  <router-view />
</template>

<script lang="ts">
import liff from "@line/liff";
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
const store = useStore();

export default defineComponent({
  name: "App",
  data: () => {
    return {
      isWeb: false,
    };
  },
  mounted(): any {
    this.isWeb = store.getters.getOS === "web";
  },
  setup() {
    onMounted(() => {
      if (store.getters.getOS === "") {
        const OS = liff.getOS();
        store.dispatch("setOS", OS);
      }
    });
  },
}) as any;
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
