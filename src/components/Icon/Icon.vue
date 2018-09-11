<template>
  <svg class="icon" aria-hidden="true">
    <use :xlink:href="name"></use>
  </svg>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class Icon extends Vue {
  @Prop() private name!: string;
}
</script>

<style lang="scss" src="./Icon.scss" scoped>
</style>

