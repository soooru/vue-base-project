<template>
  <div
    class="fill-width d-flex align-center flex-column text-center pt-12"
    style="height: 100vh"
  >
    <h1 class="display-3 font-weight-bold mb-5">404 NOT FOUND</h1>
    <h3>
      <p v-if="resource === 'page'">
        페이지가 존재하지 않거나, 사용할 수 없는 페이지입니다.<br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </p>
      <p v-else>
        {{ resource }} 페이지를 여는데 문제가 생겼습니다.<br />
        잠시 후 다시 시도해주세요.
      </p>
    </h3>
    <div class="mt-5">
      <v-btn class="mr-3 text-capitalize" outlined @click="$router.go(-1)"
        >이전 화면</v-btn
      >
      <v-btn
        class="mr-3 text-capitalize"
        outlined
        @click="$router.push({ name: 'home' })"
        >홈으로 가기</v-btn
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true,
    },
  },
}
</script>
