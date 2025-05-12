import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/organisms/form";
import { ApiUser, UpdateUserBody } from "@/types/api/user";
import {
  Box,
  Button,
  Modal,
  ModalProps,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useCallback, useMemo } from "react";
import { EDIT_USER_FORM_FIELD_KEY } from "../_consts/edit-form-field";
import {
  editUserFormSchema,
  EditUserFormSchema,
} from "../_consts/edit-form-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { InputText } from "@/components/atoms/input-text";
import { fetchClient } from "@/libs/fetch/client";
import useSWRMutation from "swr/mutation";
import { UsersApiEndpoints } from "@/constants/api-endpoints/users";
import { CommonResponse } from "@/types/common/response";
import { exceptionClientHandler } from "@/utils/exception/client";
import { toast } from "@/components/atoms/sonner";

type ModalPropsWithoutChildren = Omit<ModalProps, "children">;
type EditFormModalProps = {
  data: ApiUser | Record<string, unknown>;
  onSuccessUpdate: () => void;
} & ModalPropsWithoutChildren;
export const EditFormModal: React.FC<EditFormModalProps> = ({
  data,
  onSuccessUpdate,
  ...props
}) => {
  const isMobile = useMediaQuery("(max-width:599px)");
  const style = useMemo(
    () => ({
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: isMobile ? 300 : "50dvw",
      bgcolor: "#129990",
      border: "2px solid blue",
      boxShadow: 24,
      p: 4,
    }),
    [isMobile],
  );

  const form = useForm<EditUserFormSchema>({
    resolver: zodResolver(editUserFormSchema),
    defaultValues: {
      [EDIT_USER_FORM_FIELD_KEY.name]: (data?.name || "") as string,
      [EDIT_USER_FORM_FIELD_KEY.totalAverageWeightRatings]:
        (data?.totalAverageWeightRatings || 0) as number,
      [EDIT_USER_FORM_FIELD_KEY.numberOfRents]: (data?.numberOfRents ||
        0) as number,
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    UsersApiEndpoints.UPDATE,
    (key, { arg }: { arg: UpdateUserBody }) => {
      const formData = new FormData();

      Object.entries(arg).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value as string);
      });

      return fetchClient<CommonResponse>(key).put(formData);
    },
    {
      onSuccess: () => {
        onSuccessUpdate();
      },
      onError: (err) => {
        exceptionClientHandler(err, () => {
          toast.error({ description: err.message });
        });
      },
      throwOnError: false,
    },
  );

  const handleUpdate = useCallback(
    (values: EditUserFormSchema) => {
      const name = values?.name;
      const totalAverageWeightRatings = values?.totalAverageWeightRatings;
      const numberOfRents = values?.numberOfRents;

      const payload = {
        id: String(data?.id || ""),
        name,
        totalAverageWeightRatings,
        numberOfRents,
      };

      trigger(payload);
    },
    [data, trigger],
  );

  return (
    <Modal
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
      {...props}
    >
      <Box sx={{ ...style }}>
        <Typography
          sx={{ mb: 3 }}
          id='modal-modal-title'
          variant='h6'
          component='h2'
        >
          Edit User
        </Typography>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleUpdate)}>
            <fieldset disabled={isMutating}>
              <FormField
                control={form.control}
                name={EDIT_USER_FORM_FIELD_KEY.name}
                render={({ field }) => {
                  return (
                    <FormItem className='mb-2'>
                      <FormLabel required>Name</FormLabel>
                      <FormControl>
                        <InputText placeholder='Name' fullWidth {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={EDIT_USER_FORM_FIELD_KEY.totalAverageWeightRatings}
                render={({ field }) => {
                  return (
                    <FormItem className='mb-2'>
                      <FormLabel required>Rating</FormLabel>
                      <FormControl>
                        <InputText
                          type='number'
                          placeholder='Rating'
                          fullWidth
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name={EDIT_USER_FORM_FIELD_KEY.numberOfRents}
                render={({ field }) => {
                  return (
                    <FormItem className='mb-2'>
                      <FormLabel required>Rents</FormLabel>
                      <FormControl>
                        <InputText
                          type='number'
                          placeholder='Rents'
                          fullWidth
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </fieldset>

            <div className='flex justify-center mt-5'>
              <Button
                sx={{ mr: 2 }}
                fullWidth
                variant='contained'
                color='error'
                onClick={(e) => props?.onClose?.(e, "backdropClick")}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant='contained'
                type='submit'
                loading={isMutating}
              >
                Save
              </Button>
            </div>
          </form>
        </Form>
      </Box>
    </Modal>
  );
};
