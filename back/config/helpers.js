function checkMultipart(req, res, next) {
    const contentType = req.headers["content-type"];
    // Make sure it's multipart/form
    if (!contentType || !contentType.includes("multipart/form-data")) {
        // Stop middleware chain and send a status
        return res.sendStatus(500);
    }
    next();
}

function rewriter(req, res, next) {
    // Set the request fields that you want
    req.body.avatarUri = req.files.destination + req.file.filename;
    next();
}
router.post("/", checkMultipart, upload.array["files", 5], rewriter, (req, res, next) => {});


var fieldUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post('/cool-profile', cpUpload, function (req, res, next) {
  // req.files is an object (String -> Array) where fieldname is the key, and the value is array of files
  //
  // e.g.
  //  req.files['avatar'][0] -> File
  //  req.files['gallery'] -> Array
  //
  // req.body will contain the text fields, if there were any
})

























//Upload File
albumRoutes.post('/fileUpload', upload.single('cover'), async (req, res, next) => {
    const file = req.file
    //test if file exist
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        error.message = 'file not Found'
        return res.boom.notFound("Error while getting image", {

        });
    }
    //resize the image to 100 *100 using sharp and add it to uploads folder
    await sharp(req.file.path)
        .resize(100, 100)
        .toFile(config.uploadDirectory+'/sm-' + req.file.filename)
        .then(function (newFileInfo) {
            // newFileInfo holds the output file properties
            console.log("Success", newFileInfo)
        })
        .catch(function (err) {
            console.log("Error occured", err);
            return res.boom.notFound("Error while getting file", {
                err: err
            })
        });


    res.json({
        'message': 'File uploaded successfully',
        'path': '/uploads/' + req.file.filename,
        'thumbnail': '/uploads/sm-' + req.file.filename
    });
});

//_______________________________________________________________________________

// Create Album 
albumRoutes.post('/album', validator.albumValidator.validatePostData, async (req, res) => {
    try {
        await controller.createAlbum(req.body, req.file);
        res.json({
            success: true,
            message: "Album created successfully"
        })
    } catch (err) {
        console.error(err);
        res.boom.badImplementation("Error while saving album to database", {
            err: err.message
        });
    }

})
