import moment from "moment";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { startSaveNote, startUploadingImage } from "../../actions/notes";

export const NotesAppBar = () => {
  const { active } = useSelector((state) => state.notes);
  const noteDate = moment(active.date);
  const dispatch = useDispatch();
  const handleSaveNote = () => {
    dispatch(startSaveNote(active));
  };
  const handlePictureClick = () => {
    document.querySelector("#fileSelector").click();
  };
  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      dispatch(startUploadingImage(file));
    }
  };
  // TODO quitar el estilo en linea
  return (
    <div className="notes__appbar">
      <span>{noteDate.format("L")}</span>
      <input
        name="file"
        id="fileSelector"
        type="file"
        style={{ display: "none" }}
        onChange={handleChangeImage}
      />
      <div>
        <button className="btn" onClick={handlePictureClick}>
          Picture
        </button>

        <button className="btn" onClick={handleSaveNote}>
          Save
        </button>
      </div>
    </div>
  );
};
