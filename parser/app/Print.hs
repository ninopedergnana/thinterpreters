module Print where

import Syntax

printInstruction :: Instruction -> String
printInstruction instruction = case instruction of
    AssignmentPlus (X i) (X j) c -> concat
        [ "x"
        , show i
        , " = "
        , "x"
        , show j
        , " + "
        , show c
        ]
    AssignmentMinus (X i) (X j) c -> concat
        [ "x"
        , show i
        , " = "
        , "x"
        , show j
        , " - "
        , show c
        ]
    Goto (M k) -> "goto M" ++ show k
    IfGoto (X i) c (M k) -> concat
        [ "if "
        , "x"
        , show i
        , " = "
        , show c
        , " then goto "
        , "M"
        , show k
        ]
    Halt -> "halt"

printParsedInstructions :: Instruction -> String
printParsedInstructions instruction = case instruction of
    AssignmentPlus (X i) (X j) c -> concat
        [ "AssignmentPlus"
        , " (X "
        , show i
        ,")"
        , " (X "
        , show j
        ,") "
        , show c
        ]
    AssignmentMinus (X i) (X j) c -> concat
        [ "AssignmentMinus"
        , " (X "
        , show i
        ,")"
        , " (X "
        , show j
        ,") "
        , show c
        ]
    Goto (M k) -> "Goto M" ++ show k
    IfGoto (X i) c (M k) -> concat
        [ "IfGoto"
        , " (X "
        , show i
        ,") "
        , show c
        , " M"
        , show k
        ]
    Halt -> "Halt"

printProgram :: Program -> String
printProgram p = case p of
    [] -> ""
    (M n, instruction):rest -> concat
        [ "M", show n, ": "
        , printInstruction instruction
        , "/n"
        , printProgram rest
        ]

printProgramWithError :: ProgrammWithError -> String
printProgramWithError p = case p of
    [] -> ""
    (Correct (M n, instruction)):rest -> concat
        [ "M", show n, ": "
        , printParsedInstructions instruction
        , "; "
        , printProgramWithError rest
        ]
    (Error msg):rest -> concat
        [ "\n\nThis line contains a syntax error:\n",
        msg
        , "\n\n"
        , printProgramWithError rest
        ]

printParsedProgram :: Program -> String
printParsedProgram p = case p of
    [] -> ""
    (M n, instruction):rest -> concat
        [ "M", show n, ": "
        , printParsedInstructions instruction
        , " "
        , printParsedProgram rest
        ]

prettyInput :: [Integer] -> String
prettyInput xs =
    zip [1..] xs >>= f
    where
        f (i,x) = concat
            [ "x"
            , show i
            , " = "
            , show x
            , "  "
            ]