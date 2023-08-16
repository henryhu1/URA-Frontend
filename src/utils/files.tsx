import JSZip from 'jszip'

const compressFiles = async (fileList: FileList): Promise<Blob> => {
  const zip = new JSZip();
  for (let i = 0; i < fileList.length; i++) {
    const file = fileList[i];
    const fileContent = await file.arrayBuffer();
    zip.file(file.name, fileContent);
  }
  return zip.generateAsync({ type: "blob" });
};

export default compressFiles;
