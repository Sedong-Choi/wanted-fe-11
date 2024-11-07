import { useMemo, useState } from "react";
import { useFormValidate } from "./useFormValidate";

export const useSignUpForm = () => {
    const [email, setEmail, errorEmail] = useFormValidate('email');
    const [password, setPassword, errorPassword] = useFormValidate('password');

    const [confirmPass, setConfirmPass] = useState('');

    const errorConfirm = useMemo(() => {
        if (confirmPass !== '' && password !== confirmPass) {
            return "Passwords do not match";
        }
        return "";
    }, [confirmPass, password]);

    const disabled = !(email !== ''
        && password !== ''
        && confirmPass !== ''
        && errorEmail === ''
        && errorPassword === ''
        && errorConfirm === '');

    return {
        email,
        setEmail,
        errorEmail,
        password,
        setPassword,
        errorPassword,
        confirmPass,
        setConfirmPass,
        errorConfirm,
        disabled
    }
}