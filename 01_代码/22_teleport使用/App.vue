<template>
  <h2>Teleport(瞬移)</h2>
  <hr />
  
  <ModalButton />
</template>

<script lang="ts">
import { defineComponent } from "vue";

import ModalButton from './components/ModalButton.vue'
export default defineComponent({
  name: "App",
  components: {
    ModalButton
  }
});
</script>
