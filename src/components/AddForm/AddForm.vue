<template>
  <h2 class="modal-title">{{ title }}</h2>
  <form
    @submit.prevent
    @submit="onSubmitPress"
    class="add-form"
    autocomplete="off"
  >
    <div class="add-label-container">
      <input
        :class="{
          valid: user.userName && isValidName,
          invalid: user.userName && !isValidName,
        }"
        @input="onChangeName"
        class="add-input"
        placeholder="Name"
        type="text"
        v-model="user.userName"
        id="name"
      />
      <label class="add-label" for="name">Name</label>
    </div>

    <div class="add-label-container">
      <input
        :class="{
          valid: user.userEmail && isValidEmail,
          invalid: user.userEmail && !isValidEmail,
        }"
        @input="onChangeEmail"
        class="add-input"
        placeholder="Email"
        type="mail"
        v-model="user.userEmail"
        id="email"
      />
      <label class="add-label" for="email">Email</label>
    </div>

    <select
      class="add-job-select"
      v-model="user.userJob"
      :class="{ valid: !!user.userJob }"
    >
      <option v-for="(job, index) in jobsList" :key="index">
        {{ job }}
      </option>
    </select>

    <button class="submit-btn" type="submit">
      <v-icon
        v-show="!isLoading"
        name="io-person-add-sharp"
        fill="white"
        scale="1.5"
        :animation="
          isValidEmail && isValidName && !!user.userJob ? 'flash' : 'float'
        "
      />
      <v-icon
        v-show="isLoading"
        name="fa-spinner"
        animation="spin-pulse"
        fill="white"
        scale="1.5"
      />
    </button>
  </form>
</template>

<script>
import { addUser } from "../../services/reqresService";
import { toastSuccess, toastError } from "@/services/toastService";
import _debounce from "lodash/debounce";

export default {
  name: "AddForm",
  data() {
    return {
      isLoading: false,
      user: {
        userName: "",
        userEmail: "",
        userJob: "",
      },
      isValidEmail: false,
      isValidName: false,
      jobsList: [
        "Frontend developer",
        "Backend developer",
        "UI designer",
        "Team leader",
        "Project manager",
      ],
    };
  },

  props: {
    title: {
      type: String,
      required: true,
    },
  },
  emits: ["user-added"],
  methods: {
    async onSubmitPress() {
      const { userName, userEmail, userJob } = this.user;
      const { isValidEmail, isValidName } = this;

      if (!userName || !userEmail || !userJob) {
        return toastError("All fields must be filled in");
      }
      if (userName && !isValidName) {
        return toastError(
          "Name must be 6 symbols minimum and can't be a number"
        );
      }

      if (userEmail && !isValidEmail) {
        return toastError("Please, enter valid email");
      }

      if (userName && userEmail && userJob) {
        this.isLoading = true;
        try {
          const newUser = await addUser(this.user);
          toastSuccess(`Yeah, ${newUser.userName} has been successfully added`);
          this.$emit("user-added");
        } catch (error) {
          toastError("Sorry, something went wrong. Please, try again");
        } finally {
          this.isLoading = false;
        }
      }
    },
    onChangeName: _debounce(function () {
      const streetRegex = /^[a-zA-Z]{6,}$/;
      this.isValidName = streetRegex.test(this.user.userName);
    }, 300),
    onChangeEmail: _debounce(function () {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      this.isValidEmail = emailRegex.test(this.user.userEmail);
    }, 300),
  },
};
</script>

<style>
.add-form {
  display: flex;
  flex-direction: column;
  margin-top: 80px;
}

.add-input {
  width: 100%;
  padding: 8px 16px;
}

.add-label-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: inline-block;
  margin-bottom: 25px;
}

.add-label {
  position: absolute;
  left: 8px;
  top: 50%;
  transition: 250ms linear;
  transform: translate(0, -50%);
  font-size: 16px;
}

.add-input:focus + .add-label {
  transform: translateY(-200%);
}

.add-input:not(:placeholder-shown) + .add-label {
  transform: translateY(-200%);
}

.add-input::placeholder {
  opacity: 0;
}

.add-job-select {
  margin-bottom: 25px;
  padding: 8px 16px;
  font-size: 16px;
}

.add-job-select,
.add-input {
  outline: none;
  border: 2px solid gray;
  border-radius: 16px;
}

.add-input.valid,
.add-job-select.valid,
.add-job-select.valid {
  border-color: green;
}

.add-input.invalid,
.add-job-select.invalid {
  border-color: red;
}
</style>
