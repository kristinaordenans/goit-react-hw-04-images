import css from './Button.module.css'


export const LoadMoreBtn = ({ handleClick }) => {
    return (
        <button type="button" onClick={handleClick} className={css.button}>Load more</button>
    )
}