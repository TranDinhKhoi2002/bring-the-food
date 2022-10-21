import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  comment: "",
  listComment:
    JSON.parse(
      typeof window !== "undefined" && localStorage.getItem("comment")
    ) || [],
};

const commentSlice = createSlice({
  name: "comment",
  initialState,
  reducers: {
    setComment(state, action) {
      state.comment = action.payload;
    },
    addCommentToList(state, action) {
      return {
        ...state,
        listComment: [...state.listComment, action.payload],
      };
    },
  },
});

export const commentActions = commentSlice.actions;

export const selectComment = (state) => state.comment.comment;
export const selectListComment = (state) => state.comment.listComment;

export default commentSlice.reducer;
