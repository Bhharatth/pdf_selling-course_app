import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { url } from "inspector";


const s3Client = new S3Client({
    region: "",
    credentials: {
        accessKeyId: '',
        secretAccessKey: ''
    },

});


export async function putObject(filename: string, pdfData: any, thumbNailData: any) {

    const timestamp = Date.now();
    const folderName = `uploads/${timestamp}`;

    const pdfKey = `${folderName}/pdfFile_${filename}.pdf`;
    const thumbnailKey = `${folderName}/thumbnails_${filename}.jpeg`;

    const pdfCommand = new PutObjectCommand({
        Bucket: '',
        Key: pdfKey,
        Body: pdfData,
        ContentType: 'application/pdf'
    });

    const thumbNailCommand = new PutObjectCommand({
        Bucket: '',
        Key: thumbnailKey,
        Body: thumbNailData,
        ContentType: 'image/jpeg'
    });
    const uploadPdfPromise = s3Client.send(pdfCommand);
    const uploadThumbnailPromise = s3Client.send(thumbNailCommand);

    await Promise.all([uploadPdfPromise, uploadThumbnailPromise]);

    const pdfUrl = await getSignedUrl(s3Client, pdfCommand, {expiresIn: 60});
    return {
        pdfUrl,
        folderName
    }
};



export async function getObjectURL(key: string) {
    const command = new GetObjectCommand({
        Bucket: '',
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 200 });
    return url;
};
