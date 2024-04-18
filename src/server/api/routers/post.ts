import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "@/server/api/trpc";
import { uploadSchema } from "@/common/apiSchema";
import { putObject } from "@/utils/aws/aws";


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
            },
          });
          console.log('new pdf folder created:', pdfFolder)
          console.log(result);

          return {
            pdfUrl: result.uploadPdfUrl,
            thumbNailUrl: result.uploadThumbnailUrl
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

  // getLatest: protectedProcedure.query(({ ctx }) => {
  //   return ctx.db.post.findFirst({
  //     orderBy: { createdAt: "desc" },
  //     where: { createdBy: { id: ctx.session.user.id } },
  //   });
  // }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
