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

    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation6'), {
        value: 'While variable > 0 Do\n    program (subroutine)\nEnd',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });

    codeMirrorReadOnly = CodeMirror(document.getElementById('documentation7'), {
        value: 'While x2 > 0 Do     // Header for while program w1\n  x4 = x2 + 0;      // Assignment, w1 subroutine\n  x0 = x1 + 0;      // Assignment, w1 subroutine\n  Loop x1 Do        // Header for loop program l1\n    x1 = x1 - x2    // Assignment, l1 subroutine\n  End               // End of l1\nEnd;                // End of w1\nx0 = x1 + 0         // Assignment',
        mode: 'goto',
        lineNumbers: false,
        readOnly: true
    });
})