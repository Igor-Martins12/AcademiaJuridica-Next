"use client"

import ReactConfetti from "react-confetti";

import { useConfettingStore } from "@/hooks/use-confetti-store";

export const ConfettiProvider = () => { 
  const confetti = useConfettingStore();

  if(!confetti.isOpen) return null;

  return ( 
    <ReactConfetti 
    className="pointer-events-nome z-[100]"
    numberOfPieces={500}
    recycle={false}
    onConfettiComplete={() => {
      confetti.onClose()
    }}
    />
  )
}