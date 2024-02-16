<script setup>

defineProps({
  web3: Object,
  transactions: Array,
})

const formatDate = (timestamp) => {
  const date = new Date(timestamp * 1000); 
  return date.toLocaleString(); 
};

</script>
<template>
  <div class="table-responsive">
    <h2 class="text-uppercase mt-3 mb-3">my transactions</h2>
    <table class="table table-striped table-bordered">
      <thead>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Amount</th>
          <th scope="col">Sender</th>
          <th scope="col">Recipient</th>
          <th scope="col">Transaction hash</th>
        </tr>
      </thead>
      <tbody class="table-group-divider">
        <tr v-for="(transaction, index) in transactions" :key="index">
          <td>{{ formatDate(transaction.timeStamp) }}</td>
          <td> {{ web3.utils.fromWei(transaction.value, 'ether') }} ETH</td>
          <td>{{ transaction.from }}</td>
          <td>{{ transaction.to }}</td>
          <td>{{ transaction.hash }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
