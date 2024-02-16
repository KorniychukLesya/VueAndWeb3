<script setup>
import { ref } from 'vue';
import { Field, Form as VForm } from 'vee-validate';
import { useToast } from 'vue-toast-notification';

const toast = useToast()
const recipient = ref('');
const amount = ref(null);

const prop = defineProps({
  web3: Object,
  account: String
})

function showToast(text) {
  toast.open({
    message: text,
    type: 'default',
    duration: 4000,
    position: 'top-right'
  })
}

const sendTransaction = async () => {
  try {
    const gasEstimate = await prop.web3.eth.estimateGas({
      to: recipient.value,
      value: prop.web3.utils.toWei(amount.value, 'ether')
    });
    const transaction = await prop.web3.eth.sendTransaction({
      from: prop.account,
      to: recipient.value,
      value: prop.web3.utils.toWei(amount.value, 'ether'),
      gas: gasEstimate
    });
    showToast('The transaction was sent successfully')

  } catch (error) {
    console.error('Error sending transaction:', error);
    showToast('Error sending transaction')
  }
}
</script>

<template>
  <div class="card text-bg-dark mb-3">
    <div class="card-header">
      Submit transaction
    </div>
    <VForm class="d-flex flex-column p-2 justify-content-center" @submit="sendTransaction">
      <div class="mb-3">
        <label for="address" class="form-label">Address of the recipient</label>
        <Field rules="required|addreess" v-slot="{ errors, field }" name="address" v-model="recipient">
          <input v-bind="field" :class="{ invalidInput: errors[0] }" class="form-control" id="address" type="text" />
          <span class="validation-error-msg">{{ errors[0] }}</span>
        </Field>
      </div>
      <div class="mb-3">
        <label for="amount" class="form-label">Аmount</label>
        <Field rules="required|numeric" v-slot="{ errors, field }" name="amount" v-model="amount">
          <input v-bind="field" :class="{ invalidInput: errors[0] }" class="form-control" id="amount" type="number" />
          <span class="validation-error-msg">{{ errors[0] }}</span>
        </Field>
      </div>

      <button class="btn btn-primary mb-3" type="submit">Submit</button>
    </VForm>
  </div>
</template>

<style scoped>
.card {
  margin: 40px auto;
  max-width: 500px;
}

.invalidInput {
  border-color: red !important;
  background-position: 99% 50%;
  background-repeat: no-repeat;
  background-size: 25px;
}

span.validation-error-msg {
  color: red;
  font-size: 12px;
}
</style>
