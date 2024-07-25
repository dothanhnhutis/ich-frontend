import { http } from "../http";
import configs from "@/config";

type FetchHttpOption = RequestInit & {
  baseUrl?: string;
};

export interface IError {
  statusCode: number;
  headers: Headers;
  data: { message: string };
}

export class FetchHttpError extends Error {
  private headers: Headers;
  private statusCode: number;
  private data: { message: string };
  constructor(props: IError) {
    super(props.data.message);
    this.headers = props.headers;
    this.statusCode = props.statusCode;
    this.data = props.data;
  }

  serialize(): IError {
    return {
      headers: this.headers,
      data: this.data,
      statusCode: this.statusCode,
    };
  }
}

export class FetchHttp {
  constructor(private _path: string) {}
  private async fetchHttp<ResponseData>(
    method: "GET" | "POST" | "PUT" | "PATCH" | "DELETE",
    url: string,
    options?: FetchHttpOption
  ) {
    const body = options?.body ? JSON.stringify(options?.body) : undefined;
    const baseHeaders = {
      "Content-Type": "application/json",
    };
    const baseUrl =
      options?.baseUrl || configs.NEXT_PUBLIC_SERVER_URL + this._path;

    const fullUrl =
      url == "" || url.startsWith("/")
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
      const { message }: { message: string } = await res.json();
      throw new FetchHttpError({
        headers: res.headers,
        statusCode: res.status,
        data: { message },
      });
    }
    const data: ResponseData = await res.json();
    return {
      statusCode: res.status,
      headers: res.headers,
      data,
    };
  }

  protected get<ResponseData>(url: string, options?: FetchHttpOption) {
    return this.fetchHttp<ResponseData>("GET", url, options);
  }

  protected post<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("POST", url, { ...options, body });
  }
  protected patch<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("PATCH", url, { ...options, body });
  }
  protected put<ResponseData>(
    url: string,
    body: any,
    options?: FetchHttpOption
  ) {
    return this.fetchHttp<ResponseData>("PUT", url, { ...options, body });
  }
  protected delete<ResponseData>(
    url: string,
    options?: Omit<FetchHttpOption, "body">
  ) {
    return this.fetchHttp<ResponseData>("DELETE", url, { ...options });
  }
}

type Provider = "google" | "github";

export class AuthService extends FetchHttp {
  constructor() {
    super("/api/v1/auth");
  }

  async signIn(data: { email: string; password: string }) {
    return await this.post<any>("", data);
  }

  async signInWithProvider(provider: Provider) {}
}
