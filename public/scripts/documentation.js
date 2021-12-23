let codeMirrorReadOnly

document.addEventListener('DOMContentLoaded', () => {
    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation1'), {
        value: 'xi = xj + c',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation2'), {
        value: 'xi = xj - c',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation3'), {
        value: 'goto Mi',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation4'), {
        value: 'if xi = c then goto Mi',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation5'), {
        value: 'halt',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
})