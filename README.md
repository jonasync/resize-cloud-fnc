
[![LinkedIn](https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555)](https://linkedin.com/in/jonasync/)



<!-- PROJECT LOGO -->
<br />
<div align="center">
  
  <h3 align="center">Resizing with Cloud Function</h3>
</div>

### Built With

A cloud function has been created that asynchronously creates different images or thumbnails optimized for use on different devices. 

Main technology used:

[![NodeJS](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/en)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
[![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)](https://console.firebase.google.com/?hl=es)
[![Google Cloud](https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white)](https://cloud.google.com/functions)


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites

How to install them.
* npm
  ```sh
  npm install npm@latest -g
  ```
* Postman
* Access to the firebase database or create a credential.json file on `/resize-cloud-fnc/src/database`


### Installation

⚠️⚠️ ___Ask for credentials___ ⚠️⚠️

You will need to create a credentials.json file to be able to use the firebase database

   ```json
   {
        "type": "...",
        "project_id": "...",
        "private_key_id": "...",
        "private_key": "...",
        "client_email": "...",
        "client_id": "...",
        "auth_uri": "...",
        "token_uri": "...",
        "auth_provider_x509_cert_url": "...",
        "client_x509_cert_url": "...",
        "universe_domain": "..."
    }
   ```

1. Clone the repo
   ```sh
   git clone https://github.com/jonasync/resize-cloud-fnc
   ```
2. Install NPM packages
   ```sh
   npm install
   ```
3. To build and start the server type:
   ```sh
   npm start
   ```
4. You have a Postman collection with the request for testing 
   `/resize-cloud-fnc/extra/Inditex.postman_collection.json`


## Local Work

For local work, you will need to install [gCloud CLI](https://cloud.google.com/sdk/docs/install) Client and [google-cloud/functions-framework](https://www.npmjs.com/package/@google-cloud/functions-framework). 

- The cloud function is located on `/resize-cloud-fnc/extra/cloud-function-inditex`, 

- You must modify the url on `resize-cloud-fnc/src/utils/CONSTANTS.js` the `cloud_resize_fnc` property value, to work locally.

- When ready, type:
   ```sh
   npm start
   ```


<!-- USAGE EXAMPLES -->
## Usage

In order to serve images to different clients (web, mobile apps), it is necessary to generate variants of the images in different resolutions. The objective of this test is the creation of a system capable of resizing the images from the original images, fulfilling:

- REST API in Nodejs to which you can request processing tasks. 

    - __POST__ `/task` will create an image processing request.
    - __GET__ `/task/:taskId` will return the processing status.



<!-- CONTACT -->
## Contact

Jonathan Martín Pinero - jonathan.martin@kairosds.com

Project Link: [https://github.com/jonasync/resize-cloud-fnc](https://github.com/jonasync/resize-cloud-fnc)


