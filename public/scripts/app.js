let editor
let inputField

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("parse").addEventListener("click", sendCodeToServer1);
    document.getElementById("run").addEventListener("click", sendCodeAndParamsToServer);
    
    editor = CodeMirror(document.getElementById('srccode'), {
        value: 'M1: if x1 = 0 then goto M5;\nM2: x1 = x1 - 1;\nM3: x0 = x0 + 1;\nM4: goto M1;\nM5: if x2 = 0 then goto M9;\nM6: x2 = x2 - 1;\nM7: x0 = x0 + 1;\nM8: goto M5;\nM9: halt;',
        mode: 'goto',
        lineNumbers: true,
    });

    inputField = CodeMirror(document.getElementById('params'), {
        value: "2, 15",
        mode: 'goto',
        lineNumbers: true,
    });
})


function sendCodeToServer1() {
    const code = editor.getValue()
    const gotoKeyWords = ["goto", "M1:", "halt"]
    const isGotoProgram = gotoKeyWords.some(el => code.includes(el))
    isGotoProgram ? sendCodeToServer(code, "goto") : sendCodeToServer(code, "while")
}


function sendCodeAndParamsToServer() {
    const code = editor.getValue()
    const params = inputField.getValue()
    const gotoKeyWords = ["goto", "M1:", "halt"]
    const isGotoProgram = gotoKeyWords.some(el => code.includes(el))
    isGotoProgram ? sendCodeToServer(code, "goto", params) : sendCodeToServer(code, "while", params)
}


function sendCodeToServer(code, prog, params) {
    const url = `https://thinterpreters.herokuapp.com/code${params ? `?args=${params}` : ''}`
    //const url = `http://localhost:3001/code${params ? `?args=${params}` : ''}`

    const srcCode = `{"code":${JSON.stringify(code)}, "prog": ${JSON.stringify(prog)}}`
    
    fetch(url, {
        body: srcCode,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
            "Access-Control-Allow-Origin" : "*", 
            "Access-Control-Allow-Credentials" : true 
        }
    })
        .then(r => r.text())
        .then(handleResult)
}

let codeMirrorReadOnly;


function handleResult(result) {
    const json = JSON.parse(result)
    for (const prop in json) {
        switch (prop) {
            case 'readCode':
                document.getElementById('readCode').innerHTML = ""
                $("<h2>Read Code</h2>").prependTo($("#readCode"))
                codeMirrorReadOnly = initReadonlyCodeMirror(document.getElementById('readCode'), json.readCode, 'goto')
                break;
            case 'parsedCode':
                document.getElementById('parsedCode').innerHTML = ""
                $("<h2>Parsed Code</h2>").prependTo($("#parsedCode"))
                codeMirrorReadOnly = initReadonlyCodeMirror(document.getElementById('parsedCode'), json.parsedCode, 'goto')
                break;
            case 'parsedParams':
                document.getElementById('parsedInputs').innerHTML = ""
                $("<h2>Parsed Inputs</h2>").prependTo($("#parsedInputs"))
                codeMirrorReadOnly = initReadonlyCodeMirror(document.getElementById('parsedInputs'), json.parsedParams, 'goto')
                break;
            case 'result':
                document.getElementById('result').innerHTML = ""
                $("<h2>Result</h2>").prependTo($("#result"))
                codeMirrorReadOnly = initReadonlyCodeMirror(document.getElementById('result'), json.result, 'goto')
                break;
            case 'error':
                document.getElementById('error').innerHTML = ""
                $("<h2>Error Message</h2>").prependTo($("#error"))
                codeMirrorReadOnly = initReadonlyCodeMirror(document.getElementById('error'), json.error, 'goto')
                break;
            default:
                console.log("Something went wrong, no editor could be displayed.")
                break;
        }
    }
}

function initReadonlyCodeMirror(ele, code, mode) {
    let cm = CodeMirror(ele, {
        value: code,
        mode: mode,
        theme: 'default',
        lineWrapping: true,
        readOnly: true
    });
    cm.on('copy', (cm, e) => {
        e.codemirrorIgnore = true;
    });
    return cm;
}