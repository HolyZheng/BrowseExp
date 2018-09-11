import Vue, { VNode } from 'vue';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  // 自定义的实验类接口
  interface User {
    name: string;
    picture: string;
    user_id: number;
  }
  interface Exp {
    experiment_id: number;
    publisher_id: number;
    publisher_name: string;
    title: string;
    type: string;
    duration: string;
    pay: string;
    position: string;
    request: string;
    period: string;
    others: string;
    time: Date;
    application: string;
    content: string;
    user: User;
  }
}
