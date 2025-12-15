<script setup lang="ts">
import Layout from '~/components/Layout.client.vue';
import Navbar from '~/components/Navbar.client.vue';
import MasonryProducts from '~/components/MasonryProducts.client.vue';
import Footer from '~/components/Footer.client.vue';
</script>

<template>
  <UApp>
    <div class="min-h-screen flex flex-col">
      <Navbar />
      <main class="flex-1">
        <Layout>
          <MasonryProducts />
        </Layout>
      </main>
      <Footer />
    </div>
  </UApp>
</template>
