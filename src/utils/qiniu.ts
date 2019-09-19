// import * as qiniu from 'qiniu'
// import * as CONFIG from '../app.config'
// const bucket = CONFIG.QINIU.BUCKET as string

// const mac = new qiniu.auth.digest.Mac(CONFIG.QINIU.AK as string, CONFIG.QINIU.SK as string)
// const cfg = new qiniu.conf.Config()
// const client = new qiniu.rs.BucketManager(mac, cfg)

// export const uploadToQiniu = async (url: string, key: string) => {
//   return new Promise((resolve, reject) => {
//     client.fetch(url, bucket, key, (err: any, res: any, info: any) => {
//       if (err) {
//         reject(err)
//       } else {
//         if (info.statusCode === 200) {
//           resolve({ key })
//         } else {
//           reject(info)
//         }
//       }
//     })
//   })
// }

import * as qiniu from 'qiniu'

const MAX_UPLOAD_COUNT = 5
const TOKEN_EXPIRES = 3600

export interface UploadFile {
  localPath: string
  fileName: string
  progressCb: (id: any, progress: any) => void
  resCb: (id: any, err: any, body?: any, code?: number) => void
  id?: number | string
  size?: number
}

export class Upload {
  private putPolicy: any
  private mac: any
  private config: any
  private token: string = ''
  private tokenValidPeriod: any
  private expires: number = TOKEN_EXPIRES

  private MAX_UPLOAD_COUNT = MAX_UPLOAD_COUNT
  private uploadQueue: UploadFile[] = []
  private inUpload = 0

  constructor({ ak = '', sk = '', scope = '' }) {
    this.mac = new qiniu.auth.digest.Mac(ak, sk)

    this.putPolicy = new qiniu.rs.PutPolicy({
      scope: scope,
      expires: this.expires,
    })

    this.config = new qiniu.conf.Config()
    this.config.zone = qiniu.zone.Zone_z2
  }

  private getUploadToken() {
    const now = Date.now()

    if (
      !this.tokenValidPeriod ||
      now + this.expires * 1000 < this.tokenValidPeriod
    ) {
      this.token = this.putPolicy.uploadToken(this.mac)
    }

    return this.token
  }

  public uploadFile({
    localPath,
    fileName,
    progressCb,
    resCb,
    id,
    size,
  }: UploadFile) {
    const uploadToken = this.getUploadToken()
    id = id || localPath

    const resumeUploader = new qiniu.resume_up.ResumeUploader(this.config)
    const putExtra = new qiniu.resume_up.PutExtra(
      null!,
      {},
      null!,
      null!,
      (uploadSize: any) => {
        progressCb(id, Math.floor((uploadSize / size!) * 100))
      },
    )

    if (this.inUpload <= this.MAX_UPLOAD_COUNT) {
      this.inUpload++

      resumeUploader.putFile(
        uploadToken,
        fileName,
        localPath,
        putExtra,
        (err, body, respInfo) => {
          this.inUpload--
          if (this.uploadQueue.length !== 0) {
            this.uploadFile(this.uploadQueue.pop()!)
          }

          if (err) {
            resCb(id, err)
          }
          if (respInfo.statusCode === 200) {
            resCb(id, null, body)
          } else {
            resCb(id, null, body, respInfo.code)
          }
        },
      )
    } else {
      this.uploadQueue.push({
        localPath,
        fileName,
        progressCb,
        resCb,
      })
    }
  }
}
