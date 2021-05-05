/**
 * 指定したURLのファイルをダウンロードする
 * @param url URL
 */
export const downloadUrl = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.download = 'download.png';
  document.body.appendChild(link);
  setTimeout(() => {
  }, 1000);
  link.click();
};
