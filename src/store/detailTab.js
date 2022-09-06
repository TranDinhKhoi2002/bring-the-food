import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: "",
  listComment: [] || JSON.parse(localStorage.getItem("comment")),
};

const detailTabSlice = createSlice({
  name: "detailTab",
  initialState,
  reducers: {
    setComment(state, action) {
      state.comment = action.payload;
    },
    getComment(state, action) {
      return {
        ...state,
        listComment: [...state.listComment, action.payload],
      };
    },
  },
});

export const detailTabActions = detailTabSlice.actions;

export const selectComment = (state) => state.comment.comment;
export const selectListComment = (state) => state.comment.listComment;

export default detailTabSlice.reducer;
