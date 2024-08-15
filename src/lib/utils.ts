import { IApiError, IApiResponse } from "./types.js";

export class ApiResponse implements IApiResponse {
  public statusCode: number;
  public data: any;
  public message: string;
  constructor(statusCode: number, data: any, message: string = "Success") {
    this.statusCode = Number(statusCode < 400);
    this.data = data;
    this.message = message;
  }
}

export class ApiError extends Error implements IApiError {
  public statusCode: number;
  public errors: Error[];
  public success: boolean;
  public msg: string;
  public data: any;
  public stack: string = "";

  constructor(
    statusCode: number,
    message: string = "Something went wrong!",
    errors: any[] = [],
    success: boolean = false,
    data: any = null,
    stack?: string
  ) {
    super(message);

    this.statusCode = statusCode;
    this.errors = errors;
    this.success = success;
    this.data = data;
    this.msg = message;

    // Capture stack trace if provided, otherwise use default
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}
