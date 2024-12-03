<script setup>
  import { ref, reactive, onMounted, watch } from "vue";
  import { hotelsApi } from "@/api/hotels";
  import { useLoading } from "@/composables/useLoading";
  import { Paginator } from "primevue";
  import Filter from "@/pages/Main/Filter.vue";
  import CardsList from "@/pages/Main/CardsList.vue";

  const hotels = ref([]);
  const filteredHotels = ref([]);
  const displayList = ref([]);
  const resultHotels = reactive([]);
  const isEmpty = ref(false);
  const isCleanFlag = ref(false);
  const { loading, load } = useLoading();

  const rowsPerPageOptions = [3, 5, 8];
  const paginateOptions = ref({
    page: 0,
    first: 0,
    rows: 3,
    pageCount: 2,
  });

  watch(
    () => filteredHotels.value,
    (newfilteredHotels) => {
      paginateOptions.value = {
        ...paginateOptions.value,
        page: 0,
        first: 0,
      };

      setNewHotelListPage({
        paginateOptions: paginateOptions.value,
        hotels: newfilteredHotels,
      });
    }
  );

  watch(
    () => paginateOptions.value,
    (newPaginateOptions) => {
      setNewHotelListPage({
        paginateOptions: newPaginateOptions,
        hotels: filteredHotels.value,
      });
    }
  );

  const setNewHotelListPage = ({ hotels, paginateOptions }) => {
    const { first, rows } = paginateOptions;

    displayList.value = hotels.slice(first, first + rows);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  // Получение всех отелей
  const getAllHotels = async () => {
    load.start();
    const resp = await hotelsApi.getAll();
    hotels.value = resp;
    filteredHotels.value = resp;
    load.end();
  };

  // Обновление брони одного отеля
  const updateReserve = async (id, value) => {
    const resp = await hotelsApi.updateReserve(id, value);

    const updatedHotelIndex = hotels.value.findIndex(
      (hotel) => hotel.id === resp.id
    );

    const updatedDisplayHotelIndex = displayList.value.findIndex(
      (hotel) => hotel.id === resp.id
    );

    hotels.value[updatedHotelIndex] = { ...resp };
    displayList.value[updatedDisplayHotelIndex] = { ...resp };

    if (filteredHotels.value.length) {
      const updatedHotelIndex = filteredHotels.value.findIndex(
        (hotel) => hotel.id === resp.id
      );

      filteredHotels.value[updatedHotelIndex] = { ...resp };
    }
  };

  const updateFilteredHotels = (arr) => {
    filteredHotels.value = arr.map((el) => {
      return { ...el };
    });
  };

  const updateIsEmpty = (bool) => {
    isEmpty.value = bool;
  };

  const clearFilter = (flag) => {
    isCleanFlag.value = flag;
  };

  const paginate = (obj) => {
    paginateOptions.value = { ...obj };
  };

  onMounted(getAllHotels);
</script>

<template>
  <main class="main">
    <Filter
      :hotels="hotels"
      :filteredHotels="filteredHotels"
      :isEmpty="isEmpty"
      :loading="loading"
      :isCleanFlag="isCleanFlag"
      @updateIsCleanFlag="clearFilter"
      @getAllList="getAllHotels"
      @updateFilteredHotels="updateFilteredHotels"
      @updateIsEmpty="updateIsEmpty"
    />
    <div class="content">
      <CardsList
        :loading="loading"
        :isEmpty="isEmpty"
        :hotels="displayList"
        @onUpdateReserve="updateReserve"
        @onClearFilter="clearFilter"
      />
      <Paginator
        class="paginator"
        :first="paginateOptions.first"
        :rows="3"
        :totalRecords="
          filteredHotels.length
            ? filteredHotels.length
            : hotels.length
        "
        :rowsPerPageOptions="rowsPerPageOptions"
        @page="paginate"
      />
    </div>
  </main>
</template>

<style lang="css" scoped>
  @import "@/pages/Main/styles/Index.css";
</style>
