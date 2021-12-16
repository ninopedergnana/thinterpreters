let editor
let inputField

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("parse").addEventListener("click", sendCodeToServer);
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

function sendCodeToServer() {
    const code = editor.getValue()
    sendToServer(code)
}


function sendCodeAndParamsToServer() {
    const code = editor.getValue()
    const params = inputField.getValue()
    sendToServer(code, params)
}

function sendToServer(code, params) {
    const url = `https://thinterpreters.herokuapp.com/code${params ? `?args=${params}` : ''}`
    const srcCode = `{"code":${JSON.stringify(code)}}`
    fetch(url, {
        body: srcCode,
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }
    })
        .then(r => r.text())
        .then(handleResult)
}

let codeMirrorRead;
let codeMirrorParsedInput;
let codeMirrorParsedCode;
let codeMirrorResult;


function handleResult(result) {
    const json = JSON.parse(result)
    for (const prop in json) {
        switch (prop) {
            case 'readCode':
                document.getElementById('readCode').innerHTML = ""
                $("<h2>Read Code</h2>").prependTo($("#readCode"))
                codeMirrorRead = initReadonlyCodeMirror(document.getElementById('readCode'), json.readCode, 'goto')
                break;
            case 'parsedCode':
                document.getElementById('parsedCode').innerHTML = ""
                $("<h2>Parsed Code</h2>").prependTo($("#parsedCode"))
                codeMirrorParsedCode = initReadonlyCodeMirror(document.getElementById('parsedCode'), json.parsedCode, 'goto')
                break;
            case 'parsedParams':
                document.getElementById('parsedInputs').innerHTML = ""
                $("<h2>Parsed Inputs</h2>").prependTo($("#parsedInputs"))
                codeMirrorParsedInput = initReadonlyCodeMirror(document.getElementById('parsedInputs'), json.parsedParams, 'goto')
                break;
            case 'result':
                document.getElementById('result').innerHTML = ""
                $("<h2>Result</h2>").prependTo($("#result"))
                codeMirrorResult = initReadonlyCodeMirror(document.getElementById('result'), json.result, 'goto')
                break;
            case 'error':
                document.getElementById('error').innerHTML = ""
                $("<h2>Error Message</h2>").prependTo($("#error"))
                codeMirrorResult = initReadonlyCodeMirror(document.getElementById('error'), json.error, 'goto')
                break;
            default:
                console.log("Default")
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
    /* https://github.com/codemirror/CodeMirror/issues/4762 */
    cm.on('copy', (cm, e) => {
        // ignore copy by codemirror.  and will copy by browser
        e.codemirrorIgnore = true;
    });
    return cm;
}