# Hotel Management API

A RESTful API built using **Node.js**, **Express.js**, and **TypeScript** for managing hotel data. This API allows users to insert, update, and retrieve hotel information, as well as upload images for hotels and rooms. The data is stored in JSON files, and image uploads are handled using the **Multer** package.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [API Endpoints](#api-endpoints)
- [File Storage](#file-storage)
- [Testing](#testing)
- [Tech Stack](#tech-stack)
- [License](#license)

---

## Requirements

To run this project, you will need the following:

- **Node.js** (v14 or higher)
- **npm** (Node Package Manager) or **yarn**
- **TypeScript**
- **Multer** (for image uploads)
- **UUID** (for generating unique hotel IDs)
  **Slugify** (in order to slugify hotel titles and room titles)
- **Jest** (for unit testing)
- **Postman** (for testing of http requests(get,put,post,images upload))

---

## Installation

Follow these steps to set up the project locally:

1. **Clone the repository**:

 
   git clone https://github.com/your-username/hotel-management-api.git


   cd hotel-management-api

    Install dependencies:
    npm init -y
    npm install express cors dotenv
    npm install -D typescript @types/express @types/node @types/cors ts-node nodemon
    npm install multer uuid && npm install -D @types/multer @types/uuid
    npm install --save-dev jest @types/jest ts-jest
    npm install slugify

   Port: 3001  

    Use npm or yarn to install the required dependencies:

npm install
# or
yarn install

Set up environment variables (optional):

If required, create a .env file in the root directory to configure environment-specific settings like file storage locations or server settings.

Run the server:

Start the server with:

    npm run start
    # or for development
    npm run dev

    The server will be available at http://localhost:3001.

# API Endpoints
/api - Base URL for all routes

All the following routes are prefixed with /api, so the full routes will be:
       
    /api/hotel
    /api/hotel/:hotelId
    /api/hotels/upload-images
    /api/hotels/upload-room-images
    /api/hotel/:hotelId

These routes handle the requests for hotel data and image uploads.
1. POST /api/hotel

    Description: Insert a new hotel record.

    Request Body: A JSON object with the hotel details. Example:
```
    {
      "title": "Test Hotel",
      "description": "A nice hotel",
      "guestCount": 2,
      "bedroomCount": 1,
      "bathroomCount": 1,
      "amenities": ["wifi"],
      "hostInfo": {"name": "John Doe"},
      "address": "123 Main St",
      "latitude": 40.7128,
      "longitude": -74.006,
      "slug": "test-hotel",
      "images": [],
      "rooms": [
        {
          "roomSlug": "room-1",
          "roomImage": [],
          "roomTitle": "Room 1",
          "roomBedroomCount": 1
        }
      ]
    }
    ```
    

    Response: The newly created hotel record with a unique hotelId in JSON format.

2. POST /api/hotels/upload-images

    Description: Upload multiple images for the hotel.
    Request Body: Form-data with the key images containing multiple image files.
    Response: An updated list of image URLs for the hotel.

3. POST /api/hotels/upload-room-images

    Description: Upload images for specific hotel rooms.
    Request Body: Form-data with the key roomImage containing multiple image files.
    Response: An updated list of image URLs for the room.

4. GET /api/hotel/:hotelId

    Description: Retrieve detailed information of a specific hotel.
    URL Parameters:
        hotelId (the unique identifier or slug of the hotel).
    Response: The hotel's details, including title, description, amenities, images, rooms, etc.

5. PUT /api/hotel/:hotelId

    Description: Update an existing hotel's data.

    Request Body: A JSON object with the updated hotel details. Example:

    ```
    {
      "title": "Updated Test Hotel",
      "description": "An updated description",
      "guestCount": 3,
      "bedroomCount": 2,
      "bathroomCount": 1,
      "amenities": ["wifi", "pool"],
      "hostInfo": {"name": "Jane Doe"},
      "address": "456 Main St",
      "latitude": 40.7128,
      "longitude": -74.006,
      "slug": "updated-test-hotel",
      "images": [],
      "rooms": [
        {
          "roomSlug": "room-2",
          "roomImage": [],
          "roomTitle": "Room 2",
          "roomBedroomCount": 2
        }
      ]
    }
    ```

    Response: The updated hotel record in JSON format.

```

# Special Intruction to upload images
   
API Endpoints
1. POST /api/hotels/upload-images

This endpoint allows you to upload images for the hotel.
Steps to Upload Hotel Images via Postman:

    Select POST method and enter the URL:

    http://localhost:3001/api/hotels/upload-images

    Go to the Body tab and select form-data.

    In the first row:
        Key: hotelId
        Value: Enter the hotelId of the hotel where you want to upload the images.

    In the second row:
        Key: images
        Value: Select the File type, and then upload the images you want to associate with the hotel.

    Send the request. The response will contain the updated list of image URLs for the hotel.

2. POST /api/hotels/upload-room-images

This endpoint allows you to upload images for specific hotel rooms.
Steps to Upload Room Images via Postman:

    Select POST method and enter the URL:

http://localhost:3001/api/hotels/upload-room-images

Go to the Body tab and select form-data.

In the first row:

    Key: hotelId
    Value: Enter the hotelId of the hotel where the room images are to be uploaded.

In the second row:

    Key: roomSlug
    Value: Enter the roomSlug for the room you are uploading images for.

In the third row:

    Key: roomImage
    Value: Select the File type, and then upload the images you want to associate with the room.

Send the request. The response will contain the updated list of image URLs for the room.












# File Storage

    Hotel Data: Each hotel is stored in its own JSON file, named hotelId.json where hotelId is the unique identifier for the hotel.
    Images: Uploaded images are saved in a designated directory on the server, and the URLs of the uploaded images are updated in the corresponding hotel record.

# Testing

Unit tests for this API are written using Jest. To run the tests, use the following command:

npm run test

This will run all the tests and output the results in your terminal.
Tech Stack

    Node.js – JavaScript runtime environment.
    Express.js – Web framework for building the API.
    TypeScript – A statically typed superset of JavaScript.
    Multer – Middleware for handling file uploads.
    UUID – For generating unique identifiers for hotels.
    Slugify – For generating slugs based on hotel titles.
    Jest – A testing framework for unit testing.




### Key Change:
- Added a **/api** section in the `API Endpoints` section to explain that all the routes are prefixed with `/api`, so that users can easily identify where the routes are being accessed from.
  
This structure makes it clear to users where the routes are located .
