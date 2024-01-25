import { AxiosResponse } from "axios";

export { fileToBlob, downloadFile };

/**
 * Convert a File to a Blob
 * @param file The File to convert
 */
function fileToBlob(file: File): Promise<Blob> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result) {
        resolve(new Blob([reader.result as ArrayBuffer]));
      } else {
        reject(new Error("FileReader result is null"));
      }
    };
    reader.readAsArrayBuffer(file);
  });
}

/**
 * Download a file from a response
 * @param response The response to download
 */
function downloadFile(response: AxiosResponse) {
  const a = document.createElement("a");
  const href = window.URL.createObjectURL(new Blob([response.data]));
  a.href = href;
  let fileName: string = response.headers["content-disposition"].split("=")[1];
  fileName = fileName.replaceAll(/[\s"]/g, "");
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(href);
}
