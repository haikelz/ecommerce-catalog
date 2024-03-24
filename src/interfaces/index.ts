import type { Ref } from "vue";

// store interface
export interface ProductProps {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface StateProps {
  product: Ref<ProductProps>;
  id: Ref<number>;
  rate: Ref<Array<number>>;
  isLoading: Ref<boolean>;
  isOpenModal: Ref<boolean>;
  isNotFound: Ref<boolean>;
}
