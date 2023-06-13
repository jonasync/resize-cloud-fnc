const express = require('express');
const Busboy = require('busboy');
const sharp = require('sharp');

const fs = require('fs');
const os = require('os');
const path = require('path');

const app = express();
app.use(express.json());

app.post('/', (req, res) => {
    const busboy = Busboy({headers: req.headers});
    const tmpdir = os.tmpdir();
    
    const uploads = {};
    const fields = {};
    const resizedImages = []
    
    busboy.on('field', (fieldname, val) => {
        // Recovery the body fields sended
        fields[fieldname] = Number(val) ? Number(val) : val
    });

    const fileWrites = [];

    busboy.on('file', (fieldname, file, {filename}) => {
        // Recovery the files added to the request and created it on a temporary folder
        const filepath = path.join(tmpdir, filename);
        uploads[fieldname] = filepath;

        const writeStream = fs.createWriteStream(filepath);
        file.pipe(writeStream);

        const promise = new Promise((resolve, reject) => {
            file.on('end', () => {
              writeStream.end();
            });
            writeStream.on('close', resolve);
            writeStream.on('error', reject);
          });
          fileWrites.push(promise);
    });

    busboy.on('finish', async () => {
        await Promise.all(fileWrites);

        for (const file in uploads) {
            // When we have all ready resize the image and remove the temporal one.
            const resized = await sharp(uploads[file])
                    .resize(fields.width || 800 ).toBuffer();
            resizedImages.push({image: resized, width: fields.width})
            fs.unlinkSync(uploads[file]);
        }
        // Respond with the buffer image resized
        res.status(200).send(resizedImages);
    });
    busboy.end(req.rawBody);
});

exports.resizeImage = app;
