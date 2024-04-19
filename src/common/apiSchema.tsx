import { z } from "zod";

export const uploadSchema = z.object({
    filePath: z.string().optional(),
    filename: z.string().optional(),
    title: z.string(),
    description: z.string()
});

export const getUrlSchema = z.object({
    pdfKey: z.string().optional()
});

export type IgetPdfUrl = z.infer<typeof getUrlSchema>
export type Iupload = z.infer<typeof uploadSchema>;
