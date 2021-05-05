/**
 * 指定したURLのファイルをダウンロードする
 * @param url URL
 */
export const downloadUrl = (url: string) => {
  const link = document.createElement('a');
  link.href = url;
  link.target = '_blank';
  link.download = 'gohokoku.png';
  document.body.appendChild(link);
  link.click();
};
