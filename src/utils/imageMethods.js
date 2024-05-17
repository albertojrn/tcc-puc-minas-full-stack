export function imgFileToDataUrl(file, resolve) {
  const reader = new FileReader()
  reader.onload = function (e) {
    const imageDataUrl = e.target.result
    resolve({ name: file.name, dataUrl: imageDataUrl, file })
  }
  reader.readAsDataURL(file)
}
