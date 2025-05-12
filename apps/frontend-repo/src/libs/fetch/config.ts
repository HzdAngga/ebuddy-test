import { FetchError } from "@/types/exception/client";

export class Fetch<Response> {
  private url: string;
  private init?: Omit<RequestInit, "body">;
  private errorInterceptor?: (error: FetchError) => void;

  constructor(
    baseUrl: string,
    url?: string,
    init?: RequestInit,
    errorInterceptor?: (error: FetchError) => void,
  ) {
    this.url = baseUrl + url;
    this.errorInterceptor = errorInterceptor;
    this.init = {
      ...init,
      headers: {
        Accept: "application/json",
        ...init?.headers,
      },
    };
  }

  private async headers(isFormData: boolean) {
    return {
      ...(!isFormData && {
        "Content-Type": "application/json",
      }),
      ...this?.init?.headers,
    };
  }

  async get(): Promise<Response> {
    const res = await fetch(this.url, {
      ...this.init,
      headers: await this.headers(false),
      method: "GET",
    });

    if (!res.ok) {
      const data = await res.json();
      this.errorInterceptor?.(data);
      if (res.status >= 500)
        throw new FetchError(
          { message: data?.message || res.statusText },
          res.status,
        );

      throw new FetchError(data, res.status);
    }

    return res.json();
  }

  async post<T>(rawBody?: T): Promise<Response> {
    const isFormData = rawBody instanceof FormData;
    const body = isFormData ? rawBody : JSON.stringify(rawBody);

    const res = await fetch(this.url, {
      ...this.init,
      headers: await this.headers(isFormData),
      method: "POST",
      body,
    });

    if (!res.ok) {
      const data = await res.json();
      this.errorInterceptor?.(data);
      throw new FetchError(data, res.status);
    }

    return res.json();
  }

  async put<T>(rawBody?: T): Promise<Response> {
    const isFormData = rawBody instanceof FormData;
    const body = isFormData ? rawBody : JSON.stringify(rawBody);

    const res = await fetch(this.url, {
      ...this.init,
      headers: await this.headers(isFormData),
      method: "PUT",
      body,
    });

    if (!res.ok) {
      const data = await res.json();
      this.errorInterceptor?.(data);
      throw new FetchError(data, res.status);
    }

    return res.json();
  }

  async patch<T>(rawBody?: T): Promise<Response> {
    const isFormData = rawBody instanceof FormData;
    const body = isFormData ? rawBody : JSON.stringify(rawBody);

    const res = await fetch(this.url, {
      ...this.init,
      headers: await this.headers(isFormData),
      method: "PATCH",
      body,
    });

    if (!res.ok) {
      const data = await res.json();
      this.errorInterceptor?.(data);
      throw new FetchError(data, res.status);
    }

    return res.json();
  }

  async delete(): Promise<Response> {
    const res = await fetch(this.url, {
      ...this.init,
      headers: await this.headers(false),
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      this.errorInterceptor?.(data);
      if (res.status >= 500)
        throw new FetchError(
          { message: data?.message || res.statusText },
          res.status,
        );

      throw new FetchError(data, res.status);
    }

    return res.json();
  }
}
