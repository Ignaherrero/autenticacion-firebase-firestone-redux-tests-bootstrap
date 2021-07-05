import moment from "moment";
import React from "react";
import { useDispatch } from "react-redux";
import { activeNotes } from "../../actions/notes";

export const JournalEntry = ({ id, title, body, url, img, date }) => {
  const noteDate = moment(date);
  const dispatch = useDispatch();
  const handleActiveNote = (id, notes) => {
    dispatch(activeNotes(id, notes));
  };
  return (
    <div
      className="journal__entry pointer animate__animated animate__fadeIn animate__fast"
      onClick={() => handleActiveNote(id, { title, body, url, img, date })}
    >
      <div
        className="journal__entry-picture"
        style={{
          backgroundSize: "cover",
          backgroundImage: `url(${url})`,
        }}
      ></div>

      <div className="journal__entry-body">
        <p className="journal__entry-title">{title}</p>
        <p className="journal__entry-content">{body}</p>
      </div>

      <div className="journal__entry-date-box">
        <span>{noteDate.format("dddd")}</span>
        <h4>{noteDate.format("DD")}</h4>
      </div>
    </div>
  );
};
