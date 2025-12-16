import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../../api/types/comment';

export interface CommentsState {
  comments: Comment[];
  commentsLoading: boolean;
}

export const initialCommentsState: CommentsState = {
  comments: [],
  commentsLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: initialCommentsState,
  reducers: {
    setComments: (state, action: PayloadAction<Comment[]>) => {
      state.comments = action.payload;
    },
    setCommentsLoading: (state, action: PayloadAction<boolean>) => {
      state.commentsLoading = action.payload;
    },
  },
});

export const { setComments, setCommentsLoading } = commentsSlice.actions;
export const commentsReducer = commentsSlice.reducer;
