module Syntax where

-- Abstract Syntax Tree for the GOTO Language -- 

newtype Marker = M { line :: Int }
    deriving (Show, Eq, Ord)

newtype Variable = X Int
    deriving (Show, Eq, Ord)

type Constant = Integer

data Instruction
    = AssignmentPlus Variable Variable Constant
    | AssignmentMinus Variable Variable Constant
    | Goto Marker
    | IfGoto Variable Constant Marker
    | Halt
    deriving Show

type Line = (Marker, Instruction)

type Program = [Line]


-- Error Handling -- 

data LineOrError = Correct Line | Error String

type ProgrammWithPotentialError = [LineOrError]