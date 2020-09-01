# BoomTownROI 

<!-- TABLE OF CONTENTS -->
## Table of Contents


* [Getting Started](#getting-started)
* [Built With](#built-with)
* [Ways to Improve](#ways-to-improve)


<!-- GETTING STARTED -->
## Getting Started

1. Clone the repo
```sh
git clone https://github.com/austingwalker/Volunteer-Manager-MERN
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


## Ways to Improve

### Async/Await
  * Ran out of time troubleshooting the following issues:
    1. Had trouble running all the await calls in parallel using Promis.all:
    ```javascript
    const repos = checkUrls(data.repos_url)
    const events = checkUrls(data.events_url)
    const hooks = checkUrls(data.hooks_url)
    const issues = checkUrls(data.issues_url)
    const members = checkUrls(data.members_url)
    const public_members = checkUrls(data.public_members_url)
    const urls = await Promise.all([repos, events, hooks, issues, members, public_members])
    ```
    2. Also had issues adding error catching properly.

### checkIds Function
  * I believe Function is currently O(N²) so could possibly be made more efficient. Stringify’ing the object and using Regex to capture all "id's" may also be a solution but I’m not familiar enough with Regex to do that in the allotted timeframe.

### Non-200 Status Code Pages
  * I successfully provided indication of the failed request but wasn’t sure what the following hint was asking for, “Devise a way for the end user to make sense of the id values, related to the original resource route used to retrieve the data.”
    * With more clarity the output structure could be altered to meet this requirement.

