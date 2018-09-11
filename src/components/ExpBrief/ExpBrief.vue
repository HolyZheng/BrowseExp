<template>
<div @click="navigateToExpDetail">
  <figure>
    <img class="portrait" :src="picture" />
    <p>{{name}}</p>
  </figure>
  <section>
    <h2>{{title}}</h2>
    <p>分类：{{type}}</p>
    <p>薪酬：<big>￥{{pay}}</big> / {{duration}}min</p>
    <div class="more">
      详情
      <img class="arrow" src="../../images/down.png" />
    </div>
  </section>
</div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
@Component
export default class ExpBrief extends Vue {
  @Prop() private picture!: string;
  @Prop() private name!: string;
  @Prop() private title!: string;
  @Prop() private type!: string;
  @Prop() private pay!: string;
  @Prop() private duration!: string;
  @Prop() private id!: number;
  private navigateToExpDetail(id: number) {
    this.$router.push({
      path: '/ExpDetail',
      query: {
        id: this.id.toString(),
      },
    });
  }
}
</script>

<style lang="scss" src="./ExpBrief.scss" scoped></style>

