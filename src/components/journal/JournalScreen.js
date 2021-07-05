import React from "react";
import { Sidebar } from "./Sidebar";
import { NoteScreen } from "../notes/NoteScreen";
import { NothingSelected } from "./NothingSelected";
import { useSelector } from "react-redux";

export const JournalScreen = () => {
  const { notes } = useSelector((state) => state);

  return (
    <div className="journal__main-content animate__animated animate__fadeIn animate__fast">
      <Sidebar />

      <main>{notes.active ? <NoteScreen /> : <NothingSelected />}</main>
    </div>
  );
};
