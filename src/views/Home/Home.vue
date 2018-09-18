<template>
<div>
  <header>
    实验预览版本<br>
    <small>The version for Browse</small>
  </header>
  <div class="below-header"></div>
  <swiper />
  <nav>
    <div class="to-type" @click="navTo(1)">
      <icon name="#icon-book-2" />
      <span>实验分类</span>
    </div>
    <div class="to-exp" @click="navTo(2)">
      <icon name="#icon-crayons-1" />
      <span>实验广场</span>
    </div>
  </nav>
  <section>
    <div class="sec-title">
      <strong>实验广场</strong>
      <img src="../../images/down.png" />
    </div>
    <div v-if="!complete" >
      <skeleton-exp />
    </div>
    <div v-else v-for="(exp, index) in expArray" :key="index">
      <exp-brief :picture="exp.user.picture" :name="exp.user.name" :title="exp.title" :type="exp.type" :pay="exp.pay" :dutation="exp.duration" :id="exp.experiment_id" />
    </div>
  </section>
</div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Swiper from '@/components/Swiper/Swiper.vue';
import Icon from '@/components/Icon/Icon.vue';
import ExpBrief from '@/components/ExpBrief/ExpBrief.vue';
import SkeletonExp from '@/components/Skeleton/SkeletonExp.vue';

import { getAllExperiments } from '@/api/data';

@Component({
  components: {
    Swiper,
    Icon,
    ExpBrief,
    SkeletonExp,
  },
})
export default class Index extends Vue {
  private expArray!: Exp[];
  private complete!: boolean;
  private data() {
    return {
      expArray: [],
      complete: false,
    };
  }
  private navTo(id: number) {
    if (id === 1) {
      this.$router.push('/SelectType');
    } else if (id === 2) {
      this.$router.push('/SpExp/实验广场');
    }
  }
  private created() {
    const ctx = this;
    getAllExperiments(5, 0)
      .then((res: any) => {
        ctx.expArray = res.data;
        ctx.complete = true;
      })
      .catch((err: any) => {
        ctx.complete = false;
        throw new Error(err);
      });
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/common.scss';
header {
  position: sticky;
  top: 0;
  z-index: 9999;
  height: 5.4rem;
  padding-top: 1rem;
  background-color: $theme-color;
  text-align: center;
  font-size: 1.6rem;
  color: #fff;
}
.below-header {
  height: 4.6rem;
  background-color: $theme-color;
  @include shadow;
}
nav {
  height: 10rem;
  @include fja(space-around);
  .to-type, .to-exp {
    width: 40%;
    height: 6rem;
    border-radius: 0.6rem;
    font-size: 1.8rem;
    @include fja(flex-start);
    @include shadow;
  }
  .to-type {
    background-color: #B7E8DF;
  }
  .to-exp {
    background-color: #A3ADE8
  }
}
.sec-title {
  @include fja(flex-start);
  strong {
    font-size: 1.6rem;
    margin-left: 2rem;
  }
  img {
    width: 4rem;
    height: 3rem;
    @include to-rotate(-90deg)
  }
}
</style>


