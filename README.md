# BoomTownROI 

<!-- TABLE OF CONTENTS -->
## Table of Contents


* [Getting Started](#getting-started)
* [Built With](#built-with)
* [Assesment Instructions](#assesment-instructions)


<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo
```sh
git clone https://github.com/austingwalker/BoomTownROI.git
```
2. Install NPM packages
```sh
npm install OR yarn install
```
3. Start the application on your local machine
```sh
npm start OR yarn start
```
4. Navigate to http://localhost:3000/


## Built With

* [Node.js](https://nodejs.org/en/)
* [express](https://www.npmjs.com/package/express)
* [node-fetch](https://www.npmjs.com/package/node-fetch)


## Assessment Instructions

Technical Assessment
Using the GitHub API and your language of choice, pull top-level details for the BoomTownROI organization at:
https://api.github.com/orgs/boomtownroi
From the top-level organization details result object, complete the following:

1. Output Data:

- Follow all urls containing "api.github.com/orgs/BoomTownROI" in the path, and for responses with a 200 status code, retrieve and display all 'id' keys/values in the response objects. For all non-200 status codes, give some indication of the failed request. HINT: Devise a way for the end user to make sense of the id values, related to the original resource route used to retrieve the data.

2. Perform Verifications:

- On the top-level BoomTownROI organization details object, verify that the 'updated_at' value is later than the 'created_at' date.

- On the top-level details object, compare the 'public_repos' count against the repositories array returned from following the 'repos_url', verifying that the counts match. HINT: The public repositories resource only returns a default limit of 30 repo objects per request.

Using libraries to complete the assignment is allowed (and for some parts of the assignment encouraged), but please refrain from using fully-featured frameworks such as create-react-app, Java Spring, or Laravel to complete this assignment