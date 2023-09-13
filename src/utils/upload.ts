import multer, { Multer } from 'multer'
import crypto from 'crypto'

function upload(path: string): Multer {
  const storage = multer.diskStorage({
    destination: path,
    filename(_, file, callback) {
      callback(null, `${crypto.randomUUID()}.${file.originalname.split('.').slice(-1)}`)
    },
  })

  return multer({ storage })
}

export default upload