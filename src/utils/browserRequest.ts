import axios, { InternalAxiosRequestConfig ,AxiosRequestConfig} from "axios";
import { StreamContentType } from "./constant";



const instance = axios.create({});

instance.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (res) => {
    // file stream type returns directly
    if (StreamContentType.includes(res.headers["content-type"])) return res;

    const data = res?.data ?? {};

    //The OId is invalid
    if (data.statusCode === -1) {
    }

    return res;
  },
  (error) => {
    const data = error?.response?.data ?? {};
    const { message } = data;
    if (message) {
      console.error(message);
    }

    return Promise.reject(error);
  }
);

const browserRequest = async (config:AxiosRequestConfig) => {
  try {
    const res = await instance(config);
    return res.data;
  } catch (e) {
    return Promise.reject(e);
  }
};

export default browserRequest;
