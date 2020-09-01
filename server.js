var express = require("express");

var app = express();
var PORT = 3000;

const fetch = require('node-fetch');

app.get("/", async (req, res) => {
    const queryURL = "https://api.github.com/orgs/boomtownroi";

    let data = await fetch(queryURL).then(res => res.json());

    let repos = await checkUrls(data.repos_url)
    let events = await checkUrls(data.events_url)
    let hooks = await checkUrls(data.hooks_url)
    let issues = await checkUrls(data.issues_url)
    let members = await checkUrls(data.members_url)
    let public_members = await checkUrls(data.public_members_url)

    let created = new Date(data.created_at) 
    let updated = new Date(data.updated_at)
    let verify = checkDate(created, updated)

    let compare = checkRepos(data.public_repos, repos.ids.length)

    let output = {
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
    let payload = fetch(url)
        .then(response => {
            if (!response.ok) {
                return
            } else {
                return response.json();
            }
        })
        .then(data => {
            if(!data){
                let obj = {url: url, pass_fail: "FAIL: response code other than 200"}
                return obj
            } else {
                const ids = findIds(data, "id")
                let obj = {url: url, pass_fail: "PASS: response code 200", ids: ids}
                return obj
            }
        })
    return payload
}

//Function finds all id key/value's in succesful response objects
findIds = (obj, id) => {
    const arr = []
    
    for(const key in obj) {
      if (key === id)
        arr.push(obj[id])
      else if (typeof obj[key] === 'object')
        arr.push(...findIds(obj[key], id))
    }
    
    return arr;
}

//Function checks if the updated_date is later than the created_at date
checkDate = (a, b) => {
    const dif = a - b 
    if (dif < 0){
        let obj = {verify_date: {pass_fail: "PASS: updated_at is later than created_at"}}
        return obj
    } else {
        let obj = {verify_date: {pass_fail: "FAIL: updated_at is not later than created_at"}}
        return obj
    }
}

//Funtion compares the number of repos in repos_url to public_repos
checkRepos = (a, b) => {
    let c = a / 2
    return c === b ? 
    {repo_count: {pass_fail: "PASS: repo counts match"}} 
    : 
    {repo_count: {pass_fail: "FAIL: repo counts do not match"}}
}

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});