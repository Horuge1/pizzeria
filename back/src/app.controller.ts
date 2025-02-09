import { Express } from 'express';
import {
  Body,
  Controller,
  Post,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';

@Controller('')
export class AppController {
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: join(__dirname, '..', 'public/images'),
        filename: function (req, file, cb) {
          cb(null, req.body['name'] + '.' + file.originalname.split('.')[1]);
        },
      }),
    }),
  )
  uploadFile(
    @Req() req,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return {imageName:file.filename}
  }
}
