import css from "./Searchbar.module.css";
import {  useState } from "react";


export const Searchbar = ({handleSubmit}) => {
    const [searchWord, setSearchWord] = useState('');

     const handleChange = e => {
        const { value } = e.currentTarget;
        setSearchWord(value)
    }

    const handleSubmitForm = e => {
        e.preventDefault();
        
        if (searchWord.trim() === '') {
            return ('The field cannot be empty. Please enter a search query')
        }

        handleSubmit(searchWord);
        setSearchWord('')
    }

    return (
            <header className={css.searchbar}>
                <form className={css.form} onSubmit={handleSubmitForm}>
                    <button type="submit" className={css.button}>
                    <span className={css.buttonLabel}>Search</span>
                    </button>

                    <input
                        className={css.input}
                        onChange={handleChange}
                        name="searchWord"
                        value={searchWord}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
}