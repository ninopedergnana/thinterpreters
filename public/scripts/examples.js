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



 // --------------------------------------------------- While Code ---------------------------------------------------



    codeMirrorReadOnly = CodeMirror(document.getElementById('while-absolute-diff'), {
        value: 'x4 = x2 + 0;\nx3 = x1 - x2;\nLoop x3 Do\n    x4 = x1 + 0\nEnd;\nx5 = x2 + 0;\nx3 = x2 - x1;\nLoop x3 Do\n    x5 = x1 + 0\nEnd;\nx0 = x4 - x5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-absolute-diff-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-sum'), {
        value: 'While x1 > 0 Do\n    x2 = x2 + 1;\n    x1 = x1 - 1\nEnd;\nx0 = x2 + 0',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-sum-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-fibonacci'), {
        value: 'x2 = 0 + 0;\nx0 = 1 + 0;\nWhile x1 > 0 Do\n    x4 = x0 + 0;\n    x0 = x2 + x0;\n    x2 = x4 + 0;\n    x1 = x1 - 1\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-fibonacci-p'), {
        value: 'x1 = 8\nExample parameter input: 8',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-gcd'), {
        value: 'While x2 > 0 Do\nx4 = x2 + 0;\nx0 = x1 + 0;\nLoop x1 Do\n    x1 = x1 - x2;\n    x3 = x1 + 0;\n    x3 = 1 - x3;\n    x3 = 1 - x3;\n    Loop x3 Do\n        x0 = x1 + 0\n    End\nEnd;\nx1 = x2 - 1;\nx1 = x0 - x1;\nLoop x1 Do\n    x0 = 0 + 0\nEnd;\nx2 = x0 + 0;\nx1 = x4 + 0\nEnd;\nx0 = x1 + 0',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-gcd-p'), {
        value: 'x1 = 28\nx2 = 7\nExample parameter input: 28, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-int-div'), {
        value: 'x3 = x1 - x2;\nx3 = x3 + 1;\nWhile x3 > 0 Do\n    x3 = x3 - x2;\n    x0 = x0 + 1\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-int-div-p'), {
        value: 'x1 = 15\nx2 = 5\nExample parameter input: 15, 5',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-maximum'), {
        value: 'x0 = x2 + 0;\nx3 = x1 - x2;\nLoop x3 Do\n    x0 = x1 + 0\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-maximum-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-minimum'), {
        value: 'x0 = x2 + 0;\nx3 = x2 - x1;\nLoop x3 Do\n    x0 = x1 + 0\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-minimum-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-mod'), {
        value: 'x0 = x1 + 0;\nLoop x1 Do\n    x1 = x1 - x2;\n    x3 = x1 + 0;\n    x3 = 1 - x3;\n    x3 = 1 - x3;\n    Loop x3 Do\n        x0 = x1 + 0\n    End\nEnd;\nx1 = x2 - 1;\nx1 = x0 - x1;\nLoop x1 Do\n    x0 = 0 + 0\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-mod-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-mul'), {
        value: 'Loop x1 Do\n    x0 = x0 + x2\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('while-mul-p'), {
        value: 'x1 = 15\nx2 = 7\nExample parameter input: 15, 7',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

})