import css from "./ImageGallery.module.css";
import { ImageGalleryItem } from "../ImageGalleryItem/ImageGalleryItem";


export const ImageGallery = ({images}) => {
    return (
        <ul className={css.gallery}>
            {images.map(({ id, webformatURL, largeImageURL }) => {
                return (
                    <ImageGalleryItem key={id} smallImg={webformatURL} largeImg={largeImageURL}/>
                )
            })}
        </ul>
    )
}