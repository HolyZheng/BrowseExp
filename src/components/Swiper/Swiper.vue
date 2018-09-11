<template>
<div class='carousel-wrap' id='carousel'>
    <transition-group tag='ul' class='slide-ul' name='list'>
      <li v-for='(list,index) in slideList' :key='index' v-show='index===currentIndex' @mouseenter='stop' @mouseleave='go'>
        <a :href='list.clickUrl' >
          <img :src='list.image' :alt='list.desc'>
        </a>
      </li>
    </transition-group>
    <div class='carousel-items'>
      <span v-for='(item,index) in slideList.length' :key='index' :class="{'active':index===currentIndex}" @mouseover='change(index)'></span>
    </div>
</div>
</template>

<script lang='ts'>
import { Component, Vue, Watch, Emit, Prop } from 'vue-property-decorator';
@Component
export default class Swiper extends Vue {
  private slideList!: [
    {
      clickUrl: string,
      desc: string,
      image: string,
    }
  ];
  private timer!: any;
  private currentIndex!: number;
  private data() {
    return {
      slideList: [
        {
          clickUrl: '#',
          desc: 's',
          image: 'https://dummyimage.com/680x300/f1d65b/fff.png&text=say%20somthing',
        },
        {
          clickUrl: '#',
          desc: 'hxrj',
          image: 'https://dummyimage.com/680x300/40b7ea/fff.png&text=what%20is%20it?',
        },
      ],
      currentIndex: 0,
      timer: null,
    };
  }
  private go() {
    this.timer = setInterval(() => {
      this.autoPlay();
    }, 4000);
  }
  private stop() {
    clearInterval(this.timer);
    this.timer = null;
  }
  private change(index: number) {
    this.currentIndex = index;
  }
  private autoPlay() {
    this.currentIndex++;
    if (this.currentIndex > this.slideList.length - 1) {
        this.currentIndex = 0;
    }
  }
  private created() {
    this.$nextTick(() => {
      this.timer = setInterval(() => {
        this.autoPlay();
      }, 4000);
    });
  }
}
</script>

<style lang='scss' src='./Swiper.scss' scoped>
</style>

