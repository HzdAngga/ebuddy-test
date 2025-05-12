export type CommonResponse = {
  msg: string;
};

export type CommonPaginatedResponse = {
  metadata: {
    total_items: number;
    total_pages: number;
    current_page: number;
    limit: number;
    next_page: number;
    previous_page: number;
  };
} & CommonResponse;
