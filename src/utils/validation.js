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

const cyrillicChars = [
  "а", "б", "в", "г", "д", "е", "ё", "ж", "з", "и", "й", "к", "л", "м",
  "н", "о", "п", "р", "с", "т", "у", "ф", "х", "ц", "ч", "ш", "щ", "ъ",
  "ы", "ь", "э", "ю", "я",
];

export const validateEmail = (email) => {
  if (!email) {
    return "Введите email";
  }
  if (!/^([\w-]+(?:.[\w-]+))@((?:[\w-]+.)\w[\w-]{0,66}).([a-z]{2,6}(?:.[a-z]{2})?)$/i.test(email)) {
    return "Некорректный email";
  }
  if (cyrillicChars.some(char => email.includes(char))) {
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