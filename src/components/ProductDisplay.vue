<script lang="ts">
import { X } from "lucide-vue-next";
import { useStore } from "../store";
import { ofetch } from "ofetch";
import { ECOMMERCE_API } from "@/lib/utils/constants";

export default {
  name: "ProductDisplay",
  components: { X },
  data() {
    const state = useStore();

    return {
      product: state.product,
      id: state.id,
      isNotFound: state.isNotFound,
      rate: state.rate,
      isLoading: state.isLoading,
      isOpenModal: state.isOpenModal
    };
  },
  methods: {
    async getData(): Promise<void> {
      try {
        const response = await ofetch(`${ECOMMERCE_API}/products/${this.id}`, {
          method: "GET",
          responseType: "json",
          parseResponse: JSON.parse,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json"
          }
        });

        this.product = response;
        this.isLoading = false;
      } catch (err) {
        console.error(err);
        this.isNotFound = true;
        this.isLoading = false;
      }
    },
    setId(id: number) {
      this.id = id;
      this.isLoading = true;

      // re-render data based on id changes
      this.getData();
    },

    setIsOpenModal(value: boolean) {
      this.isOpenModal = value;
    }
  },
  beforeMount() {
    this.getData();
  }
};
</script>

<template>
  <section :class="`section-wrapper ${isNotFound ? 'pattern-not-found' : 'pattern'}`">
    <div class="modal-wrapper" v-if="isOpenModal">
      <div class="modal">
        <div class="modal-information">
          <span class="modal-information-text">Information</span>
          <button
            type="button"
            aria-label="close"
            class="modal-information-close-btn"
            @click="setIsOpenModal(false)"
          >
            <X :size="24" />
          </button>
        </div>
        <div class="modal-thankyou-wrapper">
          <p class="modal-thankyou-text">Thank you for buying this product!</p>
        </div>
      </div>
    </div>
    <div class="product-wrapper" v-else>
      <div :class="`product ${isNotFound && !isLoading ? 'product-else-bg' : ''}`">
        <div v-if="isNotFound && !isLoading" class="product-not-found">
          <p class="product-description-not-dound">This product is unavailable to show</p>
          <button
            type="button"
            aria-label="next product"
            class="product-btn-next-notfound"
            @click="setId(id + 4)"
          >
            Next Product
          </button>
        </div>
        <div v-else class="product-else">
          <div class="product-image-wrapper">
            <div v-if="isLoading" :class="isLoading ? 'product-image-skeleton' : ''"></div>
            <img v-else :src="product.image" alt="product image" class="product-image" />
          </div>
          <div class="product-content">
            <div class="product-content-top">
              <div>
                <div v-if="isLoading" class="product-title-skeleton"></div>
                <h3 v-else class="product-title">
                  {{ product.title }}
                </h3>
              </div>
              <div class="product-category-and-rate">
                <div v-if="isLoading" class="product-category-skeleton"></div>
                <span class="product-category" v-else>{{ product.category }}</span>
                <div v-if="isLoading" class="product-rate-skeleton"></div>
                <div class="product-rate" v-else>
                  <span class="product-rate-num">{{ product.rating.rate }}/{{ rate.length }}</span>
                  <div
                    v-for="(item, index) in rate"
                    :style="item === 5 ? 'margin-right: 0;' : 'margin-right: 0.2rem;'"
                    :key="index + 1"
                    :class="Math.round(product.rating.rate) >= item ? 'fill-rate' : 'no-fill-rate'"
                  ></div>
                </div>
              </div>
              <div class="product-description-wrapper">
                <div class="product-description-skeleton" v-if="isLoading"></div>
                <p class="product-description" v-else>
                  {{ product.description }}
                </p>
              </div>
            </div>
            <div class="product-price-bottom">
              <div class="product-price-wrapper">
                <div v-if="isLoading" class="product-price-skeleton"></div>
                <p class="product-price" v-else>{{ `$${product.price}` }}</p>
              </div>
              <div v-if="isLoading" class="product-btn-skeleton"></div>
              <div class="product-btn-wrapper" v-else>
                <button
                  type="button"
                  aria-label="buy now"
                  class="product-btn-buy"
                  @click="setIsOpenModal(!isOpenModal)"
                >
                  Buy Now
                </button>
                <button
                  type="button"
                  aria-label="next product"
                  class="product-btn-next"
                  @click="setId(id + 4)"
                >
                  Next Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>