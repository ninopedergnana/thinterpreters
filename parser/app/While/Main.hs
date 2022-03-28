{-# OPTIONS_GHC -Wno-incomplete-patterns #-}
module Main where

import Control.Monad (void)
import Data.Void
import Text.Megaparsec
import Text.Megaparsec.Char
import qualified Text.Megaparsec.Char.Lexer as L

import Syntax
import Semantics
import Print
import Parsing

import System.Environment
import System.Exit

parseProgram :: IO (Maybe Program)
parseProgram = do
  putStrLn "Path to source file:"
  path <- readLn
  s <- readFile path
  case parse progP "" s of
    Right p -> do
        putStrLn $ "Sucessfully parsed program:\n" ++ pretty 0 p
        return $ Just p
    Left err -> do
        putStrLn $ "Invalid input: " ++ show err
        return Nothing

parseInput :: IO [Integer]
parseInput = do
    putStrLn "Specify input:"
    inp <- readLn
    case parse inputP "" inp of
        Right xs -> do
            putStrLn "Successfully parsed input:"
            putStrLn $ prettyInput xs
            return xs
        Left err -> do
            putStrLn $ "Invalid input: " ++ show err
            return []

parseParams :: String -> IO [Integer]
parseParams str = case parse inputP "" str of
    Right xs -> do
        return xs
    Left err -> do
        putStrLn $ "Invalid input: " ++ show err
        return []


parseCode str = case parse progP "" str of
    Right p -> do
        return $ Just p
    Left err -> do
        putStrLn $ "{" ++ "\"error\": " ++ "\"" ++ "Your program contains a syntax error. Check the documentations for probable causes" ++ "\"" ++ "}" 
        return Nothing

main = do
    commandLineArgs <- getArgs
    case commandLineArgs of
        [] -> do
            putStrLn $ concat 
                        [   
                            "{",
                            "\"error\": " ++ "\"" ++ "Please provide a valid program" ++ "\"",
                            "}"
                        ]
        [code, params] -> do
            parsedCode <- parseCode code
            parsedParams <- parseParams params
            case parsedCode of
                Nothing -> exit
                Just prog -> do
                    putStrLn $ concat
                        [   
                            "{",
                            "\"readCode\": " ++ show code ++ ",",
                            "\"parsedCode\": " ++ "\"" ++ show prog ++ "\"" ++ ",",
                            "\"parsedParams\": " ++ "\"" ++ prettyInput parsedParams ++ "\"" ++ ",",
                            "\"result\": " ++ "\"" ++ show (run prog parsedParams) ++ "\"",
                            "}"
                        ]
        [code] ->  do
            parsedCode <- parseCode code
            case parsedCode of
                Nothing -> exit
                Just prog -> do
                    putStrLn $ concat
                        [   
                            "{",
                            "\"readCode\": " ++ show code ++ ",", 
                            "\"parsedCode\": " ++ "\"" ++ show prog ++ "\"",
                            "}"
                        ]

exit = exitSuccess
exitWithError = exitWith (ExitFailure 1)