import type { ProductProps } from "@/interfaces";
import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

interface StateProps {
  product: Ref<ProductProps>;
  clothings: Ref<{} | ProductProps>;
  id: Ref<number>;
  rate: Ref<Array<number>>;
  isLoading: Ref<boolean>;
  isOpenModal: Ref<boolean>;
  isNotFound: Ref<boolean>;
}

export const useStore = defineStore("store", {
  state: (): StateProps => ({
    clothings: ref({}),
    product: ref({
      id: 0,
      title: "",
      price: 0,
      description: "",
      category: "",
      image: "",
      rating: {
        rate: 0,
        count: 0
      }
    }),
    id: ref(1),
    rate: ref(new Array(5).fill(null).map((_, index) => index + 1)),
    isLoading: ref(true),
    isOpenModal: ref(false),
    isNotFound: ref(false)
  })
});
