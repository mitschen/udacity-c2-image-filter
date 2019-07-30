
# Udagram Image Filtering Microservice

  

## Tasks

  

### Setup Node Enviornment

  

You'll need to create a new node server. Open a new terminal within the project directory and run:

  

1. Initialize a new project: `npm i`

2. run the development server with `npm run dev`

  

### Create a new endpoint in the server.ts file

  

The starter code has a task for you to complete an endpoint in `./src/server.ts` which uses query paramater to download an image from a public URL, filter the image, and return the result.

  

We've included a few helper functions to handle some of these concepts and we're importing it for you at the top of the `./src/server.ts` file.

  

```typescript

import {filterImageFromURL, deleteLocalFiles} from  './util/util';

```

  

### Deploying your system

  

Follow the process described in the course to `eb init` a new application and `eb create` a new enviornment to deploy your image-filter service! Don't forget you can use `eb deploy` to push changes.

  

## Stand Out (Optional)

  

### Refactor the course RESTapi

  

If you're feeling up to it, refactor the course RESTapi to make a request to your newly provisioned image server.

  

### Authentication

  

Prevent requests without valid authentication headers.

> !!NOTE if you choose to submit this, make sure to add the token to the postman collection and export the postman collection file to your submission so we can review!

  

### Custom Domain Name

  

Add your own domain name and have it point to the running services (try adding a subdomain name to point to the processing server)

> !NOTE: Domain names are not included in AWS’ free tier and will incur a cost.

  

## Private notes

  

### References

Unfortunately the starter code reference isn't clear in the Udacity description. I've found more or less two ressources where to find different source bases.

  

The one that is linked [inside the project description](https://github.com/udacity/cloud-developer/tree/master/course-02/project/image-filter-starter-code) and the other one that can be directly found at the [instructors git repository](https://github.com/grutt/udacity-c2-image-filter). The one from the project didn't contain the necessary python source code (I've copied them to `/src/python`) and doesn't really give a hint of what is the expectation.

### Remarks
The project description is really weird. On the one hand, we get videos and tutorials on how to use python without any reference to it in the projects rubric. Furthermore the videos expects a two layered service while the whole project setting is designed to do a simple read and push image service?

### AWS deployment
Neither with the udacity-c2-restapi nor with this project it is possible for me to deploy the stuff via the **eb cli**. It always fails to start the base application. I always need to upload the zip-file manually to make things happen.

### Bugs
* (fixed) package.json: the start command is missing
* (fixed) the main entry is incorrect
