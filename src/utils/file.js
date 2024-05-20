import { createFile } from '../services/api/file'

export async function uploadFiles(filesList) {
  const formData = new FormData()
  for (const file of filesList) {
    formData.append('files', file)
  }
  const res = await createFile(formData)
  return res
}
