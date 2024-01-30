import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const capitalize = (word: string) => {
  if (word) {
    return word[0].toUpperCase() + word.slice(1)
  }
}

// Remove extra spaces, add coma after each ingredient and capitalize only the first ingredient
export const formatIngredients = (ingredients: string): string => {
  let ingredientsFormatted = ingredients.split(',').map(mot => mot.trim());
  if (ingredientsFormatted.length > 0) {
    ingredientsFormatted[0] = ingredientsFormatted[0][0].toUpperCase() + ingredientsFormatted[0].slice(1);
  }
  return ingredientsFormatted.join(', ');
}

function removeAccents(input: string) {
  return input
    .normalize("NFD")  // Normalise la chaîne en Unicode NFD
    .replace(/[\u0300-\u036f]/g, "");  // Supprime les caractères diacritiques (accents)
}

export const createSlug = (restaurant_name: string) => {
  // Remplace les caractères spéciaux et les espaces par des tirets
  const withoutAccents = removeAccents(restaurant_name);

  if (withoutAccents) {
    const slug = withoutAccents
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')  // Supprime les caractères spéciaux sauf les tirets et les espaces
      .replace(/\s+/g, '-')         // Remplace les espaces par des tirets
      .replace(/-+/g, '-')          // Gère les tirets en double
      .replace(/^-+|-+$/g, '');     // Supprime les tirets au début et à la fin

    return slug;
  }
}

// Add a space every 2 characters for the phone number
export const addSpaceToPhoneNumber = (phone: string): string => {
  const phoneNumberWithSpaceRemoved = phone?.replace(/\s/g, '');

  let phoneFormated = '';
  for (let i = 0; i < phoneNumberWithSpaceRemoved?.length; i += 2) {
    phoneFormated += phoneNumberWithSpaceRemoved?.slice(i, i + 2);
    if (i + 2 < phoneNumberWithSpaceRemoved?.length) {
      phoneFormated += ' ';
    }
  }

  return phoneFormated;
}

// Return the time with "h" instead of ":" between hour and minutes
export const formatTime = (time: string): string => {
  if (time) {
    const timeArray = time.split(':')
    return `${timeArray[0]}h${timeArray[1]}`
  }
  return time
}

// Concat Zou + plan name + date to make the invoice name
export const formatInvoiceName = (plan: string, startDate: string, endDate: string): string => {
  return `Zou-${plan.toLowerCase()}-${formatDate(startDate)}-${formatDate(endDate)}.pdf`
}

// Remove tirets from the date format
export const formatDate = (date: string): string => {
  return date.replaceAll('-', '')
}

// Replace a log name file with a shorter one with keeping the extension file
export const truncateFileName = (name: string, maxLength: number): string => {
  if (name.length <= maxLength) {
    return name;
  } else {
    const fileExtension = name.split('.').pop();

    if (fileExtension) {
      const fileNameWithoutExtension = name.slice(0, -(fileExtension.length + 1));
      if (fileNameWithoutExtension) {
        const truncatedFileName = fileNameWithoutExtension.slice(0, maxLength - 3) + "...";
        return truncatedFileName + "." + fileExtension;
      }
    }
  }
  return name
}

export const formatCurrency = (amount: number) => {
  return amount.toLocaleString('fr', {
    style: 'currency',
    currency: 'EUR',
  });
};

// Return full day with time, ex: "10/12/2023 à 15h23"
export const formatFullDay = (date: string) => {
  const dateObject = new Date(date);
  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${day}/${month}/${year} à ${hours}h${minutes}`
}