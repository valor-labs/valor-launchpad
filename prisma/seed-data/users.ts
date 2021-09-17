export const USER_1 = {
  username: 'user1',
  email: 'user1@abc.com',
  avatar: {
    connectOrCreate: {
      where: {
        src_alt_unique_constraint: {
          src: 'assets/img/avatars/avatar.jpg',
          alt: 'user1 avatar picture'
        }
      },
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar.jpg',
        alt: 'user1 avatar picture'
      }
    }
  }
};

export const USER_2 = {
  username: 'user2',
  email: 'user2@abc.com',
  avatar: {
    connectOrCreate: {
      where: {
        src_alt_unique_constraint: {
          src: 'assets/img/avatars/avatar-2.jpg',
          alt: 'user2 avatar picture'
        }
      },
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar-2.jpg',
        alt: 'user2 avatar picture'
      }
    }
  }
};

export const USER_3 = {
  username: 'user3',
  emailVerified: false,
  email: 'user3@abc.com',
  avatar: {
    connectOrCreate: {
      where: {
        src_alt_unique_constraint: {
          src: 'assets/img/avatars/avatar-3.jpg',
          alt: 'user3 avatar picture'
        }
      },
      create: {
        type: 'image/jpg',
        src: 'assets/img/avatars/avatar-3.jpg',
        alt: 'user3 avatar picture'
      }
    }
  }
};
