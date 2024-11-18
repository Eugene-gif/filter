<script setup>
  import Card from "@/components/Card.vue";
  import EmptyCard from "@/components/EmptyCard.vue";
  import Loader from "@/components/Loader.vue";

  const props = defineProps({
    loading: Boolean,
    isEmpty: Boolean,
    hotels: Array,
  });

  const emit = defineEmits(["onClearFilter", "onUpdateReserve"]);

  const clearFilter = (flag) => {
    emit("onClearFilter", flag);
  };

  const updateHotel = (id, isReserve) => {
    emit("onUpdateReserve", id, isReserve);
  };
</script>

<template>
  <div class="cards-list">
    <Loader v-if="props.loading" />
    <EmptyCard
      v-else-if="props.isEmpty"
      @clearFilter="clearFilter"
    />
    <template v-else>
      <div class="list">
        <Card
          v-for="(hotel, index) in props.hotels"
          :key="index"
          :card="hotel"
          @update="updateHotel"
        />
      </div>
    </template>
  </div>
</template>

<style lang="css" scoped>
  @import "@/pages/Main/styles/CardsList.css";
</style>
