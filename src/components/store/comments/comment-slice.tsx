import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Comment } from '../../../api/types/types';

export interface CommentsState {
  comments: Comment[];
  commentsLoading: boolean;
}

export const INITIAL_COMMENTS_STATE: CommentsState = {
  comments: [],
  commentsLoading: false,
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState: INITIAL_COMMENTS_STATE,
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
