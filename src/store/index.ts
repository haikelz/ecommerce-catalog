import type { StateProps } from "@/interfaces";
import { defineStore } from "pinia";
import { ref } from "vue";

export const useStore = defineStore("store", {
  state: (): StateProps => ({
    menClothings: ref({}),
    womenClothings: ref({}),
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
