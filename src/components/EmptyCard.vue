<script setup>
  const emit = defineEmits(["clearFilter"]);
</script>

<template>
  <div class="empty-card">
    <div class="header">
      <img
        src="/empty.png"
        alt="Пусто"
      />
    </div>
    <div class="content">
      <div class="content-title">
        По данным параметрам ничего не найдено
      </div>
      <div class="content-text">
        Попробуйте изменить параметры фильтрации или вернуться в общий
        каталог
      </div>
    </div>
    <div class="footer">
      <Button
        @click="emit('clearFilter', true)"
        class="footer-btn"
        label="Очистить фильтр"
        severity="secondary"
        icon="pi pi-times"
        size="large"
      />
    </div>
  </div>
</template>

<style lang="css" scoped>
  .empty-card {
    border-radius: 15px;
    border: 1px solid #cbd5e1;
    padding: 35px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 15px;
    height: 450px;

    .header {
      display: flex;
      justify-content: center;
      align-items: center;
      margin: 0 auto 25px auto;
      img {
        max-width: 240px;
        width: 100%;
        object-fit: contain;
      }
    }

    .content {
      max-width: 340px;
      text-align: center;
      margin-bottom: 20px;

      .content-title {
        font-size: 18px;
        line-height: 1.3;
        font-weight: bold;
        color: #3a3a3a;
        margin-bottom: 8px;
      }

      .content-text {
        font-size: 16px;
        line-height: 1.3;
        color: #969696;
      }
    }

    .footer {
      .footer-btn {
        display: flex;
        width: 240px;
        margin: 0 auto;
        border-radius: 15px;
      }
    }

    @media (width < 768px) {
      padding: 20px;
      gap: 10px;
      height: 400px;

      .header {
        margin: 0 auto 10px auto;
        img {
          max-width: 200px;
          width: 100%;
          object-fit: contain;
        }
      }

      .content {
        margin-bottom: 10px;
      }
    }
  }
</style>
