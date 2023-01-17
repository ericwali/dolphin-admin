/**
 * @program: dolphin-admin
 * @description: 防止重复点击
 * @author: entfrm开发团队-王翔
 * @create: 2022/4/8
 */

import { on, once } from '/@/utils/domUtils';
import type { Directive, DirectiveBinding } from 'vue';

const repeatDirective: Directive = {
  beforeMount(el: Element, binding: DirectiveBinding<any>) {
    let interval: Nullable<IntervalHandle> = null;
    let startTime = 0;
    const handler = (): void => binding?.value();
    const clear = (): void => {
      if (Date.now() - startTime < 100) handler();
      interval && clearInterval(interval);
      interval = null;
    };
    on(el, 'mousedown', (e: MouseEvent): void => {
      if ((e as any).button !== 0) return;
      startTime = Date.now();
      once(document as any, 'mouseup', clear);
      interval && clearInterval(interval);
      interval = setInterval(handler, 100);
    });
  },
};

export default repeatDirective;
