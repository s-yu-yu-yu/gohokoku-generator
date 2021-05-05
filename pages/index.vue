<template>
  <div class="un_container">
    <div id="target" class="un_preview">
      <span class="un_preview_title">{{ title }}</span>
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

    <p>タイトル</p>
    <input v-model="title" type="text">

    <p>本文</p>
    <textarea v-model="text" />

    <p>日付</p>
    <input v-model="date" type="text">

    <p>名前</p>
    <input v-model="name" type="text">

    <button @click="download">
      download
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
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
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
    height: 20px;
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
</style>
