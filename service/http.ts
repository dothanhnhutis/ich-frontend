import configs from "@/config";

type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface IError {
  status: string;
  statusCode: number;
  message: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializeErrors(): IError;
}

export class FetchHttpError extends Error {
  public statusCode: number;
  public status: string;

  constructor(props: IError) {
    super(props.message);
    this.statusCode = props.statusCode;
    this.status = props.status;
  }

  serialize(): IError {
    return {
      status: this.status,
      statusCode: this.statusCode,
      message: this.message,
    };
  }
}

async function fetchHttp<ResponseData>(
  method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
  url: string,
  options?: FetchHttpOption
) {
  const body = options?.body ? JSON.stringify(options?.body) : undefined;
  const baseHeaders = {
    "Content-Type": "application/json",
  };
  const baseUrl =
    options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + "/api/v1";
  const fullUrl = url.startsWith("/")
    ? `${baseUrl}${url}`
    : `${baseUrl}/${url}`;

  const res = await fetch(fullUrl, {
    ...options,
    headers: {
      ...baseHeaders,
      ...options?.headers,
    },
    body,
    method,
  });

  if (!res.ok) {
    const resError: IError = await res.json();
    throw new FetchHttpError(resError);
  }
  const data: ResponseData = await res.json();
  return {
    status: res.status,
    data,
    headers: res.headers,
  };
}

export const errorHandler = (error: any): IError => {
  if (error instanceof FetchHttpError) {
    return error.serialize();
  } else {
    return {
      message: "unknown",
      status: "error",
      statusCode: 400,
    };
  }
};

export const http = {
  get<ResponseData>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<ResponseData>("GET", url, options);
  },
  post<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("POST", url, { ...options, body });
  },
  patch<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("PATCH", url, { ...options, body });
  },
  put<ResponseData>(url: string, body: any, options?: FetchHttpOption) {
    return fetchHttp<ResponseData>("PUT", url, { ...options, body });
  },
  delete<ResponseData>(url: string, options?: Omit<FetchHttpOption, "body">) {
    return fetchHttp<ResponseData>("DELETE", url, { ...options });
  },
};
