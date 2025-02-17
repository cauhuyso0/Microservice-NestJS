import OrderSearchBody from './order-search-body.interface';

export interface OrderSearchResult {
  hits: {
    total: number;
    hits: Array<{
      _source: OrderSearchBody;
    }>;
  };
}
