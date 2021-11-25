module Syntax where

import qualified Data.Map.Strict as MS

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

data LineOrError = Correct Line | Error String

type Program = [Line]

type ProgrammWithError = [LineOrError]