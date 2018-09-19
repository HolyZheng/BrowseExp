<template>
<div>
  <header>
    <img :src="exp.user && exp.user.picture" />
    <p>{{exp.user && exp.user.name}}</p>
  </header>
  <section>
    <p> 实验类型：<small>{{exp.type}}</small></p>
    <p> 实验时长：<small>{{exp.duration}} min</small></p>
    <p> 薪酬：<small style="color: red">￥{{exp.pay}}</small></p>
    <p class="segment">实验地点：<br>
      <small>{{exp.position}}</small>
    </p>
    <p class="segment">被试要求：<br>
      <small>{{exp.request}}</small>
    </p>
    <p class="segment">可选时间段：<br>
      <small>{{exp.period}}</small>
    </p>
    <p class="segment">实验内容：<br>
      <small>{{exp.content}}</small>
    </p>
    <p class="segment">其他信息：<br>
      <small>{{exp.others}}</small>
    </p>
    <p class="segment">报名方式：<br>
      <small>{{exp.application}}</small>
    </p>
  </section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

import { getExperiment } from '@/api/data';

@Component
export default class ExpDetail extends Vue {
  private exp !: Exp;
  private data() {
    return {
      exp: {},
    };
  }
  private created() {
    const id: number = Number(this.$route.query.id);
    getExperiment(id)
      .then((res: any) => {
        this.exp = res.data;
      })
      .catch((err: any) => {
        throw new Error(err);
      });
  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
header {
  height: 6rem;
  border-bottom: 0.1rem solid #eee;
  @include shadow;
  img {
    @include circular(2rem);
    vertical-align: middle;
    margin: 1rem 1rem 2.4rem 1rem;
  }
  p {
    display: inline-block;
    margin: 0;
    font-size: 1.8rem;
    width: 12rem;
    @include text-deal;
  }
}
section {
  box-sizing: border-box;
  padding: 1rem 1.6rem;
  p {
    font-size: 1.6rem;
    margin: 0.4rem 0;
    &.segment {
      padding-bottom: 0.6rem;
      border-bottom: 0.1rem dashed #eeeeee;
    }
    small {
      display: inline-block;
      line-height: 1.6rem;
      margin: 0.6rem 1rem 0.6rem 1rem;
    }
  }
}
footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  button {
    width: 90%;
    height: 4rem;
    border-radius: 0.6rem;
    margin-top: 1rem;
    font-size: 1.6rem;
    color: #fff;
    border-style: none;
    background-color: $green;
  }
  p {
    text-align: center;
    font-size: 1rem;
    color: rgb(194, 193, 193);
  }
}
</style>
