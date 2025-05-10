import { type ClassValue, clsx } from 'clsx';

import { twMerge } from '@/configs/tailwind-merge';

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
