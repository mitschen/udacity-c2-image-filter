import express from 'express';
import { Request, Response } from 'express';
import bodyParser from 'body-parser';
import {filterImageFromURL, deleteLocalFiles, applyFilter} from './util/util';
import { isString } from 'util';

(async () => {

  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;
  
  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  //CORS Should be restricted
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:8100");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
  });

  // @TODO1 IMPLEMENT A RESTFUL ENDPOINT
  // GET /filteredimage?image_url={{URL}}
  // endpoint to filter an image from a public url.
  // IT SHOULD
  //    1
  //    1. validate the image_url query
  //    2. call filterImageFromURL(image_url) to filter the image
  //    3. send the resulting file in the response
  //    4. deletes any files on the server on finish of the response
  // QUERY PARAMATERS
  //    image_url: URL of a publicly accessible image
  // RETURNS
  //   the filtered image file [!!TIP res.sendFile(filteredpath); might be useful]

  /**************************************************************************** */

  //! END @TODO1
  app.get('/filteredimage', async (req: Request, res: Response) => {
    let url =  req.query.image_url;
    console.log("\n\n/filteredimage");
    console.log("passed URL: %o", req.query.image_url);
    if(!url || !isString(url)){
      return res.status(422).send({message: 'invalid request - try /filteredimage?image_url={{}}'});
    }

    console.log("Url passed " + url);

   
    
    const https = require('https');
    //verfiy the url
    await https.get(url, (resp: any) => {
      let data = '';
      resp.on('data', (chunk: any) => { data += chunk; });
    }).on('error', (err: any) => { return res.status(422).send({message: err.message}) });

        
    //read the image
    let imagePath = await filterImageFromURL(url);
    
    //invalid image file
    if(imagePath == ""){
      return res.status(422).send({message: "Unaccessible ressource"});
    }

    //apply filtering
    let filteredImagePath = await applyFilter(imagePath);

    let resultingPath = imagePath;
    if(filteredImagePath !== ""){
      resultingPath = filteredImagePath;
    }
        
    return res.status(200).sendFile(resultingPath, function(err) {
      if(err){
        console.log("Failed to send file at " + resultingPath);
      } else {
        console.log("Sucessfully send file at " + resultingPath);
      }
      if(filteredImagePath !== ""){
        deleteLocalFiles([imagePath, filteredImagePath]);
      } else {
        deleteLocalFiles([imagePath]);
      }
      
    });
   });

  
  // Root Endpoint
  // Displays a simple message to the user
  app.get( "/", async ( req, res ) => {
    res.send("try GET /filteredimage?image_url={{}}")
  } );
  

  // Start the Server
  app.listen( port, () => {
      console.log( `server running http://localhost:${ port }` );
      console.log( `press CTRL+C to stop server` );
  } );
})();