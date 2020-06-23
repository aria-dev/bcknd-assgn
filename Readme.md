# Backend Assignment by FiBi


## Steps to run the project with NodeJS

> Prerequisites: NodeJS, NPM, cURL, MongoDB


### Clone the project via git clone: 


  Use with SSH:

    $ git clone git@github.com:aria-dev/bcknd-assgn.git

  Use with HTTP(S):

    $ git clone https://github.com/aria-dev/bcknd-assgn.git


### Install Dependencies

  In the directory `bcknd-assgn/` open up a terminal and enter the following command:

    $ npm i

  This will install the prerequisites/dependencies of the project

### Start a mongo server

  If mongo is installed on your machine, open up a new terminal use `mongod` to start the mongoDB server. Unless changed, the mongoDB server is usually exposed on the PORT 27017. If you don't have mongodb installed, and prefer to use Mongo Atlas, you can use the atlas url and replace the `dbURI` in the `config/dbconfig.js` file with your atlas url.

### Start the node server

  Inside the `bcknd-assgn/` directory, open a terminal and start the node server:

    $ node index.js

  When you see the following message, the server is ready to accept requests

    $ ...Server listening at 3000
  
### Task 1: #1 Sending a POST request

  To send a POST request open a new terminal while the server is running, as described in the above step. Then copy paste the following into the new terminal 

    $ curl -X POST http://localhost:3000/api/image/add

  When you press enter, you'll see the a message similar to this:

    $ {"_id":"5ef1fc3027a7f2204007d5b7","__v":0}

  Use the following sample command to generate an Image Object:

    $ curl -d "url=https://hostedimage.com/beach.png&name=beach.png&type=image/png" -X POST http://localhost:3000/api/image
    /add | json_pp

  I'm using `| json_pp` here to make the output look pretty. 
  
    {
      "__v"  : 0,
      "name" : "beach.png",
      "url"  : "https://hostedimage.com/beach.png",
      "type" : "image/png",
      "_id"  : "5ef1fc3027a7f220f00d7dc2"
    }

  The result you are seeing is the data object saved in MongoDB and then presented to you via an API request.

### Task 1: #2 Send a GET request

  Available params for GET request: `offset`, `limit`, `nameString`

  URL to use: `http://localhost:3000/api/image/search`

  Example url : `http://localhost:3000/api/image/search?nameString=beach&limit=2&offset=10`

  Open up a new terminal while the `mongod` and `node server` are running as in the above steps

  Use the following url structure to send a GET request to the server:

    $ curl -X GET "http://localhost:3000/api/image/search?nameString=beach&offset=2&limit=2"

  `nameString`, `offset` and `limit` are optional parameters. To get all results stored in the db:
  
    $ curl -X GET "http://localhost:3000/api/image/search"
   
   This will return upto 50 results, from the DB.

## Task 2: Extracting metadata from image url

  To facilitate meta data options, there is one optional param when passing in a `POST` request, 
    - `size`

  Taking an example URL: 
    
    $ curl -d "url=https://hosted.com/image.tiff&name=farmhouse&type=image/png&size=32" -X POST http://localhost:3000/api/image/add

  The output will be similar to:

    {
      _id: 5ef1fc3027a7f220f00d7dc2,
      url: 'https://hosted.com/image.tiff',
      name: 'farmhouse',
      type: 'image/png',
      metadata: {
          size: 32,
          extType: 'tiff'
        }
    }

  The `size` is an optional parameter and needs to be specified, while `extType` is internally calculated, by comparison with popular known image file types. If none are found, the `extType` metadata is not created. Similary for `size`, unless provided, metadata is not generated on its own.

  The feature could be easily extended to house more metadata options, by scaling the `ImageModel`
