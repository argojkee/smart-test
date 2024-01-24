<template>
  <div class="filter-container">
    <input
      class="filter-input"
      :disabled="!filter.nameFilter && !filter.emailFilter"
      :placeholder="currentPlaceholder"
      v-model="filter.text"
      name="text"
      @input="changeFilter"
    />
    <div class="label-container">
      <label class="filter-label">
        Email
        <input
          type="checkbox"
          name="email"
          @change="changeFilter"
          v-model="filter.emailFilter"
        />
      </label>
      <label class="filter-label">
        Name
        <input
          type="checkbox"
          name="name"
          @change="changeFilter"
          v-model="filter.nameFilter"
        />
      </label>
    </div>
  </div>
</template>

<script>
import EventBus from "@/EventBus";

export default {
  name: "UsersFilter",
  data() {
    return {
      filter: {
        text: "",
        emailFilter: false,
        nameFilter: false,
      },
      currentPlaceholder: "Select filter and enter filter value",
    };
  },
  emits: ["onChangeFilter"],

  methods: {
    changeFilter({ target }) {
      if (!this.filter.emailFilter && !this.filter.nameFilter) {
        this.currentPlaceholder = "Select filter and enter filter value";
      } else {
        this.currentPlaceholder = "Enter filter value";
      }
      EventBus.emit("onChangeFilter", {
        ...this.filter,
        [target.name]: target.value,
      });
    },
  },
};
</script>

<style scope>
.filter-container {
  margin-top: 20px;
}
.filter-input {
  width: 100%;
  max-width: 100%;
  padding: 8px 16px;
  font-size: 16px;
  border: 1px solid gray;
  outline: none;
  border-radius: 16px;
}

.label-container {
  display: flex;
  margin-top: 10px;
  padding-left: 10px;
}

.filter-label {
  display: flex;
  column-gap: 6px;
  color: gray;
}
</style>
