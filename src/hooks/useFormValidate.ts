import { Dispatch, useMemo, useState } from "react";

type FromValidate = 'email' | "password"

export const useFormValidate = (type: FromValidate): [string, Dispatch<React.SetStateAction<string>>, string] => {

    const [value, setValue] = useState<string>('');

    const error = useMemo(() => {
        switch (type) {
            case "email": {
                if (value === '') {
                    return '';
                }
                const reg = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
                const result = value.match(reg);
                if (!result) {
                    return "Please enter email";
                }

                return "";
            }
            case "password": {
                if (value === '') {
                    return '';
                }
                if (value.length < 8) {
                    return "Password must more than 8 charactor";
                }
                return "";
            }
        }
    }, [type, value]);


    return [
        value as string,
        setValue as Dispatch<React.SetStateAction<string>>,
        error as string,
    ]
}