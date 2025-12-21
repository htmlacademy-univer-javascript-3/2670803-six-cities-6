import { commentsReducer, setComments, setCommentsLoading, INITIAL_COMMENTS_STATE, CommentsState } from './comment-slice';
import { Comment } from '../../../api/types/types';

describe('commentsSlice', () => {
  const mockComments: Comment[] = [
    {
      id: '1',
      comment: 'TEST TEST TEST TEST',
      date: '2025-12-18',
      rating: 5,
      user: { name: 'Alice', avatarUrl: 'url', isPro: true }
    },
    {
      id: '2',
      comment: 'Another TEST',
      date: '2025-12-18',
      rating: 4,
      user: { name: 'Bob', avatarUrl: 'url', isPro: false }
    },
  ];

  it('should return the initial state', () => {
    expect(commentsReducer(undefined, { type: undefined })).toEqual(INITIAL_COMMENTS_STATE);
  });

  it('should handle setComments', () => {
    const state: CommentsState = commentsReducer(INITIAL_COMMENTS_STATE, setComments(mockComments));
    expect(state.comments).toEqual(mockComments);
  });

  it('should handle setCommentsLoading', () => {
    let state: CommentsState = commentsReducer(INITIAL_COMMENTS_STATE, setCommentsLoading(true));
    expect(state.commentsLoading).toBe(true);

    state = commentsReducer(state, setCommentsLoading(false));
    expect(state.commentsLoading).toBe(false);
  });
});
