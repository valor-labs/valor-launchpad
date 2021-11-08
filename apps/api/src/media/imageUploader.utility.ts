import { extname, join } from 'path';
import { diskStorage } from 'multer';
import sharp from 'sharp';

const ASSET_PATH = join(__dirname, '/assets');

export class ImageUploaderUtility {
  private static editFileName: (req, file, callback) => void = (
    req,
    file,
    callback
  ) => {
    const name = file.originalname.split('.')[0];
    const fileExtName = extname(file.originalname);
    callback(
      null,
      `${name}-${ImageUploaderUtility._genRandomName()}${fileExtName}`
    );
  };

  static getStorageOptions() {
    return diskStorage({
      destination: function (req, file, cb) {
        cb(null, ASSET_PATH);
      },
      filename: this.editFileName,
    });
  }

  static imageToWebp(file): Promise<string> {
    return new Promise((resolve) => {
      const name = file.originalname.split('.')[0];
      const originImagePath = file.path;
      const webpPath = `${ASSET_PATH}/${name}-${ImageUploaderUtility._genRandomName()}.webp`;
      sharp(originImagePath).toFile(webpPath, function (err) {
        if (err !== null) {
          resolve('');
        } else {
          resolve(webpPath);
        }
      });
    });
  }

  private static _genRandomName(): string {
    return Array(4)
      .fill(null)
      .map(() => Math.round(Math.random() * 16).toString(16))
      .join('');
  }

  static genImageEntityArg() {
    return {
      user: {
        select: {
          firstName: true,
          lastName: true,
          profile: {
            select: {
              avatar: {
                select: {
                  src: true,
                  src_webp: true,
                  alt: true,
                },
              },
            },
          },
        },
      },
    };
  }
}
