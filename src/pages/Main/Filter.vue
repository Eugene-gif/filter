<script setup>
  import { ref, computed, watch } from "vue";
  import { AutoComplete } from "primevue";
  import { RadioButton } from "primevue";
  import { Checkbox } from "primevue";
  import { InputText } from "primevue";
  import { Slider } from "primevue";

  const props = defineProps({
    hotels: Array,
    filteredHotels: Array,
    isEmpty: Boolean,
    isCleanFlag: Boolean,
    loading: Boolean,
  });

  const emit = defineEmits([
    "getAllList",
    "updateFilteredHotels",
    "updateIsEmpty",
    "updateIsCleanFlag",
  ]);

  // AutoComplete
  const selectedCountries = ref([]);
  const countries = ref([]);
  // Intput-Radio
  const selectedType = ref(null);
  const types = ref([
    { name: "Апартаменты", key: "apartament" },
    { name: "Отель", key: "hotel" },
  ]);
  // Input-Checkbox
  const ratings = ref([
    { name: "1 звезда", key: "1", value: 1 },
    { name: "2 звезды", key: "2", value: 2 },
    { name: "3 звезды", key: "3", value: 3 },
    { name: "4 звезды", key: "4", value: 4 },
    { name: "5 звезд", key: "5", value: 5 },
  ]);
  const selectedRating = ref([]);
  // Input-reviews
  const selectedNumReviews = ref(null);
  // Input-slider
  const selectedRange = ref([null, null]);

  const isFilter = computed(() => {
    return (
      selectedCountries.value.length ||
      selectedType.value ||
      selectedNumReviews.value ||
      selectedRating.value.length ||
      selectedRange.value[1]
    );
  });

  watch(
    () => props.isCleanFlag,
    (newValue) => {
      if (newValue) clearFilter();
    }
  );

  // Обновление данных эмитами
  const onUpdateFilteredHotels = (arr) => {
    emit("updateFilteredHotels", arr);
  };

  const onUpdateIsEmpty = (bool) => {
    emit("updateIsEmpty", bool);
  };

  const onUpdateIsCleanFlag = (bool) => {
    emit("updateIsCleanFlag", bool);
  };

  const getAllCountries = (event) => {
    countries.value = [
      ...new Set(
        props.hotels.map((item) => {
          return item.country;
        })
      ),
    ];

    countries.value = inputSearch(event, countries.value);
  };

  const inputSearch = (inputValue, arr) => {
    return arr.filter((word) => {
      const regex = new RegExp(inputValue.query, "gi");
      return word.match(regex);
    });
  };

  const checkSlider = (sliderArr, flag) => {
    const min = sliderArr[0];
    const max = sliderArr[1];
    if (flag === "slider" && sliderArr[0] > sliderArr[1]) {
      sliderArr[0] = max;
      sliderArr[1] = min;
      return;
    }

    if (flag === "min" && sliderArr[0] > sliderArr[1]) {
      sliderArr[1] = min;
    }

    if (flag === "max" && sliderArr[0] > sliderArr[1]) {
      sliderArr[0] = max;
    }
  };

  const getCopyHotels = () => props.hotels.map((hotel) => {
      return { ...hotel };
    })

  // Главный фильтр
  const mainFilter = () => {
    let hotelsCopy = [];

    hotelsCopy = getCopyHotels();

    const filtersList = [
      (arr) => filterByCountry(arr, selectedCountries.value),
      (arr) => filterByType(arr, selectedType.value),
      (arr) => filterByRating(arr, selectedRating.value),
      (arr) => filterByReviews(arr, selectedNumReviews.value),
      (arr) => filterByPrice(arr, selectedRange.value),
    ];

    hotelsCopy = filtersList.reduce(
      (arr, filterFunc) => filterFunc(arr),
      hotelsCopy
    );

    onUpdateFilteredHotels(hotelsCopy);

    if (!hotelsCopy.length) {
      onUpdateIsEmpty(true);
    } else {
      onUpdateIsEmpty(false);
    }
  };

  // Фильтрация по странам
  const filterByCountry = (arr, selectedCountries) => {
    if (!selectedCountries.length) return arr;

    return arr.filter((el) => {
      return selectedCountries.find(
        (country) => country === el.country
      );
    });
  };

  // Фильтрация по типу
  const filterByType = (arr, selectedType) => {
    if (!selectedType) return arr;

    return arr.filter((el) => el.type === selectedType);
  };

  // Фильтрация по рейтингу
  const filterByRating = (arr, selectedRating) => {
    if (!selectedRating.length) return arr;

    return arr.filter((el) => {
      return selectedRating.find((rating) => el.rating === rating);
    });
  };

  // Фильтрация по количеству отзывов
  const filterByReviews = (arr, selectedNumReviews) => {
    if (!selectedNumReviews) return arr;

    return arr.filter((el) => el.reviews >= selectedNumReviews);
  };

  // Фильтрация по цене
  const filterByPrice = (arr, selectedRangePrice) => {
    if (!selectedRangePrice[1]) return arr;

    return arr.filter((el) => {
      return (
        +selectedRangePrice[0] <= el.price &&
        el.price <= +selectedRangePrice[1]
      );
    });
  };

  // Очистить фильтр
  const clearFilter = () => { 
    if (!isFilter.value) return;

    selectedCountries.value = [];
    selectedType.value = null;
    selectedRating.value = [];
    selectedNumReviews.value = null;
    selectedRange.value = [null, null];
    onUpdateFilteredHotels(getCopyHotels());
    onUpdateIsEmpty(false);
    onUpdateIsCleanFlag(false);
  };
