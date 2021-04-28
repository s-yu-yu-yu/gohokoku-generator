<template>
  <div class="container">
    <div id="target">
      target div
    </div>

    <div id="result" class="mt-20" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import html2canvas from 'html2canvas';

export default Vue.extend({
  mounted () {
    // ロードされた際の処理として実施：
    window.onload = function () {
      const targetElement = document.getElementById('target');
      if (!targetElement) { return; }

      html2canvas(targetElement).then(function (canvas) {
        const base64Data: string = canvas.toDataURL().split(',')[1];
        const data: any = window.atob(base64Data);
        const buff: any = new ArrayBuffer(data.length);
        const arr: any = new Uint8Array(buff);

        for (let i: number = 0; i < data.length; i++) {
          arr[i] = data.charCodeAt(i);
        }

        const imageUrl = window.URL.createObjectURL(new Blob([arr], { type: 'image/png' }));

        const link = document.createElement('a');
        link.href = imageUrl;
        link.download = 'download.png';
        document.body.appendChild(link);
        link.click();
      });
    };
  }
});
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.mt-20 {
  margin-top: 20px;
}
</style>
