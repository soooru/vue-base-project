<template>
  <div
    class="fill-width d-flex align-center flex-column text-center pt-12"
    style="height: 100vh"
  >
    <v-icon>mdi-alert mdi-48px</v-icon>
    <h1 class="display-1 font-weight-bold my-5">Network Error</h1>
    <h3>
      Slow or no internet connection.<br />Please check your internet settings
    </h3>
    <div class="mt-5">
      <v-btn class="mr-3 text-capitalize" outlined @click="$router.go(-1)"
        >Try again</v-btn
      >
    </div>
  </div>
</template>
