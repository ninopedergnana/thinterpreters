module Print where

import Syntax

-- Pretty printing programs

spaces :: Int -> String
spaces n = replicate n ' '

prettyLit :: Literal -> String
prettyLit (X n) = "x" ++ show n
prettyLit (C n) = show n

prettyTerm :: Term -> String
prettyTerm t = case t of
    (Plus l r)  -> printt " + " l r
    (Minus l r) -> printt " - " l r
    where
        printt s l r = concat
            [ prettyLit l
            , s
            , prettyLit r
            ]

pretty :: Int -> Program -> String
pretty _ Empty = ""
pretty n (Assignment i t) = concat
    [ spaces n
    , "x" ++ show i
    , " = "
    , prettyTerm t
    ]
pretty n (Loop l p) = concat
    [ spaces n
    , "Loop "
    ,  prettyLit l
    , " Do\n"
    , pretty (n+3) p
    , "\n"
    , spaces n
    , "End"
    ]
pretty n (While i p) = concat
    [ spaces n
    , "While "
    , prettyLit (X i)
    , " Do\n"
    , pretty (n+3) p
    , "\n"
    , spaces n
    , "End"
    ]
pretty n (Seq p1 p2) =
    case p2 of
        Empty -> pretty n p1
        _ -> concat
                [ pretty n p1
                , ";\n"
                , pretty n p2
                ]

-- Pretty printing inputs

prettyInput :: [Integer] -> String
prettyInput xs =
    zip [1..] xs >>= f
    where
        f (i,x) = concat
            [ "x"
            , show i
            , " = "
            , show x
            , " "
            ]