<template>
  <div>
    Date from api
    <template v-if="data">
      {{ data.api }}
    </template>

    <br />
    Date from client {{ new Date().getTime() }}
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch("/api/hello");
</script>
