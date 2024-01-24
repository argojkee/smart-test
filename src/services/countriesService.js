import axios from "axios";

const API_KEY = "WeMm-Y4ogjVEo0-5v5F-iiD0_kA0h9";
const BASE_URL = "https://data-api.oxilor.com/rest";

export const getRegions = async () => {
  return await axios
    .get(`${BASE_URL}/regions/?key=${API_KEY}&lng=ru`)
    .then((resp) => resp.data.edges.map((region) => region.node));
};

export const getCountriesByRegion = async (countryId) => {
  return await axios
    .get(
      `${BASE_URL}/child-regions?parentId=${countryId}&key=${API_KEY}&lng=ru`
    )
    .then((resp) => resp.data.edges.map((town) => town.node));
};
