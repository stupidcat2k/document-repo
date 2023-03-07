import axios from "axios";
import __isString from "lodash/isString";
import __isObject from "lodash/isObject";
import { HTTP_REQUEST, HTTP_ERROR_MESSAGE } from "./Constants";
import * as RestUtils from "../utils/RestUtils";
import store from "@/redux/store";
import { logoutAction } from "@/redux/authAction";

const noIntercept = (resp) => resp;

const DEFAULT_HEADERS = {
  [HTTP_REQUEST.HEADERS.CONTENT_TYPE]: HTTP_REQUEST.CONTENT_TYPES.JSON,
};

const DEFAULT_REQ_OPTS = {
  headers: {},
  ignoreInterceptor: false,
  withCredentials: false,
};

export class HttpClient {
  #customHeaders;

  constructor(options = {}) {
    const { baseURL = "/", responseType = "json", headers = {} } = options;
    this.#customHeaders = headers;
    this.$axios = axios.create({
      baseURL,
      responseType,
      headers: { ...DEFAULT_HEADERS, ...headers },
    });
  }

  removeAccessToken = () => {
    this.$axios.defaults.headers.common = {
      ...DEFAULT_HEADERS,
      ...this.#customHeaders,
    };
  };

  setAccessToken(token, type = HTTP_REQUEST.AUTHORIZATION.BEARER_TYPE) {
    if (!token) {
      return;
    }
    this.$axios.defaults.headers.common[
      HTTP_REQUEST.HEADERS.AUTHORIZATION
    ] = `${type}${token}`;
  }

  addRequestInterceptor = (successHandler, failHandler) => {
    this.$axios.interceptors.request.use(
      successHandler || noIntercept,
      failHandler || noIntercept
    );
  };

  addResponseInterceptor = (successHandler, failHandler) => {
    this.$axios.interceptors.response.use(
      successHandler || noIntercept,
      failHandler || noIntercept
    );
  };

  async get(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      RestUtils.REQUEST_METHODS.GET,
      options,
      requestParams
    );
  }

  async post(url, requestBody = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      RestUtils.REQUEST_METHODS.POST,
      options,
      requestBody
    );
  }

  async put(url, requestBody = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      RestUtils.REQUEST_METHODS.PUT,
      options,
      requestBody
    );
  }

  async delete(url, requestParams = {}, options = DEFAULT_REQ_OPTS) {
    return await this.sendRequest(
      url,
      RestUtils.REQUEST_METHODS.DELETE,
      options,
      requestParams
    );
  }

  async upload(url, form = {}, options = DEFAULT_REQ_OPTS) {
    const headers = {
      ...(options.headers || {}),
      [HTTP_REQUEST.HEADERS.CONTENT_TYPE]: HTTP_REQUEST.CONTENT_TYPES.FORM,
    };

    return await this.sendRequest(
      url,
      RestUtils.REQUEST_METHODS.POST,
      { ...options, headers },
      form
    );
  }

  async download(resourceUrl, params = {}, filename) {
    const response = await this.$axios.get(resourceUrl, {
      responseType: "blob",
      params: new URLSearchParams(params),
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  async downloadWithBody(resourceUrl, payload = {}, filename) {
    const response = await this.$axios.post(resourceUrl, payload, {
      responseType: "blob",
    });
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", filename);
    document.body.appendChild(link);
    link.click();
    link.remove();
  }

  sendRequest = async (
    url,
    method,
    options = DEFAULT_REQ_OPTS,
    payload = {}
  ) => {
    if (!url) {
      console.log("error");
      throw new Error("String value of URL must correct");
    }

    const allOptions = { ...DEFAULT_REQ_OPTS, ...options };
    const { headers, ignoreInterceptor, withCredentials } = allOptions;
    let params = {};
    let requestBody = {};
    if (RestUtils.METHODS_ALLOW_PAYLOAD.includes(method)) {
      requestBody = payload;
    } else {
      params = new URLSearchParams(payload);
    }

    const opts = {
      method,
      params,
      headers,
      data: requestBody,
      transformRequest: [this.#transformRequest],
      ignoreInterceptor,
      withCredentials,
    };

    return await this.#parseResponse(this.$axios.request(url, opts));
  };

  #transformRequest = (data) => {
    if (__isString(data) || RestUtils.isFormData(data)) {
      return data;
    } else if (__isObject(data)) {
      return JSON.stringify(data);
    }
    throw new Error(
      "Request body must be an one of [String, Object, FormData]"
    );
  };

  #parseResponse = async (requester) => {
    try {
      const resp = await Promise.resolve(requester);
      const { data, isAxiosError, response } = resp;
      if (isAxiosError) {
        const { data: errorData } = response;
        const { status } = resp.toJSON();
        return { status, ...errorData };
      }
      return { status: resp.status, ...data };
    } catch (error) {
      console.log(error)
      return { status: 500, success: false, message: HTTP_ERROR_MESSAGE[500] };
    }
  };
}

export const $http = new HttpClient({
  baseURL: "http://localhost:4050/",
});

$http.addResponseInterceptor(noIntercept, (error) => {
  if (!error.toJSON) return error;
  const {
    status,
    config: { ignoreInterceptor = false },
  } = error.toJSON();
  if (!ignoreInterceptor && status === HTTP_REQUEST.STATUS_CODES.UNAUTHORIZED) {
    store.dispatch(logoutAction());
  }
  return error;
});
