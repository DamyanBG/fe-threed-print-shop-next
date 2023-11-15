"use client";

import React from "react";
import styles from "./quoting.module.css";

const Quoting = () => {
    const handleOnSubmit = (e: React.SyntheticEvent) => {
        e.preventDefault();
    };

    return (
        <section className={styles.mainSection}>
            <h2>Форма за запитване</h2>
            <form action="" onSubmit={handleOnSubmit}>
                <article>
                    <label htmlFor="">Име: </label>
                    <article>
                        <input type="text" />
                    </article>
                </article>
                <article>
                    <label htmlFor="">Имейл: </label>
                    <article>
                        <input type="text" />
                    </article>
                </article>
                <article>
                    <label htmlFor="">Телефон: </label>
                    <article>
                        <input type="text" />
                    </article>
                </article>
                <article>
                    <label htmlFor="">Oписание: </label>
                    <article>
                        <textarea />
                    </article>
                </article>
                <article>
                    <label htmlFor="">Cad файл: </label>
                    <article>
                        <input type="file" />
                    </article>
                </article>
                <article>
                    <button
                        type="submit"
                    >
                        Изпрати
                    </button>
                </article>
            </form>
        </section>
    );
};

export default Quoting;
