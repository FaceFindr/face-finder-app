'use client'
import AlbumList from "@/app/components/organisms/albumList/AlbumList";
import { usePathname } from "next/navigation";

export default function AlbumPage(){
    const pathName = usePathname()
    return (
        <AlbumList albumId={pathName.split("/")[2]}/>
    );
}