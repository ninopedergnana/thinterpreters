module Semantics where
import Syntax
import qualified Data.Map.Strict as MS

type State = MS.Map Int Integer


getVar :: Int -> State -> Integer
getVar i m = case MS.lookup i m of
    Nothing -> 0
    Just x  -> x


evalLit :: State -> Literal -> Integer
evalLit m (X i) = getVar i m
evalLit _ (C x) = x


evalTerm :: State -> Term -> Integer
evalTerm m (Plus l1 l2) = evalLit m l1 + evalLit m l2
evalTerm m (Minus l1 l2) = max 0 $ evalLit m l1 - evalLit m l2


eval :: Program -> State -> State
eval p m = case p of
    Empty -> m
    Assignment i t -> MS.insert i (evalTerm m t) m
    Loop l sub -> iter (evalLit m l) (eval sub) m
    While i sub -> while i (eval sub) m  
    Seq p1 p2 -> case eval p1 m of
        m' -> eval p2 m'
    where
        iter :: Integer -> (a -> a) -> a -> a
        iter 0 _ x = x
        iter n f x = iter (n-1) f $ f x

        while :: Int -> (State -> State) -> State -> State
        while i f s
            | getVar i s == 0 = s
            | otherwise = case f s of
                s' -> while i f s'


run :: Program -> [Integer] -> Integer
run p input = case MS.lookup 0 final of
    Nothing -> 0
    Just x -> x
    where
        initial = MS.fromList $ zip [1..] input
        final = eval p initial
