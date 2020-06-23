# Backend Assignment by FiBi


## Steps to run the project with NodeJS

> Prerequisites: NodeJS, NPM, cURL


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

  Which is great, but, it's not the expected output. Use the following sample command to generate an Image Object:

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


