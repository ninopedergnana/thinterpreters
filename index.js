const express = require('express')
const app = express()
const cors = require('cors');
const PORT = process.env.PORT  || 3001
const timeout = 5
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
  const result = run(req.body.code, req.query.args, req.body.prog)
  console.log("result \n:" + result)
  res.send(result)
})


function run(code, params, prog) {
  const { spawnSync } = require('child_process');
  var mainPath = './parser/app/Goto/GotoMain'
  if(prog === "while") {
    mainPath = './parser/app/While/WhileMain'
  }
  console.log("mainPath \n:" + mainPath)
  const child = spawnSync(mainPath, params ? [code, params] : [code], {
    timeout: timeout * 1000, // 5 seconds
    cwd: __dirname,
    stdio: 'pipe',
  })
  if (child.status === null) {
    return `{"error": "Process terminated with exit code 1! Maybe you implemented an endless loop."}`
  }
  return child.stdout.toString()
}


app.listen(PORT, () => {
  console.log(`Example app listening at PORT: ${PORT}`)
})