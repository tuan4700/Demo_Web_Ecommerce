const fs = require('fs');
const cloudinary = require('cloudinary');

const uploadController = {
    // [POST] /api/upload
    uploadImage(req, res) {
        try {
            console.log(req.files);
            if(!req.files || Object.keys(req.files).length === 0)
                return res.status(400).json({message: "No file was uploaded."});
            
            const file = req.files.file;
            // checked file
            // More than 1mb
            if(file.size > 1024*1024) {
                removeTmp(file.tempFilePath);
                return res.status(400).json({message: "Files larger than 1mb"});
            }
            // Format
            if(file.mimetype !== 'image/jpeg' && file.mimetype !== 'image/png') {
                removeTmp(file.tempFilePath);
                return res.status(500).json({message: "Invalid file format"});
            }
    
            cloudinary.v2.uploader.upload(file.tempFilePath, {folder: "ecommerce"}, async (err, result) => {
                if(err) throw err;
                removeTmp(file.tempFilePath);
                res.json({public_id: result.public_id, url: result.secure_url});
            });
                
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    },

    // [POST] /api/destroy
    destroyImage(req, res) {
        try {
            const {public_id} = req.body;
            if(!public_id) return res.status(400).json({ message: "No image selected." });
            cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
                if(err) throw err;
                res.json({ message: "Deleted Image"});
            })
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
};

function removeTmp(path) {
    fs.unlink(path, err => {
        if(err) throw err;
    })
}

module.exports = uploadController;