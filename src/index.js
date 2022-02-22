const fs = require('fs');
const html = fs.readFileSync('src/template-1.html', 'utf8');
const express = require('express');
const pdf = require('html-pdf');
const templatehtml_to_pdf = require('html-pdf-node');

const app = express();

app.use('/pdf-generate', async (req, res) => {
    res.attachment('template.pdf');
    pdf.create(html, { format: 'Letter', paginationOffset: 1 }).toStream(function(err, stream){
        stream.pipe(res);
    });
});

app.use('/pdf-generate-3', async (req, res) => {
    res.attachment('template.pdf');
    templatehtml_to_pdf.generatePdf({ content: html }, { format: 'A4' }).then(pdfBuffer => {
        res.send(pdfBuffer);
    });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
    console.log('http://localhost:3000');
})