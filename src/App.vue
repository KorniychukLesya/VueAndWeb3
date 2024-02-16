<script setup>
import { ref } from 'vue';
import Web3 from 'web3';
import axios from 'axios';
import Header from '../src/components/Header.vue';
import Footer from '../src/components/Footer.vue';
import SendTransaction from '../src/components/SendTransactions.vue';
import GetTransactions from '../src/components/GetTransaction.vue';
import Hero from '../src/components/Hero.vue';
import { useToast } from 'vue-toast-notification';

const toast = useToast()
const account = ref(null);
const balance = ref(null);
const transactions = ref([]);
const web3 = ref(null);
const loader = ref(false);
const idSepolia = 11155111;

function showToast(text) {
  toast.open({
    message: text,
    type: 'default',
    duration: 4000,
    position: 'top-right'
  })
}

const walletConnect = async () => {
  if (typeof window.ethereum !== 'undefined') {
    loader.value = true;
    try {
      web3.value = new Web3(window.ethereum);
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      const chainId = await web3.value.eth.getChainId();

      if (Number(chainId) !== 11155111) {
        switchToSepolia()
      }
      const accounts = await web3.value.eth.getAccounts();
      account.value = accounts[0];
      loader.value = false;

      getBalance();
      getTransactions();

    } catch (error) {
      console.error('Error connecting wallet:', error);
      showToast('Error connecting wallet')
      loader.value = false;
    }

  } else {
    console.error('MetaMask or similar Ethereum provider not found');
    showToast('MetaMask or similar Ethereum provider not found')
    loader.value = false;
  }
};

const switchToSepolia = async () => {
  const API_KEY = import.meta.env.VITE_INFURA_KEY
  const hexIdSepolia = '0x' + idSepolia.toString(16);
  const chainData = {
    chainId: hexIdSepolia,
    chainName: 'Sepolia',
    nativeCurrency: {
      name: 'Ether',
      symbol: 'SepoliaETH',
      decimals: 18,
    },
    rpcUrls: [`https://sepolia.infura.io/v3/${API_KEY}`],
    blockExplorerUrls: ['https://sepolia.etherscan.io/'],
  };

  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [chainData],
    });
    showToast('Network successfully switched to Sepolia');
  } catch (error) {
    console.error('Error when switching network to Sepolia:', error);
    showToast('Error when switching network to Sepolia');
  }
};

const getBalance = async () => {
  try {
    const weiBalance = await web3.value.eth.getBalance(account.value);
    balance.value = web3.value.utils.fromWei(weiBalance, 'ether');
  } catch (error) {
    console.error('Error when receiving balance:', error);
    loader.value = false;
  }
};

const getTransactions = async () => {
  try {
    const response = await axios.get('https://api-sepolia.etherscan.io/api', {
      params: {
        module: 'account',
        action: 'txlist',
        address: account.value,
        startblock: 0,
        endblock: 99999999,
        page: 1,
        offset: 10,
        sort: 'asc',
        apikey: import.meta.env.VITE_API_KEY_etherscan
      }
    });

    transactions.value = (response.data.result).reverse().slice(0, 10);

  } catch (error) {
    console.error('Error while receiving transactions:', error);
  }
}
</script>

<template>
  <Header 
    :walletConnect="walletConnect" 
    :loader="loader" 
  />
  <div v-if="account" class="container-xxl">
    <figure class="text-end border-bottom border-primary mb-3 mt-4">
      <blockquote class="blockquote">
        <p class="table-responsive">
          Address: {{ account }}
        </p>
      </blockquote>
      <figcaption class="blockquote fw-bold">
        Balance: {{ balance }} ETH
      </figcaption>
    </figure>
    <SendTransaction 
      :web3="web3" 
      :account="account" 
    />
    <GetTransactions 
      :web3="web3" 
      :transactions="transactions" 
    />
  </div>
  <div v-else class="container-xxl">
    <Hero />
  </div>
  <Footer />
</template>

<style scoped>
.container-xxl {
  min-height: calc(100vh - 190px);
  margin-bottom: 30px;
}
</style>
