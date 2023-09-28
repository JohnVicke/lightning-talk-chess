import { useStore } from "@nanostores/preact";
import type { Piece, PieceType } from "../modules/chess";
import { cn } from "../modules/cn";
import { activePiece } from "../store/activePiece";

const pieceMap = {
  king: "♔",
  queen: "♕",
  rook: "♖",
  bishop: "♗",
  knight: "♘",
  pawn: "♙",
} satisfies Record<PieceType, string>;

interface ChessPieceProps {
  piece: Piece;
}

export default function ChessPiece(props: ChessPieceProps) {
  const { piece } = props;
  const activeID = useStore(activePiece);

  const handleClick = () => {
    if (activeID === piece.id) {
      return activePiece.set(null);
    }

    activePiece.set(piece.id);
  };

  return (
    <p
      onClick={handleClick}
      className={cn(
        activeID === piece.id && "bg-blue-500",
        piece.color === "white" ? "text-white" : "text-black",
        "cursor-pointer text-3xl",
      )}
    >
      {pieceMap[piece.type]}
    </p>
  );
}
