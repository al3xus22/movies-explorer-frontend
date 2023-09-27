import { useCallback, useState } from "react";
import isEmail from "validator/es/lib/isEmail";

export function useFormWithValidation(initialValues = {}) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    let emailError = "";

    switch (name) {
      case "name" :
        event.target.setCustomValidity(validateName(value));
        break;
      case "email" :
        emailError = !value ? "Введите Email" : (!isEmail(value) ? "Некорректный email" : "");
        event.target.setCustomValidity(emailError);
        break;
      case "password" :
        event.target.setCustomValidity(validatePassword(value));
        break;
      default:
        break;
    }

    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: event.target.validationMessage });
    setIsValid((event.target.closest("form").checkValidity()));
  };

  const resetForm = useCallback(
    (newValues = {}, newErrors = {}, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, errors, isValid, resetForm };
}

export const validateName = (name) => {
  if (!name) {
    return "Введите имя";
  }
  if (name.length < 2) {
    return "Длина имени минимум 2 символа";
  }
  if (name.length > 30) {
    return "Длина имени максимум 30 символов";
  }
  if (!/^[a-zA-Zа-яА-ЯёЁ\s-]+$/.test(name)) {
    return "Имя должно содержать только латиницу, кириллицу, пробел или дефис";
  }
  return "";
}

export const validateEmail = (email) => {
  if (!email) {
    return "Введите email";
  }
  if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
    return "Некорректный email";
  }
  return "";
};

export const validatePassword = (password) => {
  if (!password) {
    return "Введите пароль";
  }
  return "";
};