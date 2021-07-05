import React from "react";
import { startLogout } from "../../actions/auth";
import { JournalEntries } from "./JournalEntries";
import { useDispatch, useSelector } from "react-redux";
import { startNewNote } from "../../actions/notes";

export const Sidebar = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(startLogout());
  };
  const { auth } = useSelector((state) => state);
  const { uname } = auth;
  const handleAddTask = () => {
    dispatch(startNewNote());
  };

  return (
    <aside className="journal__sidebar">
      <div className="journal__sidebar-navbar">
        <h3 className="mt-5">
          <i className="far fa-moon"></i>
          <span> {uname} </span>
        </h3>

        <button className="btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      <div className="journal__new-entry" onClick={handleAddTask}>
        <i className="far fa-calendar-plus fa-5x"></i>
        <p className="mt-5">New entry</p>
      </div>

      <JournalEntries />
    </aside>
  );
};
