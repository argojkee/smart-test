<template>
  <li @click="($event) => onUserDetails($event, user.id)" class="user-item">
    <img :src="user.avatar" alt="{{user.first_name}}" />
    <div class="userInfo">
      <h2>{{ user.last_name }} {{ user.first_name }}</h2>
      <p>{{ user.email }}</p>
    </div>

    <button
      class="delete-btn"
      :disabled="isLoading"
      @click="() => deleteUser(user.id)"
    >
      <v-icon
        v-show="!isLoading"
        name="ri-delete-bin-6-line"
        fill="white"
        scale="1.5"
      />
      <v-icon
        v-show="isLoading"
        name="fa-spinner"
        animation="spin-pulse"
        fill="white"
        scale="1.5"
      />
    </button>
  </li>
</template>

<script>
import EventBus from "../../EventBus";
import { toastSuccess, toastError } from "@/services/toastService";
import { deleteUserApi } from "../../services/reqresService";
export default {
  data() {
    return {
      isLoading: false,
    };
  },

  props: {
    user: {
      type: Object,
      required: true,
    },
  },
  emits: ["OpenModalBus"],

  methods: {
    onUserDetails(e, userId) {
      const { tagName } = e.target;
      if (tagName === "BUTTON" || tagName === "svg" || tagName === "path") {
        return;
      }
      EventBus.emit("OpenModalBus", {
        type: "details",
        userId,
      });
    },
    async deleteUser(userId) {
      try {
        this.isLoading = true;
        await deleteUserApi(userId);

        toastSuccess(`${this.user.first_name} has been successfully deleted`);
      } catch (error) {
        toastError("Sorry, something went wrong. Please, try again");
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style>
.user-item {
  cursor: pointer;
  border: 1px solid tomato;
  margin-bottom: 10px;
  border-radius: 16px;
  display: flex;
  padding: 8px 16px;
  align-items: center;
  justify-content: space-between;
}

.delete-btn {
  background-color: rgb(255, 0, 0);
  padding: 6px;
  border-radius: 50%;
  border: none;
  cursor: pointer;
}

.delete-btn:hover,
.delete-btn:focus {
  background-color: rgba(255, 0, 0, 0.5);
}

@media screen and (max-width: 767px) {
  .user-item {
    flex-direction: column;
  }
}
</style>
