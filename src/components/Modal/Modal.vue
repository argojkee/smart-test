<template>
  <div class="backdrop" @click="onBackdropClick">
    <div class="modal">
      <button class="close-btn" @click="closeModal">
        <v-icon name="io-close" fill="black" scale="1" />
      </button>
      <AddForm
        v-if="componentType === 'form'"
        @user-added="closeModal"
        title="Add form"
      />
      <UserDetails
        v-if="componentType === 'details'"
        :userId="userId"
        title="User details"
      />
    </div>
  </div>
</template>

<script>
import AddForm from "../AddForm/AddForm.vue";
import UserDetails from "../UserDetails/UserDetails";
export default {
  name: "AddModal",

  data() {
    return {};
  },

  props: {
    componentType: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: false,
    },
  },

  mounted() {
    window.addEventListener("keydown", this.onEscapeKey);
  },
  beforeUnmount() {
    window.removeEventListener("keydown", this.onEscapeKey);
  },

  methods: {
    closeModal() {
      this.$emit("close");
    },

    onBackdropClick(event) {
      if (event.target === event.currentTarget) {
        this.closeModal();
      }
    },
    onEscapeKey(event) {
      if (event.key === "Escape") {
        this.closeModal();
      }
    },
  },
  components: {
    AddForm,
    UserDetails,
  },
};
</script>

<style scope>
.backdrop {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
}

.modal {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 70%;
  height: 95%;
  max-width: 400px;
  max-height: 800px;
  transform: translate(-50%, -50%);
  background-color: white;
  text-align: center;
  padding: 20px 20px 20px 20px;
  border: 3px solid black;
  border-radius: 8px;
}

@media screen and (max-height: 600px) {
  .modal {
    overflow-y: scroll;
  }

  .modal::-webkit-scrollbar {
    width: 4px;
  }

  .modal::-webkit-scrollbar-thumb {
    background-color: rgb(255, 165, 0);
    border-radius: 16px;
  }

  .modal::-webkit-scrollbar-track {
    background-color: white;
    border-radius: 20px;
  }
}

.close-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  border-color: tomato;
  background-color: white;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  cursor: pointer;
  transition: background-color 250ms linear, border-color 250ms linear;
}

.close-btn:hover,
.close-btn:focus {
  background-color: tomato;
  border-color: black;
}

.modal-title {
  margin-top: 20px;
  font-size: 28px;
  color: orange;
}
</style>
