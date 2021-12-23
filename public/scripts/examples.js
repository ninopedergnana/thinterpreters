let codeMirrorReadOnly

document.addEventListener('DOMContentLoaded', () => {
    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-addition'), {
        value: 'M1: if x1 = 0 then goto M5;\nM2: x1 = x1 - 1;\nM3: x0 = x0 + 1;\nM4: goto M1;\nM5: if x2 = 0 then goto M9;\nM6: x2 = x2 - 1;\nM7: x0 = x0 + 1;\nM8: goto M5;\nM9: halt;',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-addition-params'), {
        value: 'x1 = 17\nx2 = 5\nExample parameter input: 17, 5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-multiplication'), {
        value: 'M1: if x2 = 0 then goto M3;\nM2: x2 = x2 - 1;\nM10: if x1 = 0 then goto M20;\nM11: x1 = x1 - 1;\nM12: x0 = x0 + 1;\nM13: x3 = x3 + 1;\nM14: goto M10;\nM20: if x3 = 0 then goto M1;\nM21: x3 = x3 - 1;\nM22: x1 = x1 + 1;\nM23: goto M20;\nM30: halt;',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-multiplication-params'), {
        value: 'x1 = 17\nx2 = 5\nExample parameter input: 17, 5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-division'), {
        value: 'M1: x1 = x1 + 1;\nM2: if x1 = 0 then goto M9;\nM3: x0 = x0 + 1;\nM4: x3 = x2 + 0;\nM5: if x3 = 0 then goto M2;\nM6: x1 = x1 - 1;\nM7: x3 = x3 - 1;\nM8: goto M5;\nM9: x0 = x0 - 1;\nM10: halt;',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-division-params'), {
        value: 'x1 = 15\nx2 = 5\nExample parameter input: 15, 5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-subtraction'), {
        value: 'M1: x0 = x1 + 0;\nM2: if x2 = 0 then goto M6;\nM3: x2 = x2 - 1;\nM4: x0 = x0 - 1;\nM5: goto M2;\nM6: halt;',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-subtraction-params'), {
        value: 'x1 = 15\nx2 = 5\nExample parameter input: 15, 5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-double'), {
        value: 'M1: if x1 = 0 then goto M6;\nM2: x0 = x0 + 1;\nM3: x0 = x0 + 1;\nM4: x1 = x1 - 1;\nM5: if x2 = 0 then goto M1;\nM6: halt;',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('goto-double-params'), {
        value: 'x1 = 15\nExample parameter input: 15',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
})