<template>
<div>
  <header>
    <span>实验分类</span>
  </header>
  <div class="type-item one">
    <icon class="icon" name="#icon-protective-gloves" /> <router-link to="/SpExp/行为实验">行为实验</router-link>
  </div>
  <div class="type-item two">
    <icon class="icon" name="#icon-head-cross" /> <router-link to="/SpExp/脑电实验">脑电实验</router-link>
  </div>
  <div class="type-item three">
    <icon class="icon" name="#icon-crayons-1" /> <router-link to="/SpExp/问卷">问卷</router-link>
  </div>
  <div class="type-item four">
    <icon class="icon" name="#icon-magnet" /> <router-link to="/SpExp/核磁共振">核磁共振</router-link>
  </div>
  <div class="type-item five">
    <icon class="icon" name="#icon-testing-mouse" /> <router-link to="/SpExp/皮肤电实验">皮肤电实验</router-link>
  </div>
  <div class="type-item other">
    <icon class="icon" name="#icon-dna" /> <router-link to="/SpExp/其他">其他</router-link>
  </div>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from '@/components/Icon/Icon.vue';
@Component({
  components: {
    Icon,
  },
})
export default class SelectType extends Vue {}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
header {
  height: 4.2rem;
  text-align: center;
  background-color: $theme-color;
  font-size: 1.6rem;
  color: #fff;
  margin-bottom: 2rem;
  span {
    line-height: 4.2rem;
  }
}
.type-item {
  width: 90%;
  margin: 1.6rem auto;
  height: 5rem;
  text-align: center;
  border-radius: 0.6rem;
  position: relative;
  font-size: 1.6rem;
  @include shadow;
  &.one {
    background-color: $exp-one;
  }
  &.two {
    background-color: $exp-two;
  }
  &.three {
    background-color: $exp-three;
  }
  &.four {
    background-color: $exp-four;
  }
  &.five {
    background-color: $exp-five;
  }
  &.other {
    border: 0.2rem solid #eee;
  }
  .icon {
    width: 2.2rem;
    @include left-top(0.6rem, 50%);
    transform: translateY(-80%);
  }
  a {
    display: inline-block;
    width: 100%;
    height: 100%;
    line-height: 5rem;
  }
}
</style>
