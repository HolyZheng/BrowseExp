<template>
<div class="skeleton-wrap">
<div class="skeleton">
  <div class="left-right item"></div>
  <div class="line-zero item"></div>
  <div class="line-one item"></div>
  <div class="line-two item"></div>
  <div class="line-three item"></div>
</div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class SkeletonExp extends Vue {}
</script>

<style src="./SkeletonExp.scss" scoped lang="scss">
</style>
