type Color = "white" | "black";

export type PieceType =
  | "pawn"
  | "knight"
  | "bishop"
  | "rook"
  | "queen"
  | "king";

export type Piece = {
  type: PieceType;
  color: Color;
  id: number;
  dead?: boolean;
};

type ChessSquare = {
  piece: Piece | null;
};

type ChessBoard = ChessSquare[][];

type ChessMove = {
  piece: Piece;
  from: [number, number];
  to: [number, number];
};

type ChessState = {
  board: ChessBoard;
  moves: ChessMove[];
  turn: Color;
};

const whitePawns = "PPPPPPPP"; // 8 white pawns
const whiteBackLine = "RNBQKBNR"; // 8 white backline pieces
const blackPawns = "pppppppp"; // 8 black pawns
const blackBackLine = "rnbqkbnr"; // 8 black backline pieces
// Empty squares are represented by a number 1-8 indicating how many empty squares there are
export const chessMap = `${blackBackLine}${blackPawns}8888${whitePawns}${whiteBackLine}`;

export function initializeChessBoard(map: string) {
  return decodeChessMap(map);
}

type EncodedPieceType = "p" | "n" | "b" | "r" | "q" | "k";

const encodedPieceToPieceType = {
  b: "bishop",
  k: "king",
  n: "knight",
  p: "pawn",
  q: "queen",
  r: "rook",
} satisfies Record<EncodedPieceType, PieceType>;

const pieceTypeToEncodedPiece = {
  bishop: "b",
  king: "k",
  knight: "n",
  pawn: "p",
  queen: "q",
  rook: "r",
} satisfies Record<PieceType, EncodedPieceType>;

export function decodeChessMap(map: string) {
  const pieces: (Piece | null)[][] = [];
  let row: (Piece | null)[] = [];

  for (let i = 0; i < map.length; i++) {
    const piece = map[i];
    const isPiece = /[pnbrqkPNBRQK]/.test(piece);

    if (!isPiece) {
      const emptySquareCount = parseInt(piece, 10);
      for (let j = 0; j < emptySquareCount; j++) {
        row.push(null);
        if (row.length === 8) {
          pieces.push(row);
          row = [];
        }
      }
    } else {
      const pieceType =
        encodedPieceToPieceType[piece.toLowerCase() as EncodedPieceType];

      const color = piece === piece.toLowerCase() ? "black" : "white";

      row.push({ color, type: pieceType, id: i });
    }

    if (row.length === 8) {
      pieces.push(row);
      row = [];
    }
  }

  return pieces;
}

export function encodeChessState(state: (Piece | null)[][]) {
  let encoded = "";
  let emptyCount = 0;
  for (let x = 0; x < 8; x++) {
    for (let y = 0; y < 8; y++) {
      const piece = state[x][y];
      if (piece) {
        if (emptyCount > 0) {
          encoded += emptyCount;
          emptyCount = 0;
        }
        const color =
          piece.color === "white"
            ? pieceTypeToEncodedPiece[piece.type]
            : pieceTypeToEncodedPiece[piece.type].toUpperCase();

        encoded += color;
      } else {
        emptyCount++;
        if (emptyCount === 8) {
          encoded += emptyCount;
          emptyCount = 0;
        }
      }
    }
  }
  return encoded;
}
