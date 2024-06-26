const fs = require('fs');
const userFileManager = require('../FileManger/filemanger');
/* 
    BUG
        ->  Deletes the whole json file data when request sent for a file which
            is already deleted or even Wrong Cred - FIXED

*/



const DeleteFileAPI = (req , res) => {
    const UID = req.body.uid;
    const FileUID = req.body.fuid;
    const FileName = req.body.fname;
    userFileManager.initializeFile('./Json/userFile.json')
    userFileManager.deleteUserFile('./Json/userFile.json' , UID, FileUID)
    userFileManager.initializeFile('./Json/SearchIndex.json')
    userFileManager.addUserSearchIndexDelete('./Json/SearchIndex.json', UID, FileName)

    fs.unlink(`./bucket/${FileUID}_${FileName}`, function (err) {
            if (err) throw err;
            console.log('File deleted!');
    });
    res.status(200).send("Deleted");
    

  }

module.exports = DeleteFileAPI;
