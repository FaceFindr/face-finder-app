
export enum ALBUM_VISIBILITY{
    PRIVATE = "Private", 
    PUBLIC= "Public"
}

export type Album = {
    id?: string
    god?: string
    title: string
    description?: string
    isPublic: boolean
    thumb?: string
    label?: string
    creationDate?: string
}