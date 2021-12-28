<template>
  <div class="home">
    <div class="container-fluid">
      <div class="row no-gutter">
        <div class="col-md-3 d-none d-md-flex bg-image"></div>
        <div class="col-md-6 bg-light">
          <div class="d-flex align-items-center py-5">
            <div class="container">
              <div class="row">
                <div class="col-lg-10 col-xl-7 mx-auto">
                  <p class="text-muted mb-4">+ Leave request</p>
                  <form>
                    <div class="mb-3">
                      <select
                        class="form-select rounded-pill border-0 shadow-sm px-4"
                        v-model="requestType"
                      >
                        <option value selected>Leave type</option>
                        <option value="sick">Sick leave</option>
                        <option value="vacation">Vacation leave</option>
                        <option value="business">Business leave</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <select
                        class="form-select rounded-pill border-0 shadow-sm px-4"
                        v-model="duration"
                      >
                        <option selected value>Duration</option>
                        <option value="fullday">Full Day</option>
                        <option value="halfday">Half Day</option>
                      </select>
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="dateFrom"
                        type="date"
                        class="
                          form-control
                          rounded-pill
                          border-0
                          shadow-sm
                          px-4
                        "
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="dateTo"
                        type="date"
                        class="
                          form-control
                          rounded-pill
                          border-0
                          shadow-sm
                          px-4
                        "
                      />
                    </div>
                    <div class="mb-3">
                      <input
                        v-model="note"
                        type="text"
                        placeholder="Note"
                        autofocus
                        class="
                          form-control
                          rounded-pill
                          border-0
                          shadow-sm
                          px-4
                        "
                      />
                    </div>
                    <div class="d-grid gap-2 mt-2">
                      <button
                        type="button"
                        v-on:click="createLeave"
                        class="
                          btn btn-primary btn-block
                          text-uppercase
                          mb-2
                          rounded-pill
                          shadow-sm
                        "
                      >
                        Create Leave
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
// import store from "@/store";
import liff from "@line/liff";
import axios from "axios";
import { defineComponent, onMounted } from "vue";
import { useStore } from "@/store";
const store = useStore();

export default defineComponent({
  name: "CreateLeaveRequest",
  data: () => {
    return {
      requestType: "",
      duration: "",
      dateFrom: "",
      dateTo: "",
      note: "",
    };
  },
  setup() {
    onMounted(() => {
      liff
        .init({
          liffId: "1656744437-EGqm62Xl",
        })
        .then(() => {
          if (liff.isLoggedIn()) {
            const token = liff.getAccessToken();
            console.log({ token });
            liff.getProfile().then((profile) => {
              store.dispatch("setLine", { ...profile, token });
            });
          } else {
            liff.login();
          }
        });
    });
  },
  methods: {
    createLeave: async function () {
      const payload = {
        requestType: this.requestType,
        duration: this.duration,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo,
        note: this.note,
      };

      try {
        const resp = await axios.post(
          "https://us-central1-hrm---bot-1.cloudfunctions.net/api/leave-request",
          payload,
          {
            headers: {
              Authorization: `Bearer ${store.getters.getLine.token}`,
            },
          }
        );

        if (resp.data.success) {
          // setTimeout(() => {
          //   liff.closeWindow();
          // }, 1500);
          liff.closeWindow();
        } else {
          //should check token has exprired here
          alert(JSON.stringify({ error: resp.data }));
          liff.login();
        }
      } catch (error) {
        console.log({ error });
      }
    },
  },
}) as any;
</script>
