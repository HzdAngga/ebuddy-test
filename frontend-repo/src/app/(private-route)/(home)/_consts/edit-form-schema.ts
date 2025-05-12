import { z } from "zod";
import { EDIT_USER_FORM_FIELD_KEY } from "./edit-form-field";

export const editUserFormSchema = z.object({
  [EDIT_USER_FORM_FIELD_KEY.name]: z
    .string({
      required_error: "Enter your name",
    })
    .trim()
    .min(1, "Enter your name"),
  [EDIT_USER_FORM_FIELD_KEY.totalAverageWeightRatings]: z.coerce
    .number()
    .min(0),
  [EDIT_USER_FORM_FIELD_KEY.numberOfRents]: z.coerce.number().min(0),
});

export type EditUserFormSchema = z.infer<typeof editUserFormSchema>;
