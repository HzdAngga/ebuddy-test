import { extendTailwindMerge } from "tailwind-merge";

export const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "text-color": [
        {
          text: [
            "electric-violet-50",
            "electric-violet-100",
            "electric-violet-200",
            "electric-violet-300",
            "electric-violet-400",
            "electric-violet-500",
            "electric-violet-600",
            "electric-violet-700",
            "electric-violet-800",
            "electric-violet-900",
            "electric-violet-950",

            "aonia-blue-pink-50",
            "aonia-blue-pink-100",
            "aonia-blue-pink-200",
            "aonia-blue-pink-300",
            "aonia-blue-pink-400",
            "aonia-blue-pink-500",
            "aonia-blue-pink-600",
            "aonia-blue-pink-700",
            "aonia-blue-pink-800",
            "aonia-blue-pink-900",
            "aonia-blue-pink-950",

            "fuchsia-pink-50",
            "fuchsia-pink-100",
            "fuchsia-pink-200",
            "fuchsia-pink-300",
            "fuchsia-pink-400",
            "fuchsia-pink-500",
            "fuchsia-pink-600",
            "fuchsia-pink-700",
            "fuchsia-pink-800",
            "fuchsia-pink-900",
            "fuchsia-pink-950",
          ],
        },
      ],
    },
  },
});
