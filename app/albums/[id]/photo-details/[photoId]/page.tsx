'use client'
import { getAuthHeaders } from "@/app/utils/requestHeader";
import { useEffect, useState } from "react";
import { IoMdArrowBack, IoMdDownload, IoMdTrash } from "react-icons/io";
import settingsStyle from './settingsStyle.module.css'
import Button, { ButtonSize, ButtonVariant } from "@/app/components/atoms/button/Button";
import { usePathname } from "next/navigation";

export default function PhotoSettingsPage() {
    const [photo, setPhoto] = useState(null);
    const [albumId, setAlbumId] = useState<string | null>(null);
    const [photoId, setPhotoId] = useState<string | null>(null);
    const headers = getAuthHeaders();
    const pathName = usePathname();

    useEffect(() => {
        const albumIdFromPath = pathName.split("/")[2];
        const photoIdFromPath = pathName.split("/")[4];
        setAlbumId(albumIdFromPath);
        setPhotoId(photoIdFromPath);
        fetchPhotoData(albumIdFromPath, photoIdFromPath);
    }, []);

    const fetchPhotoData = (albumId: string, photoId: string) => {
        fetch(`http://127.0.0.1:8000/photo/${albumId}/details/${photoId}`, { headers })
            .then((res) => res.json())
            .then((data) => {
                setPhoto(data);
            })
            .catch((error) => {
                console.error('Error fetching photo data:', error);
            });
    };

    const handleDeletePhoto = (photoId: string) => {
        fetch(`http://127.0.0.1:8000/photo/${photoId}`, { 
            method: 'DELETE',
            headers 
        })
        .then((res) => {
            if (!res.ok) {
                throw new Error(res.statusText);
            }
            return res.json();
        })
        .then((data) => {
            window.location.assign(`/albums/${albumId}`);
        })
        .catch((error) => {
            console.error('Error deleting photo:', error);
        });
    };

    const handleDownloadPhoto = async () => {
        if (photo?.image_key) {
            try {
                const response = await fetch(photo.image_key);
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                const blob = await response.blob();
                const url = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = url;
                link.download = 'photo.jpg';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            } catch (error) {
                console.error('Failed to download the photo:', error);
            }
        }
    };

    return (
        <div className={settingsStyle.pageContainer}>
            <IoMdArrowBack
                cursor="pointer"
                fontSize="50px"
                color="#08263b"
                onClick={() => history.back()}
            />
            <div className={settingsStyle.photoAndButtons}>
                <div>
                    {photo?.image_key && (
                        <img
                            className={settingsStyle.photo} 
                            src={photo.image_key}
                            alt="Photo"
                        />
                    )}
                </div>
                <div className={settingsStyle.block1Buttons}>
                <Button text="Delete Photo" onClick={() => {
                    if (photoId) {
                        handleDeletePhoto(photoId);
                    }
                }} />
                    <Button text="Download Photo" onClick={handleDownloadPhoto} />
                </div>
            </div>
        </div>
    );
}