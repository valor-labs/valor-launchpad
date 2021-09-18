export const SOCIAL_FOLLOWED = 'social.followed';
export const SOCIAL_UNFOLLOWED = 'social.unfollowed';
export type SOCIAL_FOLLOWED_PAYLOAD = {
  userId: string;
  operatorId: string;
  actionAt: Date;
};

export const SOCIAL_LIKED = 'social.liked';
export const SOCIAL_UNLIKED = 'social.unliked';
export class SocialLikedPayload {
  constructor(
    public operatorId: string,
    public targetUserId: string,
    public actionAt: Date,
    public storyId: string
  ) {}
}
