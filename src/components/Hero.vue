<script setup>
import MetaMask from '../assets/MetaMask.png';

</script>

<template>
  <div class=" px-4 py-5 my-5 text-center">
    <h1 class="display-5 fw-bold">Please connect your web3 wallet</h1>
    <div class="col-lg-6 mx-auto d-flex align-items-center justify-content-center">
      <p class="lead mb-0 ">Don't have a web3 wallet?
        Download </p>
      <a href="https://metamask.io/" target="_blank">
        <img :src='MetaMask' class='img-metamask ' /></a>
    </div>
    <div class="card mt-4">
      <div class="card-header">
        Simple and convenient!
      </div>
      <div class="card-body">
        <p class="card-text">Our features allow you to securely and easily make transactions right from your browser. We
          offer an intuitively understandable interface that enables you to manage your finances quickly and efficiently.
        </p>
        <p class="card-text">
          Our features enable you to send funds to any part of the world in just a few clicks. Thanks to our platform, you
          can send funds quickly and securely.

        </p>
        <p class="card-text">
          We have a convenient feature that allows you to view your transaction history. You can see all previous
          transactions, including the date, amount, and addresses.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.img-metamask {
  width: 150px;
  margin-left: 10px;
}
</style>
