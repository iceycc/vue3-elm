<template>
  <router-view></router-view>
</template>

<script lang="ts">
import {defineComponent} from 'vue';

export default defineComponent({});
</script>
<style lang="scss">
@import './style/common';

.router-fade-enter-active, .router-fade-leave-active {
  transition: opacity .3s;
}

.router-fade-enter, .router-fade-leave-active {
  opacity: 0;
}
</style>