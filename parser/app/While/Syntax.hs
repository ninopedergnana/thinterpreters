module Syntax where

-------------------------------------------------------------------------------
-- | The basic syntax of Loop Programs
-------------------------------------------------------------------------------

-- | Literals are constants and variabels
data Literal
    = X Int     -- A variable xn
    | C Integer -- A constant n
    deriving Show

-- | Terms are simple arithmetic expressions
-- | of literals.
data Term
    = Plus Literal Literal
    | Minus Literal Literal
    deriving Show

-- | A LOOP Program is one of the following cases
-- | - An empty Program
-- | - Assignment of a term to a variable (referred to by its index)
-- | - An actual Loop expression
-- | - A sequence of two separate Loop Programs.
data Program
    = Empty
    | Assignment Int Term
    | Loop Literal Program
    | While Int Program
    | Seq Program Program
    deriving Show


-------------------------------------------------------------------------------
-- | Macros - Extended Syntax
-------------------------------------------------------------------------------

-- | Like 'Seq' but with multiple Programs. I.e. 'seqL [p1, p2]'
-- | corresponds to 'Seq p1 p2'.
seqL :: [Program] -> Program
seqL [] = Empty
seqL (p:ps) = Seq p $ seqL ps

-- | 'ifThen n p' will execute 'p' if in a state where the variable 'xn' holds
-- | a value greater than '0'.
ifThen :: Int -> Program -> Program
ifThen i p = seqL
    [ Assignment i (Minus (C 1) (X i))
    , Assignment i (Minus (C 1) (X i))
    , Loop (X i) p
    ]
