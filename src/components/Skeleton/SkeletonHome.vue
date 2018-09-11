<template>
<div class="skeleton-home">
  <div class="top-line"></div>
  <div class="center-hor-line"></div>
  <div class="left-col-line"></div>
  <div class="center-col-line"></div>
  <div class="right-col-line"></div>
  <skeleton-exp />
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import SkeletonExp from './SkeletonExp.vue';
@Component({
  components: {
    SkeletonExp,
  },
})
export default class Index extends Vue {}
</script>

<style src="./SkeletonHome.scss" scoped lang="scss">
</style>
