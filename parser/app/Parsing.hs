module Parsing where

import Control.Monad (void)
import Data.Void
import Syntax
import Data.Text (Text)
import Text.Megaparsec
import Text.Megaparsec.Char
import qualified Text.Megaparsec.Char.Lexer as L

type Parser = Parsec Void String

-- | Parsing basics

charC :: Char -> Parser ()
charC c = do
  _ <- char c
  return ()

sc :: Parser () -- space consumer
sc = L.space space1 lineCmnt empty
  where
    lineCmnt  = L.skipLineComment "//"

lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

symbol :: String -> Parser String
symbol = L.symbol sc

integer :: Parser Integer
integer = lexeme L.decimal

int :: Parser Int
int = fromInteger <$> integer

semi :: Parser String
semi = symbol ";"

-- | Parsing the datatypes

varP :: Parser Variable
varP = do
    charC 'x'
    i <- int
    return $ X i

markerP :: Parser Marker
markerP = do
    charC 'M'
    i <- int
    return $ M i

assignmentPlusP :: Parser Instruction
assignmentPlusP = do
  xi <- lexeme varP
  lexeme $ charC '='
  xj <- lexeme varP
  lexeme $ charC '+'
  c <- lexeme integer
  return $ AssignmentPlus xi xj c

assignmentMinusP :: Parser Instruction
assignmentMinusP = do
  xi <- lexeme varP
  lexeme $ charC '='
  xj <- lexeme varP
  lexeme $ charC '-'
  c <- lexeme integer
  return $ AssignmentMinus xi xj c

gotoP :: Parser Instruction
gotoP = do
  symbol "goto"
  m <- lexeme markerP
  return $ Goto m

ifGotoP :: Parser Instruction
ifGotoP = do
  symbol "if"
  xi <- varP
  symbol "="
  c <- integer
  symbol "then"
  symbol "goto"
  m <- markerP
  return $ IfGoto xi c m

haltP :: Parser Instruction
haltP = do
  symbol "halt"
  return Halt

instructionP :: Parser Instruction
instructionP = 
  (try assignmentPlusP <|> assignmentMinusP)
  <|> gotoP
  <|> ifGotoP
  <|> haltP

lineP :: Parser Line
lineP = do
  m <- markerP
  symbol ":"
  instruction <- instructionP
  return (m, instruction)
  
-- | Input parser

inputP :: Parser [Integer]
inputP = sepBy1 integer (symbol ",")
