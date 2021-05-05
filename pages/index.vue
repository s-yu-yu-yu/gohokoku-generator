<template>
  <div class="un_container">
    <p class="is-size-6 mt-4">
      タイトル
    </p>
    <input v-model="title" class="input" type="text">

    <p class="is-size-6 mt-4">
      本文
    </p>
    <textarea v-model="text" class="textarea" />

    <p class="is-size-6 mt-4">
      日付
    </p>
    <input v-model="date" class="input" type="text">

    <p class="is-size-6 mt-4">
      名前
    </p>
    <input v-model="name" class="input" type="text">

    <p class="is-size-6 mt-4">
      プレビュー
    </p>
    <div id="target" class="un_preview">
      <p class="un_preview_title">
        <span>{{ title }}</span>
      </p>
      <p class="un_preview_text">
        {{ text }}
      </p>
      <p class="un_preview_date">
        {{ date }}
      </p>
      <p class="un_preview_name">
        {{ name }}
      </p>
    </div>

    <button class="button is-info mt-4 hp_mlAuto" @click="download">
      ダウンロード
    </button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import html2canvas from 'html2canvas';
import { downloadUrl } from '~/utils/download';

export default Vue.extend({
  data () {
    return {
      title: '',
      text: '',
      date: '',
      name: ''
    };
  },

  methods: {
    download () {
      const targetElement = document.getElementById('target');
      if (!targetElement) { return; }
      document.documentElement.scrollTo(0, 0);
      this.downloadElement(targetElement);
    },
    downloadElement (element: HTMLElement) {
      html2canvas(element, {
        scale: 2
      }).then(function (canvas) {
        const base64Data: string = canvas.toDataURL().split(',')[1];
        const data: any = window.atob(base64Data);
        const buff: any = new ArrayBuffer(data.length);
        const arr: any = new Uint8Array(buff);

        for (let i: number = 0; i < data.length; i++) {
          arr[i] = data.charCodeAt(i);
        }

        const imageUrl = window.URL.createObjectURL(new Blob([arr], { type: 'image/png' }));
        downloadUrl(imageUrl);
      });
    }
  }
});
</script>

<style lang="scss" scoped>
.un_container {
  margin: 0 auto;
  min-height: 100vh;
  max-width: 1080px;
  padding: 30px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 12px;
}

.un_preview {
  width: 400px;
  height: 530px;
  padding: 15px 30px;
  line-height: 1.6;
  word-wrap: break-word;
  white-space: pre-line;
  border: 1px solid #000;
  font-family: 'Sawarabi Mincho';
  font-size: 10px;
  font-weight: 400;

  &_title {
    width: 100%;
    height: 20px;
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }

  &_text {
    height: 80%;
    text-align: left;
    margin-top: 5px;
  }

  &_date {
    height: 20px;
    text-align: right;
  }

  &_name {
    height: 20px;
    text-align: right;
  }
}

.hp_mlAuto {
  margin-left: auto;
}
</style>
