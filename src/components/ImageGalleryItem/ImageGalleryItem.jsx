import css from "./ImageGalleryItem.module.css";
import { Modal } from "../Modal/Modal"
import { useState } from "react"

export const ImageGalleryItem = ({ smallImg, largeImg }) => {
    const [visibleModal, setVisibleModal] = useState(false);

    const handleClick = () => {
        setVisibleModal(true)
    }

    const handleKeyDown = isVisible => {
            setVisibleModal(isVisible)
    }
    
    const handleClickOnOverlay = e => {
        if (e.target !== e.currentTarget) { 
            return
        }
        setVisibleModal(false);
    }

    return (
        <li className={css.galleryItem}>
            <img className={css.galleryItemImage} onClick={() => handleClick()} src={smallImg} alt={`name: ${smallImg}`} />
            {visibleModal && <Modal handleOnKeyDown={handleKeyDown} escapeFromModal={handleClickOnOverlay} srcLarge={largeImg} altText={smallImg} />}
        </li>
    );
}