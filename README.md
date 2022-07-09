# PixelShare

PixelShare is a creativity hub web application created for those with creative minds.

## Contents:

Each folder and file in this repository is properly documented. You may read the `README.md` file of each folder to understand its content. You may also read the inline comments of each file explaining the statements line-per-line.

- [controller](https://github.com/Frieya/pixelShareMP/tree/main/controller) - This folder contains files which defines callback functions for client requests.
- [model_db](https://github.com/Frieya/pixelShareMP/tree/main/model_db) - This folder contains files for database modeling and access.
- [public](https://github.com/Frieya/pixelShareMP/tree/main/public) - This folder contains static assets such as css, js, and image files.
- [routers](https://github.com/Frieya/pixelShareMP/tree/main/routers) - This folder contains files which describes the response of the server for each HTTP method request to a specific path in the server.
- [views](https://github.com/Frieya/pixelShareMP/tree/main/views) - This folder contains all hbs files to be rendered when requested from the server.
- [server.js](https://github.com/Frieya/pixelShareMP/blob/main/server.js) - The main entry point of the web application.

## Installation:
1. Clone the repository either by downloading the contents of the repository [here](https://github.com/Frieya/pixelShareMP/archive/refs/heads/main.zip), or using the command below (Note: git should be installed in your system for this to work).
```
git clone https://github.com/Frieya/pixelShareMP.git
```
2. Open Command Prompt
3. Navigate to the project folder - the folder containing the contents of the cloned or downloaded repository.
4. Run the command `npm install` to initialize and install all necessary modules used in the project.

5. We may now run our server. To do this, we run the command `node server.js`. Upon running the command, your Command Prompt should display the following statement:
```
App listens at port 1703
Connected to: mongodb://localhost:27017/pixel_share
```
