import { z } from "zod";

export const uploadSchema = z.object({
    filePath: z.string().optional(),
    filename: z.string().optional(),
    thumbnail: z.unknown(),
    pdfFile: z.unknown(),
});

export type Iupload = z.infer<typeof uploadSchema>;
