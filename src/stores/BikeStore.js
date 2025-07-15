import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';
import { useToast } from './Toast';
export const useYouBikeStore = defineStore('BikeStore', () => {
  const Toast = useToast()
  // 查找關鍵字
  const SearchKeyword = ref('');

  // 放置站點資訊列表
  const BikeInfo = ref([]);

  // 放置收藏清單
  const keepList = ref([]);

  const btn_loading = ref(false);

  // 取得localStorage列表
  const GetkeepList = () => {
    keepList.value = JSON.parse(localStorage.getItem('keepList')) || [];
  };

  const Deletekeep = (sno) => {
    const index = keepList.value.findIndex((item) => item.sno === sno);
    if (index !== -1) {
      keepList.value.splice(index, 1);
      setKeep();
    }
     Toast.showToast('已取消收藏 !','warning');
  };
  const setKeep = () => {
     keepList.value = keepList.value.map(item => ({
    ...item,
    keep: true
  }));

    localStorage.setItem('keepList', JSON.stringify(keepList.value));
    updateBikeKeepStatus();
    Toast.showToast('已加入收藏 !');
  };

  const updateBikeKeepStatus = () => {
    BikeInfo.value = BikeInfo.value.map((item) => {
      const isKept = keepList.value.some((k) => k.sno === item.sno);
      return {
        ...item,
        keep: isKept,
      };
    });
  };

  const getBikeInfo = async () => {
    btn_loading.value = true;
    BikeInfo.value = []
    try {
      const res = await axios.get(
        'https://tcgbusfs.blob.core.windows.net/dotapp/youbike/v2/youbike_immediate.json'
      );
      if (!SearchKeyword.value) {
        BikeInfo.value = res.data;
      } else {
        const keyword = SearchKeyword.value.toLowerCase();
        BikeInfo.value = res.data.filter(
          (station) =>
            station.sna.toLowerCase().includes(keyword) ||
            station.ar.toLowerCase().includes(keyword) ||
            station.sarea.toLowerCase().includes(keyword)
        );
      }
      updateBikeKeepStatus();
      Toast.showToast('已完成查詢 !');
    } catch (error) {
      console.error(error);
    } finally {
      btn_loading.value = false;
    }
  };

  return {
    SearchKeyword,
    BikeInfo,
    btn_loading,
    keepList,
    Deletekeep,
    GetkeepList,
    setKeep,
    getBikeInfo,
  };
});
