module Semantics where

import Syntax
import qualified Data.Map.Strict as MS


data State = State { srcLines :: Program
                   , variables :: MS.Map Variable Integer 
                   }

type Input = [Integer]

-- sucht rekursiv die program liste durch, bis es die instruktion gefunden hat
getInstructions :: Program -> Marker -> Program
getInstructions program m = case program of
    [] -> []
    (m', _):instructions
        | m' == m -> program
        | otherwise -> getInstructions instructions m 

run :: Program -> State -> Integer
run program state = case srcLines state of
    -- return value of x0, which is per default 0
    [] -> fetchVar(X 0)

    -- stops the program, returns value x0
    (_, Halt):_ -> fetchVar(X 0)

    -- unconditional jump to m
    (_, Goto m):_ -> run program(state
        { srcLines = getInstructions program m })

    -- conditional jump to m if v == c
    (_, IfGoto v c m):remainingInstructions
        | fetchVar v == c -> run program(state
            { srcLines = getInstructions program m})
        | otherwise -> run program (state
            { srcLines = remainingInstructions })

    -- x1 = x2 + c
    (_, AssignmentPlus v1 v2 c):remainingInstructions ->
        run program (State
            { srcLines = remainingInstructions
            , variables = MS.insert v1 (add v2 c) (variables state) -- fetch map "variables from state"
            })

    -- x1 = x2 - c
    (_, AssignmentMinus v1 v2 c):remainingInstructions ->
        run program (State
            { srcLines = remainingInstructions
            , variables = MS.insert v1 (sub v2 c) (variables state) -- fetch map "variables from state"
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
        -- zip [1,2,3] [9,8,7] => [(1,9),(2,8),(3,7)] 
        -- was so viel heisst wie x1 = 9, x2 = 8, x3 = 7
        -- fromList() => Build a map from a list of key/value pairs.
        -- Ord k => [(k, a)] -> Map k a