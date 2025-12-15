<template>
  <nav class="w-full">
    <div class="max-w-6xl mx-auto py-4 px-8 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between py-4">
        <NuxtLink to="/" class="text-lg font-semibold">Mini-shop</NuxtLink>
        <div class="flex items-center gap-6">
          <NuxtLink to="/" class="text-gray-300 hover:text-white">Home</NuxtLink>
          <NuxtLink to="/products" class="text-gray-300 hover:text-white">Products</NuxtLink>
          <NuxtLink to="/about" class="text-gray-300 hover:text-white">About</NuxtLink>
        </div>
      </div>
    </div>
  </nav>
</template>
