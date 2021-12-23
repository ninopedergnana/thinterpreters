module Main where


import System.Environment
import System.Exit
import Syntax
import Semantics
import Parsing
import Print
import qualified Data.Text as Text
import Data.Text (Text)
import Text.Megaparsec
import Data.Maybe (mapMaybe)

main = do  
    args <- getArgs
    case args of
        [] -> do
            putStrLn $ concat 
                        [   
                            "{",
                            "\"error\": " ++ "\"" ++ "Please provide a valid program" ++ "\"",
                            "}"
                        ]
        [code, params] -> do
            parsedParams <- parseParams params
            parsedCode <- parseCode code
            result <- runCode code parsedParams
            putStrLn $ concat 
                        [   
                            "{",
                            "\"readCode\": " ++ show code ++ ",", 
                            "\"parsedCode\": " ++ show parsedCode ++ ",",
                            "\"parsedParams\": " ++ "\"" ++ prettyInput parsedParams ++ "\"" ++ ",",
                            "\"result\": " ++ "\"" ++ show result ++ "\"",
                            "}"
                        ]
        [code] -> do
            parsedCode <- parseCode code
            putStrLn $ concat 
                        [   
                            "{",
                            "\"readCode\": " ++ show code ++ ",", 
                            "\"parsedCode\": " ++ show parsedCode,
                            "}"
                        ]


runCode :: String -> [Integer] -> IO Integer
runCode srcCode params = do
    return (execute params (mapMaybe parseLine (lines srcCode)))
    where
        parseLine currentLine = case parse lineP "" currentLine of
            Right correctLine -> Just correctLine
            Left _ -> Nothing


parseCode :: String -> IO String
parseCode [] = return "Your program is empty!"
parseCode srcCode = do
    return (printProgramWithPotentialError (map parseLine (lines srcCode)))
    where
        parseLine currentLine = case parse lineP "" currentLine of
            Right correctLine -> Correct correctLine
            Left _ -> Error currentLine


parseParams str = case parse inputP "" str of
    Right xs -> do
        return xs
    Left err -> do
        putStrLn $ "Invalid input: " ++ show err
        return []


-- test a file from src\ locally
runProgram :: String -> [Integer] -> IO Integer
runProgram srcPath params = do
    srcCode <- readFile srcPath
    return (execute params (mapMaybe parseLine (lines srcCode)))
    where
        parseLine currentLine = case parse lineP "" currentLine of
            Right correctLine -> Just correctLine
            Left _ -> Nothing

exit = exitWith ExitSuccess
exitWithError = exitWith (ExitFailure 1)