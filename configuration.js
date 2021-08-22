const path = require("path");
module.exports={
    paths:{
        output:  path.resolve(__dirname, 'dist'),
    },
    server: {
        https: false,
        host: 'localhost',
        port: 5000,
        open: true,
        overlay: {
            warnings: true,
            errors: true
        }
    },
    limits: {
        /* Image files size in bytes. Below this value the image file will be served as DataURL (inline base64). */
        images: 8192,

        /* Font files size in bytes. Below this value the font file will be served as DataURL (inline base64). */
        fonts: 8192,
    },
}