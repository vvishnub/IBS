export type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export interface UseApiParams {
  url: string;
  method: HttpMethod;
  body?: object;
  headers?: Record<string, string>;
}
