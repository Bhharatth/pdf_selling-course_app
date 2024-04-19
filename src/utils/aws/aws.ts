import { S3Client, GetObjectCommand, PutObjectCommand, ListObjectsV2Command } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { env } from "../../env.js";



const s3Client = new S3Client({
    region: "ap-south-1",
    credentials: {
        accessKeyId: env.AWS_S3_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_S3_SECRET_ACCESS_KEY
    },

});


export async function putObject(filename: string) {

    const timestamp = Date.now();
    const folderName = `uploads/${timestamp}`;

    const pdfKey = `${folderName}/pdfFile_${filename}.pdf`;

    const pdfCommand = new PutObjectCommand({
        Bucket: 'pdf-app.bharath100xdeveloper.xyz',
        Key: pdfKey,
        ContentType: 'application/pdf'
    });



    const uploadPdfUrl = await getSignedUrl(s3Client, pdfCommand, { expiresIn: 3600 });


    return {
        uploadPdfUrl,
        folderName,
        pdfKey
    }
};

export async function uploadFilesToS3(preSingedUrl: string, file: any, contentType: string) {

    try {
        const res = await fetch(preSingedUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': contentType
            }
        });
        console.log('File uploaded successfully!', res.status);
        return res
    } catch (error) {
        console.error('File upload failed:');
    }
}


export async function fetchImgAndPdfPairs() {
    const bucketName = 'pdf-app.bharath100xdeveloper.xyz';
    const prefix = 'uploads/';

    try {
        const command = new ListObjectsV2Command({
            Bucket: bucketName,
            Prefix: prefix,
        });
        const response = await s3Client.send(command);

        return response;

    } catch (error) {
        return error

    }

}

export async function getObjectURL(key: string) {
    const command = new GetObjectCommand({
        Bucket: 'pdf-app.bharath100xdeveloper.xyz',
        Key: key,
    });
    const url = await getSignedUrl(s3Client, command, { expiresIn: 200 });
    return url;
};

// export async function downloadFileViaUrl (pdfKey: string) {
//     const bucketName = 'pdf-app.bharath100xdeveloper.xyz';
//     const prefix = 'uploads/';
//     try {
//         const getObjectCommand = new GetObjectCommand({Bucket:bucketName,Key: pdfKey,});
//                   const downloadUrl = await getSignedUrl(s3Client,getObjectCommand,{ expiresIn: 3600 } );
//                   return downloadUrl

//     } catch (error) {
//         console.error('Error generating signed URL:', error);
//         return undefined; 
//     }

// }

export async function downloadFileViaUrl(pdfKey: string) {
    const bucketName = 'pdf-app.bharath100xdeveloper.xyz';
    const prefix = 'uploads/';

    return new Promise(async (resolve, reject) => {

        try {
            const getObjectCommand = new GetObjectCommand({ Bucket: bucketName, Key: pdfKey, });
            const downloadUrl = await getSignedUrl(s3Client, getObjectCommand, { expiresIn: 3600 });
          const url =  resolve(downloadUrl);
          return url

        } catch (error) {
            console.error('Error generating signed URL:', error);
            return undefined;
        }


    })

}

