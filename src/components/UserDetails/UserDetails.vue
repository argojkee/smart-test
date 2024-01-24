<template>
  <h2 class="modal-title">{{ title }}</h2>
  <div v-if="user">
    <h3 class="user-name-details">
      {{ user.first_name }} {{ user.last_name }}
    </h3>
    <p></p>
    <img class="details-user-img" :src="user.avatar" />
    <p class="user-details-email">{{ user.email }}</p>
    <EditUserForm :userId="userId" />
  </div>
</template>

<script>
import { getUserById } from "../../services/reqresService";
import EditUserForm from "../EditUserForm/EditUserForm.vue";
export default {
  name: "UserDetails",
  data() {
    return {
      user: null,
    };
  },
  props: {
    userId: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },

  async beforeMount() {
    const { data: userInfo } = await getUserById(this.userId);
    this.user = { ...userInfo };
  },

  components: {
    EditUserForm,
  },
};
</script>
<style>
.user-name-details {
  margin-top: 20px;
  margin-bottom: 0;
}

.details-user-img {
  border-radius: 50%;
  border: 1px solid black;
}

.user-details-email {
  color: green;
}
</style>
