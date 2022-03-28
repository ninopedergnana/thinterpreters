module Semantics where

import Syntax
import qualified Data.Map.Strict as MS

data State = State { currentLines :: Program
                   , variables :: MS.Map Variable Integer 
                   }

type Input = [Integer]

getInstructions :: Program -> Marker -> Program
getInstructions program m = case program of
    [] -> []
    (m', _):remainingInstructions
        | m' == m -> program
        | otherwise -> getInstructions remainingInstructions m 

run :: Program -> State -> Integer
run program state = case currentLines state of
    [] -> fetchVar(X 0)

    (_, Halt):_ -> fetchVar(X 0)

    (_, Goto m):_ -> run program(state
        { currentLines = getInstructions program m })

    (_, IfGoto v c m):remainingInstructions
        | fetchVar v == c -> run program(state
            { currentLines = getInstructions program m})
        | otherwise -> run program (state
            { currentLines = remainingInstructions })

    (_, AssignmentPlus v1 v2 c):remainingInstructions ->
        run program (State
            { currentLines = remainingInstructions
            , variables = MS.insert v1 (add v2 c) (variables state)
            })

    (_, AssignmentMinus v1 v2 c):remainingInstructions ->
        run program (State
            { currentLines = remainingInstructions
            , variables = MS.insert v1 (sub v2 c) (variables state)
            })
    where
        fetchVar :: Variable -> Integer
        fetchVar v = MS.findWithDefault 0 v (variables state)
        add :: Variable -> Constant -> Integer
        add v c = fetchVar v + c
        sub :: Variable -> Constant -> Integer
        sub v c = max 0 (fetchVar v - c)


execute :: Input -> Program -> Integer
execute input program = run program initialState
    where
        initialState :: State
        initialState = State program initialVars

        initialVars :: MS.Map Variable Integer
        initialVars = MS.fromList(zip (map X [1..]) input)