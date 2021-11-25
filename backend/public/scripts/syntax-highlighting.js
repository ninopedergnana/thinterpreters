
CodeMirror.defineSimpleMode("goto", {
    // The start state contains the rules that are intially used
    start: [
      {
        regex: /Do/,
        token: 'keyword',
        indent: true
      },
      {
        regex: /Loop|While|goto|if|then|halt/,
        token: 'keyword'
      },
      {
        regex: /x[0-9]+/,
        token: 'variable'
      },
      {
        regex: /M[0-9]+/,
        token: 'variable-2'
      },
      {
        regex: /This line contains a syntax error:/,
        token: 'string error'
      },
      {
        regex: /([^\w]|^)[0-9]+/,
        token: 'number'
      },
      {
        regex: /[-+=]/,
        token: "operator"
      },
      {
        regex: /End/,
        token: 'keyword',
        dedent: true
      },
      {
        regex: /\/\/( )?.*/,
        token: 'comment',
      },
    ],
    // The multi-line comment state.
    comment: [
  
    ],
    // The meta property contains global information about the mode. It
    // can contain properties like lineComment, which are supported by
    // all modes, and also directives like dontIndentStates, which are
    // specific to simple modes.
    meta: {
    }
  });
  