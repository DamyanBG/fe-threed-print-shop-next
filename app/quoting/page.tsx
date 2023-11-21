"use client";

import React, { useState, ChangeEvent, ChangeEventHandler } from "react";
import styles from "./quoting.module.css";

interface FormGroup {
    labelText: string,
    name: string,
    value: string,
    handleOnChange: ChangeEventHandler,
    error: boolean
}

const FormGroup = ({
    labelText,
    name,
    value,
    handleOnChange,
    error
}: FormGroup): React.JSX.Element => {
    return (
        <article>
            <label htmlFor="">{labelText}</label>
            <article>
                <input
                    type="text"
                    name={name}
                    value={value}
                    onChange={handleOnChange}
                />
                {error && <p className={styles.errorMessage}>Моля, попълнете полето!</p>}
            </article>
        </article>
    )
}

interface Quote {
    name: string;
    email: string;
    phone: string;
    description: string;
    cadFile: string;
}

interface QuoteRequestBody {
    customer_names: string;
    email: string;
    phone_number: string;
    description: string;
    cad_file: string;
}

interface QuoteValidationErrors {
    name?: boolean;
    email?: boolean;
    phone?: boolean;
    cadFile?: boolean;
    cadFileExtension?: boolean
}

const initialQuoteInfo = {
    name: "",
    email: "",
    phone: "",
    description: "",
    cadFile: "",
};

const validateQuote = (quoteInfo: Quote) => {
    const validationErrors: QuoteValidationErrors = {};

    if (!quoteInfo.name) {
        validationErrors.name = true;
    }
    if (!quoteInfo.email) {
        validationErrors.email = true;
    }
    if (!quoteInfo.phone) {
        validationErrors.phone = true;
    }
    if (!quoteInfo.cadFile) {
        validationErrors.cadFile = true;
    }

    return validationErrors;
};

const Quoting = () => {
    const [quoteInfo, setQuoteInfo] = useState<Quote>(initialQuoteInfo);
    const [validationErrors, setValidationErrors] =
        useState<QuoteValidationErrors>({});

    const postQuote = () => {
        const postBody: QuoteRequestBody = {
            customer_names: quoteInfo.name,
            email: quoteInfo.email,
            phone_number: quoteInfo.phone,
            description: quoteInfo.description,
            cad_file: quoteInfo.cadFile,
        };

        fetch(`http://127.0.0.1:5000/quote`, {
            method: "POST",
            body: JSON.stringify(postBody),
            headers: {
                "Content-Type": "application/json",
                // Authorization: `Bearer ${user.token}`,
            },
        })
            .then((resp) => {
                if (!resp.ok) {
                    console.log(resp);
                    return resp.json();
                    throw new Error();
                }
                alert("Information is sent to the backend!");
            })
            .then((json) => {
                console.log(json);
            })
            .catch(() => alert("Problem occured during uploading the photo!"));
    };

    const handleOnSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const valErrors = validateQuote(quoteInfo);
        if (Object.keys(valErrors).length > 0) {
            console.log(valErrors)
            setValidationErrors(valErrors);
            return;
        }
        postQuote();
    };

    const handleOnChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setQuoteInfo({
            ...quoteInfo,
            [name]: value,
        });
    };

    const handleOnFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            setQuoteInfo({
                ...quoteInfo,
                cadFile: reader.result as string,
            });
        };
        if (e.target.files) {
            const file = e.target.files[0];
            const fileExtension = file.name.split(".")[1]
            if (["stl"].includes(fileExtension)) {
                setValidationErrors({
                    ...validationErrors,
                    cadFileExtension 
                })
            }
            reader.readAsDataURL(file);
        }
    };

    return (
        <section className={styles.mainSection}>
            <h2>Форма за запитване</h2>
            <form action="" onSubmit={handleOnSubmit}>
                <FormGroup
                    labelText="Име: "
                    name="name"
                    value={quoteInfo.name}
                    handleOnChange={handleOnChange}
                    error={!!validationErrors.name}
                />
                
                <FormGroup
                    labelText="Имейл: "
                    name="email"
                    value={quoteInfo.email}
                    handleOnChange={handleOnChange}
                    error={!!validationErrors.email}
                />

                <FormGroup
                    labelText="Телефон: "
                    name="phone"
                    value={quoteInfo.phone}
                    handleOnChange={handleOnChange}
                    error={!!validationErrors.phone}
                />

                <article>
                    <label htmlFor="">Oписание: </label>
                    <article>
                        <textarea
                            name="description"
                            value={quoteInfo.description}
                            onChange={handleOnChange}
                        />
                    </article>
                </article>

                <article>
                    <label htmlFor="">Cad файл: </label>
                    <article>
                        <input type="file" onChange={handleOnFileChange} />
                    </article>

                </article>

                <article>
                    <button type="submit">Изпрати</button>
                </article>
            </form>
        </section>
    );
};

export default Quoting;
