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
  return "";
}

export const validateEmail = (email) => {
  if (!email) {
    return "Введите email";
  }
  if (!/\S+@\S+\.\S+/.test(email)) {
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