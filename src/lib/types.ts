export interface IAptitude {
  id: string;
  label: string;
  question: string;
  options: [
    {
      optId: string;
      optName: string;
    }
  ];
  answer: string;
  desc: string;
}

export interface IApiResponse {
  statusCode: number;
  data: any | null;
  message: string;
}

export interface IApiError {
  statusCode: number;
  errors: Error[];
  success: boolean;
  msg: string;
  data: any;
  stack: string;
}
