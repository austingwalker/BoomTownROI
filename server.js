const express = require("express");

const app = express();
const PORT = 3000;

const fetch = require('node-fetch');

app.get("/", async (req, res) => {
    const queryURL = "https://api.github.com/orgs/boomtownroi";

    const data = await fetch(queryURL).then(res => res.json());

    const repos = await checkUrls(data.repos_url)
    const events = await checkUrls(data.events_url)
    const hooks = await checkUrls(data.hooks_url)
    const issues = await checkUrls(data.issues_url)
    const members = await checkUrls(data.members_url)
    const public_members = await checkUrls(data.public_members_url)

    const created = new Date(data.created_at) 
    const updated = new Date(data.updated_at)
    const verify = checkDate(created, updated)

    const compare = checkRepos(data.public_repos, repos.ids.length)

    const output = {
        verify,
        compare,
        hooks,
        issues,
        members,
        public_members,
        repos,
        events,
    }

    res.send(output);
});

//Function makes api call to all urls containing api.github.com/orgs/BoomTownROI in the path
checkUrls = (url) => {
    const payload = fetch(url)
        .then(response => {
            if (!response.ok) {
                return
            } else {
                return response.json();
            }
        })
        .then(data => {
            if(!data){
                const obj = {url: url, pass_fail: "FAIL: response code other than 200"}
                return obj
            } else {
                const ids = findIds(data, "id")
                const obj = {url: url, pass_fail: "PASS: response code 200", ids: ids}
                return obj
            }
        })
    return payload
}

//Function finds all id key/value's in succesful response objects
findIds = (obj, id) => {
    let arr = []
    
    for(let key in obj) {
      if (key === id){
        arr.push(obj[key])
      }
      else if (typeof obj[key] === 'object'){
        arr.push(...findIds(obj[key], id))
      }
    }
    return arr;
}

//Function checks if the updated_date is later than the created_at date
checkDate = (a, b) => {
    const dif = a - b 
    return dif < 0 ?
    {verify_date: {pass_fail: "PASS: updated_at is later than created_at"}}
    :
    {verify_date: {pass_fail: "FAIL: updated_at is not later than created_at"}}
}

//Funtion compares the number of repos in repos_url to public_repos
checkRepos = (a, b) => {
    let c = b / 2
    return a === c ? 
    {repo_count: {pass_fail: "PASS: repo counts match"}} 
    : 
    {repo_count: {pass_fail: "FAIL: repo counts do not match"}}
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});