</script>

<template>
  <div class="filter">
    <div class="filter-country box">
      <label
        for="multiple-ac-1"
        class="font-bold mb-2 box-name"
      >
        Страна
      </label>
      <AutoComplete
        v-model="selectedCountries"
        inputId="multiple-ac-1"
        placeholder="Поиск стран"
        :suggestions="countries"
        @complete="getAllCountries"
        multiple
        fluid
        completeOnFocus
        dropdown
      />
    </div>

    <div class="filter-radio box">
      <div class="box-name">Тип</div>
      <div
        v-for="type in types"
        :key="type.key"
        class="radio-button"
      >
        <RadioButton
          v-model="selectedType"
          :inputId="type.key"
          :value="type.name"
          name="type"
        />
        <label :for="type.key">{{ type.name }}</label>
      </div>
    </div>

    <div class="filter-checkbox box">
      <div class="box-name">Рейтинг</div>
      <div
        v-for="rating of ratings"
        :key="rating.key"
        class="checkbox-button"
      >
        <Checkbox
          v-model="selectedRating"
          name="rating"
          :inputId="rating.key"
          :value="rating.value"
        />
        <label :for="rating.key">{{ rating.name }}</label>
      </div>
    </div>

    <div class="filter-reviews box">
      <label
        for="num-reviews"
        class="box-name"
      >
        Количество отзывов (от)
      </label>
      <InputText
        v-model="selectedNumReviews"
        id="num-reviews"
        v-keyfilter="{
          pattern: /^(\d){1,9}$/,
          validateOnly: true,
        }"
        placeholder="Например, от 10"
      />
    </div>

    <div class="filter-slider box">
      <label
        for="price-min"
        class="box-name"
      >
        Цена
      </label>
      <div class="slider-box">
        <div class="slider-box__inputs">
          <InputText
            v-model="selectedRange[0]"
            id="price-min"
            placeholder="От 0 ₽"
            v-keyfilter="{
              pattern: /^(0|[1-9]\d{0,4})$/,
              validateOnly: true,
            }"
            @blur="checkSlider(selectedRange, 'min')"
          />
          <span>—</span>
          <InputText
            v-model="selectedRange[1]"
            id="price-max"
            placeholder="До 99 999 ₽"
            v-keyfilter="{
              pattern: /^[1-9]\d{0,4}$/,
              validateOnly: true,
            }"
            @blur="checkSlider(selectedRange, 'max')"
          />
        </div>
        <div class="slider-box__controls">
          <Slider
            v-model="selectedRange"
            range
            class="w-56"
            :min="0"
            :max="99999"
            @update:modelValue="checkSlider(selectedRange, 'slider')"
          />
        </div>
      </div>
    </div>

    <div class="filter-btns">
      <Button
        label="Применить фильтр"
        icon="pi pi-check"
        severity="success"
        @click="mainFilter"
        :disabled="!isFilter"
      />
      <Button
        label="Сбросить фильтр"
        icon="pi pi-times"
        severity="secondary"
        @click="clearFilter"
        :disabled="!isFilter"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
  @import "@/pages/Main/styles/Filter.css";
</style>
