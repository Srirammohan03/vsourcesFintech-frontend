import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Handles image loading errors by setting a fallback image
 * @param event - The error event from the img element
 * @param fallbackSrc - The fallback image source URL
 */
export function handleImageError(event: React.SyntheticEvent<HTMLImageElement, Event>, fallbackSrc: string) {
  const target = event.currentTarget;
  target.onerror = null; // Prevent infinite error loop
  target.src = fallbackSrc;
}

/**
 * Formats a number with commas for thousands
 * @param number - The number to format
 * @returns Formatted number string
 */
export function formatNumber(number: number): string {
  return new Intl.NumberFormat().format(number);
}

/**
 * Checks if a URL is valid
 * @param url - The URL to check
 * @returns Boolean indicating if URL is valid
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
