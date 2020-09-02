const router = require('express').Router();
const fs = require('fs');
const rimraf = require('rimraf');
const processPath = require('../lib/path');

router.get('/:path', (req, res, next) => {
  try {
    const file = processPath(req.params.path).absolutePath;
    if(fs.lstatSync(file).isFile()){
      fs.unlinkSync(file);
    } else if(fs.lstatSync(file).isDirectory()){
      rimraf.sync(file)
    }
    
    res.json({ success: true, message: 'File Deleted' });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
