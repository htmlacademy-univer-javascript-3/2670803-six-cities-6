import { describe, it, expect, vi, beforeEach } from 'vitest';
import * as apiModule from './api';
import { Offer, Comment, CommentData } from './types/types';

const mockOffer: Offer = { id: '1', title: 'Test Offer' } as unknown as Offer;
const mockComment: Comment = { id: '1', comment: 'Nice', rating: 5 } as unknown as Comment;

vi.mock('axios', () => {
  const mockedAxiosInstance = {
    get: vi.fn(),
    post: vi.fn(),
    interceptors: {
      request: { use: vi.fn() },
      response: { use: vi.fn() },
    },
  };

  return {
    default: {
      create: vi.fn(() => mockedAxiosInstance),
    },
  };
});

describe('API module', () => {
  let axiosInstance: ReturnType<typeof apiModule.createAPI>;

  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
    axiosInstance = apiModule.createAPI();
  });

  it('getOffers should return offers', async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({ data: [mockOffer] });

    const offers = await apiModule.getOffers();
    expect(offers).toEqual([mockOffer]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/offers');
  });

  it('getOffer should return single offer', async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({ data: mockOffer });

    const offer = await apiModule.getOffer('1');
    expect(offer).toEqual(mockOffer);
    expect(axiosInstance.get).toHaveBeenCalledWith('/offers/1');
  });

  it('getNearbyOffers should return nearby offers', async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({ data: [mockOffer] });

    const offers = await apiModule.getNearbyOffers('1');
    expect(offers).toEqual([mockOffer]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/offers/1/nearby');
  });

  it('getComments should return comments', async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({ data: [mockComment] });

    const comments = await apiModule.getComments('1');
    expect(comments).toEqual([mockComment]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/comments/1');
  });

  it('sendComment should post comment', async () => {
    const commentData: CommentData = { comment: 'Nice', rating: 5 };
    axiosInstance.post = vi.fn().mockResolvedValue({ data: mockComment });

    const comment = await apiModule.sendComment('1', commentData);
    expect(comment).toEqual(mockComment);
    expect(axiosInstance.post).toHaveBeenCalledWith('/comments/1', commentData);
  });

  it('getFavoriteOffers should return favorite offers', async () => {
    axiosInstance.get = vi.fn().mockResolvedValue({ data: [mockOffer] });

    const offers = await apiModule.getFavoriteOffers();
    expect(offers).toEqual([mockOffer]);
    expect(axiosInstance.get).toHaveBeenCalledWith('/favorite');
  });

  it('toggleFavorite should post favorite status', async () => {
    axiosInstance.post = vi.fn().mockResolvedValue({ data: mockOffer });

    const offerAdd = await apiModule.toggleFavorite('1', false);
    expect(offerAdd).toEqual(mockOffer);
    expect(axiosInstance.post).toHaveBeenCalledWith('/favorite/1/1');

    const offerRemove = await apiModule.toggleFavorite('1', true);
    expect(offerRemove).toEqual(mockOffer);
    expect(axiosInstance.post).toHaveBeenCalledWith('/favorite/1/0');
  });

  it('should save, get and drop token', () => {
    apiModule.saveToken('123');
    expect(localStorage.getItem('six-cities-token')).toBe('123');

    expect(apiModule.getToken()).toBe('123');

    apiModule.dropToken();
    expect(localStorage.getItem('six-cities-token')).toBeNull();
  });
});
