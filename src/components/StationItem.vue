<template>
  <div
    class="w-80 bg-white rounded-xl shadow-md overflow-hidden transition-transform hover:scale-105 duration-300 cursor-pointer"
    @click="onOpenModal">
    <div class="p-4">
      <div class="flex justify-between items-baseline mb-2">
        <!-- <h2 class="text-lg font-semibold text-gray-800">{{ props.Info.sna.replace('YouBike2.0_', '') }}</h2> -->
        <h2 class="text-lg font-semibold text-gray-800">{{ props.Info.sna }}</h2>
        <button class="btn btn-link p-2 hover:text-red-500" @click.stop="onSetKeep" v-if="!props.Info.keep">
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 24 24">
            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="m12 21l-8.8-8.3A5.6 5.6 0 1 1 12 6a5.6 5.6 0 1 1 8.9 6.6z" />
          </svg>
        </button>
        <button class="btn btn-link p-2 hover:text-red-500" @click.stop="YouBikeStore.Deletekeep(props.Info.sno)"
          v-else>
          <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 20 20">
            <path fill="currentColor"
              d="m10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
          </svg>
        </button>
      </div>
      <p class="text-sm text-gray-600 mb-1">所在區：{{ props.Info.sarea }}</p>
      <p class="text-sm text-gray-600 mb-1">地址：{{ props.Info.ar }}</p>
      <p class="text-sm text-gray-600">可還：<span class="font-bold">{{ props.Info.available_rent_bikes }}</span> |
        可租：<span class="font-bold">{{ props.Info.available_return_bikes }}</span></p>
    </div>
  </div>
  <dialog ref="my_modal_2" class="modal">
    <div class="modal-box">
      <div class="h-48 w-full">
        <iframe class="w-full h-full" :src="mapUrl" style="border:0;" allowfullscreen="" loading="lazy"></iframe>
      </div>
      <div>
        <div class="flex justify-between items-baseline mb-2">
          <h3 class="text-lg font-bold">{{ props.Info.sna }}</h3>
          <button class="btn btn-link p-2 hover:text-red-500" @click.stop="onSetKeep" v-if="!props.Info.keep">
            <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 24 24">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="m12 21l-8.8-8.3A5.6 5.6 0 1 1 12 6a5.6 5.6 0 1 1 8.9 6.6z" />
            </svg>
          </button>
          <button class="btn btn-link p-2 hover:text-red-500" @click.stop="YouBikeStore.Deletekeep(props.Info.sno)"
            v-else>
            <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.2em]" viewBox="0 0 20 20">
              <path fill="currentColor"
                d="m10 3.22l-.61-.6a5.5 5.5 0 0 0-7.78 7.77L10 18.78l8.39-8.4a5.5 5.5 0 0 0-7.78-7.77l-.61.61z" />
            </svg>
          </button>
        </div>
        <div class="flex flex-wrap -mx-5">
          <div class="stats shadow overflow-hidden">
            <div class="stat">
              <div class="stat-title text-[12pt]">可租數量</div>
              <div class="stat-value text-primary">{{ props.Info.available_rent_bikes }}<small
                  class="text-[15pt]">&nbsp;/輛</small></div>
            </div>
          </div>
          <div class="stats shadow overflow-hidden">
            <div class="stat">
              <div class="stat-title text-[12pt]">可還數量</div>
              <div class="stat-value text-primary">{{ props.Info.available_return_bikes }}<small
                  class="text-[15pt]">&nbsp;/輛</small></div>
            </div>
          </div>
          <div class="stats shadow overflow-hidden">
            <div class="stat">
              <div class="stat-title text-[12pt]">總停車格</div>
              <div class="stat-value text-primary">{{ props.Info.Quantity }}<small class="text-[15pt]">&nbsp;/格</small>
              </div>
            </div>
          </div>
        </div>
        <small class="text-gray-400">資料更新時間：{{ props.Info.mday }}</small>
      </div>
    </div>
    <form method="dialog" class="modal-backdrop">
      <button>close</button>
    </form>
  </dialog>

</template>

<script setup>
import { useYouBikeStore } from '@/stores/BikeStore';
import { computed, ref } from 'vue';

const YouBikeStore = useYouBikeStore()
const props = defineProps({
  Info: Object
});

const my_modal_2 = ref()

// const mapUrl = computed(() => {
//   const lat = props.Info.latitude;
//   const lon = props.Info.longitude;
//   return `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`;
// });

const mapUrl = ref('')
const onOpenModal = () => {
  const lat = props.Info.latitude;
  const lon = props.Info.longitude;
  mapUrl.value = `https://maps.google.com/maps?q=${lat},${lon}&z=15&output=embed`
  my_modal_2.value.showModal()
}

const onSetKeep = () => {
  YouBikeStore.keepList.push({ ...props.Info });
  YouBikeStore.setKeep(props.Info)
};

</script>
