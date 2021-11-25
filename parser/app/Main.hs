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
            putStrLn "Please provide at least the first parameter with the code" >> exitWithError
        [code, params] -> do
            parsedParams <- parseParams params
            parsedCode <- parseCodeNew code
            result <- runProgramCode code parsedParams
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
            parsedCode <- parseCodeNew code
            putStrLn $ concat 
                        [   
                            "{",
                            "\"readCode\": " ++ show code ++ ",", 
                            "\"parsedCode\": " ++ show parsedCode,
                            "}"
                        ]


runProgramCode :: String -> [Integer] -> IO Integer
runProgramCode srcCode params = do
    return (execute params (mapMaybe f (lines srcCode)))
    where
        f line = case parse lineP "" line of
            Right line -> Just line
            Left _ -> Nothing


parseCodeNew :: String  -> IO String
parseCodeNew [] = return "Your program is as empty as my soul :'("
parseCodeNew srcCode = do
    return (printProgramWithError (map f (lines srcCode)))
    where
        f srcLine = case parse lineP "" srcLine of
            Right line -> Correct line
            Left _ -> Error srcLine
                


parseParams str = case parse inputP "" str of
    Right xs -> do
        return xs
    Left err -> do
        putStrLn $ "Invalid input: " ++ show err
        return []


-- with src file to test locally
runProgram :: String -> [Integer] -> IO Integer
runProgram srcPath args = do
    src <- readFile srcPath
    return (execute args(mapMaybe f(lines src)))
    where
        f line = case parse lineP "" line of
            Right line -> Just line
            Left _ -> Nothing
            
{- parseCode :: String -> IO ()
parseCode srcCode = do
    putStrLn (printProgram(mapMaybe f(lines srcCode)))
    where
        f line = case parse lineP "" line of
            Right line -> Just line
            Left err -> error(show err) -}

exit = exitWith ExitSuccess
exitWithError = exitWith (ExitFailure 1)