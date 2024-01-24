<template>
  <div class="container">
    <button class="add-btn" @click="openModal('form')">
      <v-icon
        name="io-person-add-sharp"
        fill="white"
        scale="1.5"
        animation="flash"
        speed="slow"
      />
    </button>
    <UsersFilter />
    <UsersList />
  </div>

  <Modal
    :userId="this.userIdDetails"
    :componentType="componentType"
    @close="closeModal"
    v-if="isShowModal"
  />
</template>

<script>
import UsersList from "./components/UsersList/UsersList.vue";
import Modal from "./components/Modal/Modal";
import UsersFilter from "./components/UsersFilter/UsersFilter.vue";
import EventBus from "./EventBus";

export default {
  name: "App",
  data() {
    return {
      isShowModal: false,
      componentType: null,
      userIdDetails: null,
    };
  },

  emits: ["close"],
  created() {
    EventBus.on("OpenModalBus", (data) => {
      this.userIdDetails = data.userId;
      this.openModal(data.type);
    });
    EventBus.on("closeModalBus", () => {
      this.closeModal();
    });
  },

  methods: {
    openModal(type) {
      this.componentType = type;
      this.isShowModal = true;
      let paddingOffSet = window.innerWidth - document.body.offsetWidth + "px";
      document.body.style.paddingRight = paddingOffSet;
      document.body.classList.add("modal-open");
    },
    closeModal() {
      this.isShowModal = false;
      this.componentType = null;
      this.userIdDetails = null;
      document.body.style.paddingRight = 0;
      document.body.classList.remove("modal-open");
    },
  },

  components: {
    UsersList,
    Modal,
    UsersFilter,
  },
};
</script>

<style>
* {
  box-sizing: border-box;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body.modal-open {
  overflow: hidden;
}

ul {
  padding-left: 0;
}
.container {
  max-width: 1400px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 16px;
  padding-right: 16px;
  display: flex;
  flex-direction: column;
  padding-top: 16px;
}

.add-btn {
  border-radius: 50%;
  width: 60px;
  height: 60px;
  justify-content: center;
  align-items: center;
  background-color: orange;
  cursor: pointer;
  border: none;
  transition: background-color 250ms linear;
  margin-left: auto;
}

.add-btn:hover,
.add-btn:focus {
  background-color: rgba(0, 128, 0, 0.6);
}
</style>
