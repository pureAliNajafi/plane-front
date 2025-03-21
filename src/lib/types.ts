export type FlyingMachineSearchParams = {
  Attack: number;
  Defence: number;
  Speed: number;
  Agility: number;
  Capacity: number;

  page: number;
  pageSize: number;

  weapons: string;

  sort: string;

  search: string;
};

export type Machine = {
  id: number;
  documentId: string;
  Name: string;
  Description: string;
  Attack: number;
  Defence: number;
  Speed: number;
  Agility: number;
  Capacity: number;
  Image: { url: string; formats: { thumbnail: { url: string }; small: { url: string } } };
  weapons: Weapon[];
};

export type Weapon = {
  id: number;
  Name: WeaponType;
};
export type WeaponType = "Gun" | "Bomb" | "Missile";

export type Message = {
  Name: string;
  Email: string;
  Message: string;
};
export type CreateContactFormState = {
  errors?: {
    Name?: string[];
    Email?: string[];
    Message?: string[];
  };
  message?: string;
  success?: string;
};
export type SignUpFormState = {
  errors?: { username?: string[]; email?: string[]; password?: string[] };
  message?: string;
  success?: string;
};
export type SignInState = {
  errors?: { email?: string[]; password?: string[] };
  message?: string;
  success?: string;
};
export type CounterState = {
  count: number;
  increment: () => void;
  decrement: () => void;
  reset: () => void;
};
export type MachineLikeStatus = {
  count: number;
  userAlreadyLiked: boolean;
};
/* 
        {
            "id": 43,
            "documentId": "hyminc9745zru4wowoxlxzw7",
            "Name": "Model 2",
            "Description": "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            "Attack": 5,
            "Defence": 4,
            "Speed": 2,
            "Agility": 1,
            "Capacity": 3,
            "createdAt": "2025-02-15T17:04:19.712Z",
            "updatedAt": "2025-02-15T19:05:01.057Z",
            "publishedAt": "2025-02-15T19:05:01.090Z",
            "Image": {
                "id": 4,
                "documentId": "ekcvlv17reiz6636ktgtp6js",
                "name": "2.png",
                "alternativeText": null,
                "caption": null,
                "width": 512,
                "height": 512,
                "formats": {
                    "thumbnail": {
                        "name": "thumbnail_2.png",
                        "hash": "thumbnail_2_e0ab144d7c",
                        "ext": ".png",
                        "mime": "image/png",
                        "path": null,
                        "width": 156,
                        "height": 156,
                        "size": 28.22,
                        "sizeInBytes": 28220,
                        "url": "/uploads/thumbnail_2_e0ab144d7c.png"
                    },
                    "small": {
                        "name": "small_2.png",
                        "hash": "small_2_e0ab144d7c",
                        "ext": ".png",
                        "mime": "image/png",
                        "path": null,
                        "width": 500,
                        "height": 500,
                        "size": 253.18,
                        "sizeInBytes": 253181,
                        "url": "/uploads/small_2_e0ab144d7c.png"
                    }
                },
                "hash": "2_e0ab144d7c",
                "ext": ".png",
                "mime": "image/png",
                "size": 80.29,
                "url": "/uploads/2_e0ab144d7c.png",
                "previewUrl": null,
                "provider": "local",
                "provider_metadata": null,
                "createdAt": "2025-02-15T18:12:42.574Z",
                "updatedAt": "2025-02-15T18:12:42.574Z",
                "publishedAt": "2025-02-15T18:12:42.575Z"
            }
        },
*/
