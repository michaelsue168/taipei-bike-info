import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useToast = defineStore('ToastStore', () => {
  const msg = ref('');
  const show = ref(false);
  const errtype = ref('');
  let timer = null;

  const showToast = (message, type='info', duration = 1500) => {
    msg.value = message;
    errtype.value = type;
    show.value = true;
    if (timer) clearTimeout(timer);

    timer = setTimeout(() => {
      show.value = false;
    }, duration);
  };

  return {
    msg,
    errtype,
    show,
    showToast,
  };
});
