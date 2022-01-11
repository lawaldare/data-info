export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export interface Album {
  userId: number;
  id: number;
  title: string;
}

export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zip: string;
    geo: {
      lat: string;
      lng: string;
    }
  },
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  }
}

export interface Photo {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
