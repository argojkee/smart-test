import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const toastOptions = { position: "top-center", autoClose: 3000 };

export const toastSuccess = (message) => toast.success(message, toastOptions);

export const toastError = (message) => toast.error(message, toastOptions);
