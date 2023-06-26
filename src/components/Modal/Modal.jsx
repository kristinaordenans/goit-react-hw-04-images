import css from "./Modal.module.css"
import { useEffect, useCallback } from "react"


export const Modal = ({srcLarge, altText, escapeFromModal, handleOnKeyDown}) => {
    const handleKeyDown = useCallback((e) => {
         if (e.key === "Escape") {
            handleOnKeyDown(false);
        }
    }, [handleOnKeyDown])

    useEffect(() => {
    const eventListener = (e) => { handleKeyDown(e) };
    document.addEventListener('keydown', eventListener);
    return () => {
        document.removeEventListener('keydown', eventListener);
    };
    }, [handleKeyDown]);
    
    return (
            <div className={css.overlay} onClick={escapeFromModal}>
                <div className={css.modal}>
                    <img src={srcLarge} alt={`name: ${altText}`} />
                </div>
            </div>
        ); 
}
