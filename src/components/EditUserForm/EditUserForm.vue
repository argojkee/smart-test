<template>
  <form
    autocomplete="off"
    class="edit-user-form"
    @submit="onSubmit"
    @submit.prevent
  >
    <div class="edit-label-container">
      <input
        class="edit-input"
        :class="{
          valid: phone && isValidPhone,
          invalid: phone && !isValidPhone,
        }"
        @input="onChangePhone"
        v-model="phone"
        id="phone"
        placeholder="Phone number"
      />
      <label class="edit-label" for="phone"> Phone number </label>
    </div>
    <label for="region">Address</label>

    <select
      class="edit-select"
      :class="{ valid: !!region }"
      id="region"
      v-model="region"
      @change="getRegionsInCountry(region.id)"
    >
      <option
        v-for="region in regions"
        :key="region.id"
        :value="{ region: region.name, id: region.id }"
      >
        {{ region.name }}
      </option>
    </select>

    <select
      class="edit-select"
      v-show="region"
      v-model="country"
      :class="{ valid: !!country }"
    >
      <option
        v-for="country in countries"
        :key="country.id"
        :value="country.name"
      >
        {{ country.name }}
      </option>
    </select>

    <div class="edit-label-container" v-show="country">
      <input
        :class="{
          valid: street && isValidStreet,
          invalid: street && !isValidStreet,
        }"
        @input="onChangeStreet"
        class="edit-input"
        id="street"
        type="text"
        v-model="street"
        placeholder="Street"
      />
      <label class="edit-label" for="street">Street</label>
    </div>

    <div class="edit-label-container" v-show="street && isValidStreet">
      <input
        :class="{
          valid: house && isValidHouse,
          invalid: house && !isValidHouse,
        }"
        @input="onChangeHouse"
        class="edit-input"
        id="house"
        type="text"
        v-model="house"
        placeholder="House"
      />
      <label class="edit-label" for="house"> House</label>
    </div>

    <button class="submit-btn" type="submit">
      <v-icon
        v-show="!isLoading"
        name="md-modeedit-round"
        fill="white"
        scale="1"
      />
      <v-icon
        v-show="isLoading"
        name="fa-spinner"
        animation="spin-pulse"
        fill="white"
        scale="1"
      />
    </button>
  </form>
</template>

<script>
import {
  getRegions,
  getCountriesByRegion,
} from "../../services/countriesService.js";
import { editUserById } from "../../services/reqresService";
import { toastSuccess, toastError } from "../../services/toastService";
import EventBus from "../../EventBus";
import _debounce from "lodash/debounce";

export default {
  name: "EditUserForm",
  data() {
    return {
      phone: "",
      regions: null,
      country: "",
      region: "",
      countries: null,
      street: "",
      house: "",
      isValidPhone: false,
      isValidStreet: false,
      isValidHouse: false,
      isLoading: false,
    };
  },

  props: {
    userId: {
      type: Number,
      required: true,
    },
  },

  async beforeMount() {
    const regions = await getRegions();

    this.regions = regions;
  },

  methods: {
    async getRegionsInCountry(id) {
      const resp = await getCountriesByRegion(id);
      this.countries = resp;
    },
    async onSubmit() {
      const { userId, phone, region, country, street, house } = this;

      if (phone || region) {
        this.isLoading = true;
        try {
          if (phone && !this.isValidPhone) {
            return toastError("Please, enter valid phone number");
          }

          if (street && !this.isValidStreet) {
            return toastError("Please, enter valid street");
          }

          if (house && !this.isValidHouse) {
            return toastError("Please, enter valid house number");
          }

          await editUserById(userId, {
            phone,
            region: region.region,
            country,
            street,
            house,
          });

          toastSuccess("User has been successfully updated");

          EventBus.emit("closeModalBus");
        } catch (error) {
          toastSuccess("Sorry, something went wrong. Please, try again");
        } finally {
          this.isLoading = false;
        }
      } else {
        toastError("Please, enter user phone or address");
      }
    },

    onChangePhone: _debounce(function () {
      const phoneRegex = /^[0-9]{8,}$/;
      this.isValidPhone = phoneRegex.test(this.phone);
    }, 300),
    onChangeStreet: _debounce(function () {
      const streetRegex = /^[a-zA-Z]{4,}$/;
      this.isValidStreet = streetRegex.test(this.street);
      console.log("hello");
    }, 300),
    onChangeHouse: _debounce(function () {
      const houseNumberRegex = /^[1-9]\d{0,3}$/;
      this.isValidHouse = houseNumberRegex.test(this.house);
    }, 300),
  },
};
</script>

<style>
h2 {
  margin-top: 0;
  margin-bottom: 0;
}

p {
  margin-top: 6px;
  margin-bottom: 20px;
}
.edit-user-form {
  display: flex;
  flex-direction: column;
  row-gap: 18px;
}
.edit-label-container {
  display: flex;
  flex-direction: column;
}

.edit-input,
.edit-select {
  width: 100%;
  padding: 4px 16px;
  outline: none;
  border: 2px solid gray;
  border-radius: 16px;
}

.edit-label-container {
  width: 100%;
  margin-left: auto;
  margin-right: auto;
  position: relative;
  display: inline-block;
}

.edit-label {
  position: absolute;
  left: 8px;
  top: 50%;
  transition: 250ms linear;
  transform: translate(0, -50%);
  font-size: 12px;
}

.edit-input:focus + .edit-label {
  transform: translateY(-200%);
}

.edit-input:not(:placeholder-shown) + .edit-label {
  transform: translateY(-200%);
}

.edit-input::placeholder {
  opacity: 0;
}

.submit-btn {
  width: 100px;
  margin: 0 auto;
  padding: 4px 8px;
  border-radius: 16px;
  background-color: rgb(0, 128, 0);
  color: white;
  border: 1px solid gray;
  cursor: pointer;
  transition: background-color 250ms linear;
}

.submit-btn:hover,
.submit-btn:focus {
  background-color: rgba(0, 128, 0, 0.6);
}

.edit-input.valid,
select.valid {
  border-color: green;
}

.edit-input.invalid {
  border-color: red;
}
</style>
