export class FetchError extends Error {
  message: string;
  trace_id?: string;
  status: number;

  constructor(
    { message, trace_id }: { message: string; trace_id?: string },
    status: number,
  ) {
    super();
    this.status = status;
    this.message = message;
    this.trace_id = trace_id;
  }
}
