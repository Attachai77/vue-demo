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
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Pending</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>@mdo</td>
            <td>-</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "LeaveRequest",
});
</script>
