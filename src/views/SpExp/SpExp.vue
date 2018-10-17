<template>
<div>
  <header>
    <span>{{type}}</span>
  </header>
  <section>
    <div v-if="!complete" >
      <skeleton-exp />
    </div>
    <div v-else-if="expArray.length" v-for="(exp, index) in expArray" :key="index">
      <exp-brief :picture="exp.user.picture" :name="exp.user.name" :title="exp.title" :type="exp.type" :pay="exp.pay" :duration="exp.duration" :id="exp.experiment_id" />
    </div>
    <div class="no-res" v-else>
      暂时没有相关实验呢，<br /> 稍后再查看吧~
    </div>
  </section>
</div>
</template>

<script lang="ts">
import {Component, Vue, Prop} from 'vue-property-decorator';
import ExpBrief from '@/components/ExpBrief/ExpBrief.vue';
import SkeletonExp from '@/components/Skeleton/SkeletonExp.vue';

import { getExperimentsByType, getAllExperiments } from '@/api/data';

@Component({
  components: {
    ExpBrief,
    SkeletonExp,
  },
})
export default class SpExp extends Vue {
  @Prop() private type !: string;
  private expArray!: Exp[];
  private complete!: boolean;
  private data() {
    return {
      expArray: [],
      complete: false,
    };
  }
  private created() {
    const ctx = this;
    if (ctx.type !== '实验广场') {
      getExperimentsByType(ctx.type, 5, 0)
        .then((res: any) => {
          ctx.expArray = res.data;
          ctx.complete = true;
        })
        .catch((err: any) => {
          ctx.complete = true;
          throw new Error(err);
        });
    } else {
      getAllExperiments(5, 0)
        .then((res: any) => {
          ctx.expArray = res.data;
          ctx.complete = true;
        })
        .catch((err: any) => {
          ctx.complete = true;
          throw new Error(err);
        });
    }

  }
}
</script>

<style scoped lang="scss">
@import '../../style/common.scss';
header {
  height: 4.2rem;
  text-align: center;
  background-color: $theme-color;
  font-size: 1.6rem;
  color: #fff;
  span {
    line-height: 4.2rem;
  }
}
.no-res {
  padding-top: 4.6rem;
  font-size: 1.4rem;
  line-height: 1.8rem;
  text-align: center;
  color: rgb(145, 145, 145);
}
</style>
