import { useMemo, useState } from "react";
import { useFormValidate } from "./useFormValidate";

export const useSignUpForm = () => {
    const [id, setId, errorId] = useFormValidate('email');
    const [password, setPassword, errorPassword] = useFormValidate('password');

    const [confirmPass, setConfirmPass] = useState('');

    const errorConfirm = useMemo(() => {
        if (password !== confirmPass) {
            return "Passwords do not match";
        }
        return "";
    }, [confirmPass, password]);

    const disabled = !(id !== ''
        && password !== ''
        && confirmPass !== ''
        && errorId === ''
        && errorPassword === ''
        && errorConfirm === '');

    return {
        id,
        setId,
        errorId,
        password,
        setPassword,
        errorPassword,
        confirmPass,
        setConfirmPass,
        errorConfirm,
        disabled
    }
}