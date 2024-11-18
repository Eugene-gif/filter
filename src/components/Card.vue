<script setup>
  import { useLoading } from "@/composables/useLoading";
  import { Rating } from "primevue";

  const emit = defineEmits(["update"]);
  const props = defineProps({
    card: Object,
  });

  const { loading, load } = useLoading();

  const updateHotelReserve = async (id, isReserve) => {
    load.start();

    emit("update", id, isReserve);

    setTimeout(() => {
      load.end();
    }, 500);
  };
</script>

<template>
  <Card class="card">
    <template #header></template>
    <template #title>
      <div class="title">
        <h3 class="title__name">{{ card.name }}</h3>
        <div class="title__price">{{ card.price }} ₽</div>
      </div>
    </template>
    <template #subtitle>
      <div class="subtitle">
        <div class="subtitle-rating">
          <Rating
            v-model="card.rating"
            class="rating"
            readonly
            disabled
          />
        </div>
        <div class="subtitle-type">
          {{ card.type }}
        </div>
        <i
          class="pi pi-circle-fill"
          style="font-size: 7px"
        ></i>
        <div class="subtitle-reviews">{{ card.reviews }} отзыва</div>
        <div class="subtitle-country">
          <i class="pi pi-map-marker"></i>{{ card.country }}
        </div>
      </div>
    </template>
    <template #footer>
      <div class="footer">
        <p class="footer-description">
          {{ card.description }}
        </p>

        <div class="footer-btn">
          <Button
            v-if="card.reserve"
            :loading="loading"
            @click="updateHotelReserve(card.id, false)"
            class="reserve-btn"
            label="Забронировано"
            icon="pi pi-check"
            severity="success"
          />
          <Button
            v-else
            :loading="loading"
            @click="updateHotelReserve(card.id, true)"
            class="reserve-btn"
            label="Забронировать"
            icon="pi pi-calendar"
            severity="help"
          />
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="css" scoped>
  .card {
    border-radius: 15px;
    border: 1px solid #cbd5e1;
    @media (width < 768px) {
      --l-card-body-padding: 15px;
      --l-card-body-gap: 5px;
      border-radius: 10px;
    }
  }

  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .title__name {
      margin: 0;
    }

    @media (width < 768px) {
      flex-direction: column;
      align-items: flex-start;
      justify-content: flex-start;
      gap: 6px;

      .title__name {
        font-size: 20px;
      }
      .title__price {
        font-size: 18px;
      }
    }
  }

  .subtitle {
    display: flex;
    align-items: center;
    gap: 12px;

    .subtitle-country {
      display: flex;
      align-items: flex-start;
      gap: 2px;
    }

    @media (width < 768px) {
      flex-wrap: wrap;
      gap: 8px;
    }
  }

  .footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;

    .reserve-btn {
      width: 163px;
    }

    .footer-btn {
      margin-top: auto;
    }

    @media (width < 768px) {
      flex-direction: column;
      align-items: flex-end;
      gap: 10px;

      .footer-description {
        align-self: flex-start;
        font-size: 14px;
      }

      .reserve-btn {
        width: 163px;
      }
    }

    @media (width < 650px) {
      .footer-btn,
      .reserve-btn {
        width: 100%;
      }
    }
  }
</style>
