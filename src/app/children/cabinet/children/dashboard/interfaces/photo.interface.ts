export interface IPhoto {
    id?: string;
    name: string;
    imageUrl: string;
    createdAt?: string;
}

export interface IPhotoRequest {
    created_at: string;
    id: string;
    image_url: string;
    name: string;
}
