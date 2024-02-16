<script setup>

defineProps({
  walletConnect: Function,
  loader: Boolean
})

</script>

<template>
  <nav class="navbar navbar-dark bg-dark ">
    <div class="container-xxl ">
      <a class="navbar-brand fw-bold text-primary">MyTransactions</a>
      <div class="d-flex">
        <button class="btn btn-primary btn-lg wallet-connect-button" @click="walletConnect">
          <div v-if="loader" class="d-flex justify-content-center">
            <div class="spinner-border spinner-border-sm" role="status">
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
          <div v-else>WalletConnect</div>
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.wallet-connect-button {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 160px;
}

@media (min-width: 576px) {
  .wallet-connect-button {
    width: 220px;
  }
}
</style>
