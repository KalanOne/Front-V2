import axios, { AxiosRequestConfig } from "axios";

import {
  LANGUAGE,
  USER_TOKEN,
  WORK_AREA_ID,
  WORK_AREA_NAME,
} from "src/utils/constants.ts";
import { downloadFile } from "src/utils/file.ts";
import { getTimeZone } from "src/utils/time.ts";

export { http };

interface HttpArguments {
  path: string;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any;
  params?: Record<string, string | undefined>;
  dataWithFiles?: boolean;
  download?: boolean;
}

const http = async <T>({
  path,
  method = "POST",
  data = {},
  params = {},
  dataWithFiles = false,
  download = false,
}: HttpArguments): Promise<T> => {
  for (const k in params) {
    if (params[k] === null || params[k] === undefined) {
      delete params[k];
    }
  }

  const request: AxiosRequestConfig = {
    method,
    params,
    data,
    url: `http://localhost/api/${path}`,
    // url: `${process.env.REACT_APP_API_URL}/api/${path}`,
    headers: {
      Authorization: `Bearer ${localStorage.getItem(USER_TOKEN)}`,
      Lang: localStorage.getItem(LANGUAGE) || "es",
      "Time-Zone": getTimeZone(),
      "Content-Type": !dataWithFiles
        ? "application/json"
        : "multipart/form-data",
      "Work-Area": localStorage.getItem(WORK_AREA_NAME),
      "Id-Assign-Work-Area": localStorage.getItem(WORK_AREA_ID),
    },
  };

  if (download) {
    request.responseType = "blob";
  }

  if (dataWithFiles) {
    const formData = new FormData();

    for (const k of Object.keys(data)) {
      if (Array.isArray(data[k])) {
        data[k].forEach((object: any, index: number) => {
          for (const key of Object.keys(object)) {
            formData.append(`${k}[${index}][${key}]`, object[key]);
          }
        });
      } else {
        formData.append(k, data[k]);
      }
    }

    request.data = formData;
  }

  const response = await axios(request);

  if (response.headers["content-type"] != "application/json") {
    downloadFile(response);
  }
  return response.data.data as T;
};
