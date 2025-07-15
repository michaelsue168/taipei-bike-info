<script setup>
import { onMounted, ref, watch } from 'vue';
import StationItem from './components/StationItem.vue';
import { useYouBikeStore } from './stores/BikeStore';
import { useToast } from './stores/Toast';
const Toast = useToast()
const YouBikeStore = useYouBikeStore()


const ScrollTop = () => {
  window.scrollTo({ 'top': 0, behavior: 'smooth' })
}

onMounted(() => {
  YouBikeStore.GetkeepList()
})

watch(() => YouBikeStore.SearchKeyword.length, (newVal, oldVal) => {
  if (newVal == 0) {
    YouBikeStore.BikeInfo = []
  }
})
</script>

<template>
  <main class="mx-auto flex flex-col justify-start items-center gap-5 p-8 min-h-[95vh]">
    <h1 class="text-2xl font-bold ">臺北市 YouBike2.0 即時查詢系統</h1>
    <div class="w-full max-w-md flex items-stretch">
      <div class="flex items-center border border-gray-300 rounded-l-xl shadow-md px-4 py-2 flex-1">
        <svg class="h-[1em] w-[1em] opacity-50 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
          stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
        <input v-model.trim="YouBikeStore.SearchKeyword" type="search" placeholder="請輸入站名、地區或地址 (e.g.大安區)"
          @keyup.enter="YouBikeStore.getBikeInfo" class="outline-none w-full h-full" />
      </div>

      <button @click="YouBikeStore.getBikeInfo" :disabled="YouBikeStore.SearchKeyword.length == 0"
        class="btn btn-primary rounded-none rounded-r-xl flex items-center justify-center px-4">
        <span class="loading loading-spinner" v-show="YouBikeStore.btn_loading"></span>
        <span>搜尋</span>
      </button>
    </div>


    <div class="tabs  tabs-border w-full">
      <label class="tab">
        <input type="radio" name="my_tabs_1" checked="checked" />
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2" viewBox="0 0 20 20">
          <path fill="currentColor"
            d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z" />
        </svg>
        Result
      </label>
      <div class="tab-content bg-base-100 border-base-300 px-3 py-6">
        <div class="flex flex-wrap gap-5 justify-start ">
          <StationItem v-for="station in YouBikeStore.BikeInfo" :key="station.sno" :Info="station"
            v-if="YouBikeStore.BikeInfo.length != 0" />

          <div role="alert" class="alert alert-error alert-soft w-full" v-else>
            <span>沒有找到符合條件的站點.</span>
          </div>
        </div>
      </div>

      <label class="tab">
        <input type="radio" name="my_tabs_1" />
        <svg xmlns="http://www.w3.org/2000/svg" class="size-4 me-2" viewBox="0 0 24 24">
          <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="m12 21l-8.8-8.3A5.6 5.6 0 1 1 12 6a5.6 5.6 0 1 1 8.9 6.6z" />
        </svg>
        Favorite
      </label>
      <div class="tab-content bg-base-100 border-base-300 px-3 py-6">
        <div class="flex flex-wrap gap-5 justify-start ">
          <StationItem v-for="station in YouBikeStore.keepList" :key="station.sno" :Info="station" />
        </div>
      </div>
    </div>

    <div role="alert" class="alert alert-info  fixed top-5 right-5 transition-opacity duration-300"
      :class="{ 'opacity-0': !Toast.show, 'alert-warning': Toast.errtype == 'warning' }">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" class="h-6 w-6 shrink-0 stroke-current">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
      <span class=" text-md font-bold">{{ Toast.msg }}</span>
    </div>
    <!-- ScrollTop -->
    <div class="fixed bottom-10 right-5">
      <button class="btn btn-circle btn-success" @click="ScrollTop">
        <svg xmlns="http://www.w3.org/2000/svg" class="size-[1.5em]" viewBox="0 0 24 24"><path fill="currentColor" d="m12 4l-.707-.707l.707-.707l.707.707zm1 15a1 1 0 1 1-2 0zM5.293 9.293l6-6l1.414 1.414l-6 6zm7.414-6l6 6l-1.414 1.414l-6-6zM13 4v15h-2V4z"/></svg>
      </button>
    </div>
  </main>
  <footer class="footer sm:footer-horizontal footer-center bg-base-300 text-base-content p-4">
    <aside>
      <p>Copyright © 2025 - All right reserved by Michael Su.</p>
    </aside>
  </footer>
</template>
