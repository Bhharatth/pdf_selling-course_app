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
        if (ctx.session.user.email = "") {
          const result = await putObject(input.filename as string, input.pdfFile, input.thumbnail);
          console.log(result);
          return result;
        } else {
          throw new Error("only teachers can uoload pdfs");
        }

      } catch (error) {
        console.error('File upload error:', error);

        return {
          error: {
            message: 'File upload failed',
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
