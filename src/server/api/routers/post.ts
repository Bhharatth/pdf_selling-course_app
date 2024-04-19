import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import {  getUrlSchema, uploadSchema } from "@/common/apiSchema";
import { fetchImgAndPdfPairs, putObject,downloadFileViaUrl } from "@/utils/aws/aws";


export const postRouter = createTRPCRouter({

  upload: protectedProcedure
    .input(uploadSchema)
    .mutation(async ({ ctx, input }) => {

      try {
        if (ctx.session.user.email = "bharathprasannan96@gmail.com") {
          const result = await putObject(input.filename as string);

          const pdfFolder = await ctx.db.pdfFolder.create({
            data: {
              title: input.title,
              description: input.description,
              folderPath: result.folderName,
              fileKey: result.pdfKey,
            },
          });
          console.log('new pdf folder created:', pdfFolder)
          console.log(result);

          return {
            pdfUrl: result.uploadPdfUrl,
          }
            

        } else {
          throw new Error("only teachers can uoload pdfs");
        }

      } catch (error) {
        console.error('File upload url error:', error);

        return {
          error: {
            message: 'File upload url creation failed',
            statusCode: 500,
          },
        };

      }

    }),

  getAllUploadedFiles: protectedProcedure.query(async({ ctx }) => {
    const uploadedFiles = await ctx.db.pdfFolder.findMany();
   
    const formattedFiles = uploadedFiles.map((file) => ({
      id: file.id,
      title: file.title,
      description: file.description,
      folderPath: file.folderPath,
      fileKey: file.fileKey,
      folderName: file.folderName,
    }));
    return formattedFiles;
  }),

  getPdfDownloadUrl: protectedProcedure.input(getUrlSchema).mutation(async ({ctx, input})=> {
    try {
      const res = await downloadFileViaUrl(input.pdfKey as string);
      console.log('pdf download url from server', res)
      console.log(res)
      return {
        res
      }
    } catch (error) {
      console.error('Error fetching PDF download URL:', error);
        throw new Error('Failed to fetch PDF download URL');
    }
  })
});
