<template>
  <div>
    test
    <template v-if="data">
      {{ data.api }}
    </template>
  </div>
</template>

<script setup lang="ts">
const { data, pending, error, refresh } = await useFetch("/api/hello");
</script>
