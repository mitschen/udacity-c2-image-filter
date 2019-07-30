import fs from 'fs';
import Jimp = require('jimp');
import { spawnSync } from 'child_process' ;
import { reject } from 'bluebird';

// filterImageFromURL
// helper function to download, filter, and save the filtered image locally
// returns the absolute path to the local image
// INPUTS
//    inputURL: string - a publicly accessible url to an image file
// RETURNS
//    an absolute path to a filtered image locally saved file
export async function filterImageFromURL(inputURL: string): Promise<string>{
    return new Promise( async resolve => {
        try {
          const photo = await Jimp.read(inputURL);
          const outpath = '/tmp/filtered.'+Math.floor(Math.random() * 2000)+'.jpg';
          await photo
          .resize(256, 256) // resize
          .quality(60) // set JPEG quality
          .greyscale() // set greyscale
          .write(__dirname+outpath, (img)=>{
              resolve(__dirname+outpath);
          });
        } catch (err)
        {
          console.log("Error reading file"); 
          resolve("");
        };
    });
}

// deleteLocalFiles
// helper function to delete files on the local disk
// useful to cleanup after tasks
// INPUTS
//    files: Array<string> an array of absolute paths to files
export async function deleteLocalFiles(files:Array<string>){
    for( let file of files) {
        fs.unlinkSync(file);
    }
}

export async function applyFilter(inPath: string) : Promise<string>{
    var path = require("path");
    let ext: string = path.extname(inPath);
    let outPath: string = path.basename(path.basename(inPath), ext);
    outPath = path.join(path.dirname(inPath), outPath + 'f' + ext);
    const pythonProcess = await spawnSync('python3', ["src/python/image_filter.py", inPath, outPath]);
    if(pythonProcess.status == 0){
        console.log(pythonProcess.output.toString());
    } else {
        console.log("Failed to start python instance");
    }
    return outPath;
}