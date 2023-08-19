import JSZip from 'jszip';

const compressFiles = (fileList: FileList): Promise<Blob> => {
  const zip = new JSZip();
  Array.from(fileList).forEach(file => {
    zip.file(file.webkitRelativePath, file);
  });
  return zip.generateAsync({ type: "blob" });
};

export default compressFiles;
