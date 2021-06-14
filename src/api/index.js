import axios from "axios";
import { queryData } from "../utilities/helpers";

// Set config defaults when creating the instance
const instance = axios.create({
    baseURL: "https://api.spaceXdata.com",
});

export const getSpaceXData = (search) => instance.get(`/v3/launches${search}`);
