"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import useSWRMutation from "swr/mutation";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/organisms/form";
import { fetchClient } from "@/libs/fetch/client";
import { passwordEncrypt } from "@/utils/encryption/password";
import { exceptionClientHandler } from "@/utils/exception/client";
import { AUTH_LOGIN_FIELD_KEY } from "../_consts/form-field";
import {
  authLoginFormSchema,
  AuthLoginFormSchema,
} from "../_consts/form-schema";
import { AuthApiEndpoints } from "@/constants/api-endpoints/auth";
import { AuthLoginBody, AuthLoginResponse } from "@/types/api/auth";
import { toast } from "@/components/atoms/sonner";
import { Button } from "@mui/material";
import { InputText } from "@/components/atoms/input-text";
import { InputPassword } from "@/components/atoms/input-password";
import { useRouter } from "next/navigation";

export const LoginForm = () => {
  const router = useRouter();
  const form = useForm<AuthLoginFormSchema>({
    resolver: zodResolver(authLoginFormSchema),
    defaultValues: {
      [AUTH_LOGIN_FIELD_KEY.email]: "",
      [AUTH_LOGIN_FIELD_KEY.password]: "",
    },
  });

  const { trigger, isMutating } = useSWRMutation(
    AuthApiEndpoints.LOGIN,
    (key, { arg }: { arg: AuthLoginBody }) => {
      const formData = new FormData();

      Object.entries(arg).forEach(([key, value]) => {
        if (value !== null) formData.append(key, value);
      });

      return fetchClient<AuthLoginResponse>(key).post(formData);
    },
    {
      onSuccess: () => {
        router.replace("/");
      },
      onError: (err) => {
        exceptionClientHandler(err, () => {
          toast.error({ description: err.message });
        });
      },
      throwOnError: false,
    },
  );

  const handleLogin = (values: AuthLoginFormSchema) => {
    const email = values?.email;
    const password = passwordEncrypt(values?.password);

    const payload = {
      email,
      password,
    };

    trigger(payload);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleLogin)}>
        <fieldset disabled={isMutating}>
          <FormField
            control={form.control}
            name={AUTH_LOGIN_FIELD_KEY.email}
            render={({ field }) => {
              return (
                <FormItem className='mb-2'>
                  <FormControl>
                    <InputText placeholder='Email' fullWidth {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <FormField
            control={form.control}
            name={AUTH_LOGIN_FIELD_KEY.password}
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <InputPassword
                      fullWidth
                      placeholder='Password'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />
        </fieldset>

        <Button
          fullWidth
          sx={{ mt: 5 }}
          variant='contained'
          type='submit'
          loading={isMutating}
        >
          Login
        </Button>
      </form>
    </Form>
  );
};
