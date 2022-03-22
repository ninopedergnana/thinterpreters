module Parsing where

import Control.Monad (void)
import Data.Void ( Void )
import Text.Megaparsec
    ( (<|>), empty, sepBy1, Parsec, MonadParsec(try) )
import Text.Megaparsec.Char ( char, space1 )
import qualified Text.Megaparsec.Char.Lexer as L
import Syntax
    ( Term(..), Literal(..), seqL, Program(Assignment, Loop, While) )

type Parser = Parsec Void String

-- | Parsing basics

charC :: Char -> Parser ()
charC c = do
  _ <- char c
  return ()

sc :: Parser ()
sc = L.space space1 lineCmnt empty
  where
    lineCmnt  = L.skipLineComment "//"

lexeme :: Parser a -> Parser a
lexeme = L.lexeme sc

symbol :: String -> Parser String
symbol = L.symbol sc

integer :: Parser Integer
integer = lexeme L.decimal

-- fromInteger 3 -> 3
int :: Parser Int
int = fromInteger <$> integer

semi :: Parser String
semi = symbol ";"

-- | Parsing the datatypes

varP :: Parser Literal
varP = do
  charC 'x'
  i <- int
  return $ X i

constP :: Parser Literal
constP = C <$> integer

litP :: Parser Literal
litP = constP <|> varP

data Ops = OpPlus | OpMinus

flatOpP :: Parser Ops -> Parser Term
flatOpP p = do
  left <- litP
  c <- lexeme p
  right <- litP
  case c of
    OpPlus  -> return $ Plus left right
    OpMinus -> return $ Minus left right

termP :: Parser Term
termP = try (flatOpP pp) <|> (flatOpP pm)
  where
    pp = do { charC '+'; return OpPlus }
    pm = do { charC '-'; return OpMinus }

assignmentP :: Parser Program
assignmentP = do
  X i <- lexeme varP
  lexeme $ charC '='
  term <- termP
  return $ Assignment i term

loopP :: Parser Program
loopP = do
  _ <- symbol "Loop"
  cntr <- lexeme litP
  _ <- symbol "Do"
  sub <- lexeme progP
  _ <- symbol "End"
  return $ Loop cntr sub

whileP :: Parser Program
whileP = do
  _ <- symbol "While"
  (X i) <- lexeme varP
  _ <- symbol ">"
  _ <- symbol "0"
  _ <- symbol "Do"
  sub <- lexeme progP
  _ <- symbol "End"
  return $ While i sub

progP :: Parser Program
progP = (f <$> sepBy1 progP' semi)
  where
    -- only use seqL if there is more than one Program in sequence
    f :: [Program] -> Program
    f l
      | length l == 1 = head l
      | otherwise = seqL l

progP' :: Parser Program
progP' = loopP <|> whileP <|> assignmentP

-- | Input parser

inputP :: Parser [Integer]
inputP = sepBy1 integer (symbol ",")