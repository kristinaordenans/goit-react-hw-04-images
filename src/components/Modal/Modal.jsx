import css from "./Modal.module.css"
import { Component } from "react"

export class Modal extends Component {
    componentDidMount() {
        document.addEventListener("keydown", this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.handleKeyDown);
    }

    handleKeyDown = e => {
        const { handleOnKeyDown } = this.props;
            if (e.key === "Escape") {
            handleOnKeyDown(false);
        }
    };


    render() {
        const { srcLarge, altText, escapeFromModal } = this.props;
        return (
            <div className={css.overlay} onClick={escapeFromModal}>
                <div className={css.modal}>
                    <img src={srcLarge} alt={`name: ${altText}`} />
                </div>
            </div>
        ); 
    }
}