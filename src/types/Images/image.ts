export interface uploadImage {
  image: string | Blob;
  folder: string;
}

export interface imageServerResponse {
  id: string;
  secureUrl: string;
}
