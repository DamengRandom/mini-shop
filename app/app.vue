<script setup lang="ts">
import Layout from '~/components/Layout.client.vue';
import Navbar from '~/components/Navbar.client.vue';
import MasonryProducts from '~/components/MasonryProducts.client.vue';
import Footer from '~/components/Footer.client.vue';
</script>

<template>
  <UApp>
    <Layout>
      <Navbar />
      <MasonryProducts />
      <Footer />
    </Layout>
  </UApp>
</template>
