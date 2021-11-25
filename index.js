const express = require('express')
const app = express()
const fs = require('fs');
const cors = require('cors');
const PORT = process.env.PORT  || 3001
app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Static Files
app.use(express.static('public'))
app.use('/', express.static(__dirname + 'public/views'))


app.get("/documentation", function (request, response){
  //show this file when the "/documentation" is requested
  response.sendFile(__dirname+"/public/views/doc.html");
});

app.get("/examples", function (request, response){
  //show this file when the "/examples" is requested
  response.sendFile(__dirname+"/public/views/examples.html");
});

 app.get("/", function (request, response){
  //show this file when the "/" is requested
  response.sendFile(__dirname+"/public/views/index.html");
});
  

app.post('/code', (req, res) => {
  const result = run(req.body.code, req.query.args)
  res.send(result)
})

const timeout = 5

function run(code, params) {
  var cp = require('child_process');
  const child = cp.spawnSync('./Main', params ? [code, params] : [code], {
    stdio: 'pipe',
    timeout: timeout * 1000
  });

  if (child.status === null) {
    return `Invalid input: Program terminated after ${timeout}s.`
  }
  return child.stdout.toString()
}

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})