<template>
  <ul class="users-list">
    <UserItem v-for="user in filterUsers()" :key="user.id" :user="user" />
  </ul>
</template>

<script>
import { fetchAllUsers, deleteUserApi } from "../../services/reqresService";
import { toastSuccess, toastError } from "@/services/toastService";
import EventBus from "@/EventBus";
import UserItem from "../UserItem/UserItem.vue";

export default {
  name: "UsersList",
  data() {
    return {
      users: [],
      filter: {
        text: "",
        emailFilter: false,
        nameFilter: false,
      },
    };
  },
  created() {
    EventBus.on("onChangeFilter", (data) => {
      this.filter = { ...data };
    });
  },
  components: {
    UserItem,
  },
  emits: ["OpenModalBus"],

  methods: {
    filterUsers() {
      const { text, nameFilter, emailFilter } = this.filter;
      const { users } = this;
      if (!text || (!nameFilter && !emailFilter)) {
        return users;
      } else if (text && nameFilter && emailFilter) {
        return users.filter(
          (user) => user.first_name.includes(text) || user.email.includes(text)
        );
      } else if (text && nameFilter && !emailFilter) {
        return users.filter((user) => user.first_name.includes(text));
      } else if (text && emailFilter && !nameFilter) {
        return users.filter((user) => user.email.includes(text));
      }
    },

    async fetchUsers() {
      const data = await fetchAllUsers();
      this.users = data;
    },

    async deleteUser(userId) {
      try {
        const userDeleted = this.users.find((user) => user.id === userId);
        await deleteUserApi(userId);
        toastSuccess(`${userDeleted.first_name} has been successfully deleted`);
      } catch (error) {
        toastError("Sorry, something went wrong. Please, try again");
      }
    },
  },

  mounted() {
    this.fetchUsers();
  },
};
</script>

<style>
.users-list {
  list-style: none;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  @media screen and (min-width: 768px) {
    width: 80%;
  }
}
</style>
