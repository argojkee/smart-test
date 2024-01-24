import { createApp } from "vue";
import App from "./App.vue";

import { OhVueIcon, addIcons } from "oh-vue-icons";
import {
  RiDeleteBin6Line,
  FaSpinner,
  IoPersonAddSharp,
  IoClose,
  MdModeeditRound,
} from "oh-vue-icons/icons";

addIcons(
  RiDeleteBin6Line,
  FaSpinner,
  IoPersonAddSharp,
  IoClose,
  MdModeeditRound
);

const app = createApp(App);
app.component("v-icon", OhVueIcon);
app.mount("#app");
