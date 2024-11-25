export type Character = {
    id: number;
    name: string;
    description: string;
    thumbnail: Thumbnail;
    resourceURI: string;
}

export type Thumbnail = {
    path: string;
    extension: string;
}

export type Comic = {
    id: number;
    title: string;
    pageCount: number;
    thumbnail: Thumbnail;
}