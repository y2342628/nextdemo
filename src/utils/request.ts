import Axios, {
  InternalAxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  AxiosInstance,
} from "axios";
import { NextApiRequest } from "next";
import { StreamContentType } from "@/utils/constant";


class Request {
  private instance: AxiosInstance;
  private scope: string;
  private tokenName: string;
  private retryCount = 0;

  constructor(baseURL: string, scope: string, tokenName: string) {
    this.instance = Axios.create({
      baseURL: baseURL,
    });
    this.scope = scope;
    this.tokenName = tokenName;
  }



  private getError(err: any) {
    const { response = {}, code, errno } = err || {};
    const errorMsg = [];
    if (code) {
      errorMsg.push(`code:${code}`);
    }
    if (errno) {
      errorMsg.push(`errno:${errno}`);
    }

    const { status = 500, data = {} } = response;
    return {
      status,
      data: { ...data, message: data.message || errorMsg.join(",") || "" },
    };
  }

  private retryRequest = (config: InternalAxiosRequestConfig) => {
    return new Promise(async (resolve, reject) => {
      try {
  

        resolve(this.instance(config));
      } catch (e) {
        reject(e);
      }
    });
  };

  private requestIntercept() {
    this.instance.interceptors.request.use(
      async (config: InternalAxiosRequestConfig) => {
        return config;
      },
      (error: AxiosError) => Promise.reject(error)
    );
  }

  private responseIntercept() {
    let startTime = Date.now();
    const limitCount = 20;
    const interval = 60 * 1000; // 1min

    this.instance.interceptors.response.use(
      (res: AxiosResponse) => res,
      (error: any) => {
        const { response = {} } = error;
        const { status, config } = response;
        if (status === 401) {
          const diffTimes = Date.now() - startTime;

          if (diffTimes < interval) {
            if (this.retryCount >= limitCount) {
              this.retryCount = 0;
              startTime = Date.now();
              const data = response.data ?? {};
              response.data = {
                ...data,
                message:
                  "Exceed max trials for token! Please try again latter.",
              };
              return Promise.reject(error);
            } else {
              return this.retryRequest(config);
            }
          } else {
            startTime = Date.now();
            return this.retryRequest(config);
          }
        } else {
          return Promise.reject(error);
        }
      }
    );
  }

  interceptors() {
    this.requestIntercept();
    this.responseIntercept();
  }

  serverRequest = async (config: InternalAxiosRequestConfig, req: NextApiRequest) => {
    try {

  
  


      const res = await this.instance({ ...config });


      // file stream type returns directly
      if (StreamContentType.includes(res.headers["content-type"])) {
        return {
          status: res.status ?? 200,
          data: res.data,
        };
      }

      const advantageVersion = process.env.advantageVersion;
      return {
        status: res.status ?? 200,
        data: res.data
          ? { ...res.data, advantageVersion }
          : { advantageVersion },
      };
    } catch (error: any) {
      return this.getError(error);
    }
  };
}

export default Request;
