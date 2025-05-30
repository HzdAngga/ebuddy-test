"use client";

import { CTTable } from "@/components/organisms/table";
import { AuthApiEndpoints } from "@/constants/api-endpoints/auth";
import { fetchClient } from "@/libs/fetch/client";
import { cn } from "@/libs/shadcn/utils";
import { exceptionServerHandler } from "@/utils/exception/server";
import { Alert, Button, Grid, Typography, useMediaQuery } from "@mui/material";
import { useCallback, useMemo, useState } from "react";
import useSWRMutation from "swr/mutation";
import { headCells } from "./_consts/table-head";
import { UsersApiEndpoints } from "@/constants/api-endpoints/users";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  errorFetch,
  loadingFetch,
  successFetch,
} from "@/store/features/userSlice";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { ApiUser, GetAllUsersReponse } from "@/types/api/user";
import { EditFormModal } from "./_components/EditFormModal";

export default function Home() {
  const router = useRouter();
  const isMobile = useMediaQuery("(max-width:599px)");
  const { loading, errMsg, success } = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();

  const [editModal, setEditModal] = useState({ open: false, data: {} });

  const { trigger: triggerLogout, isMutating: loadingLogout } = useSWRMutation(
    AuthApiEndpoints.LOGOUT,
    (key) => fetchClient(key).post(),
    {
      onSuccess: () => {
        router.replace("/login");
      },
      onError: (err) => exceptionServerHandler(err),
      throwOnError: false,
    },
  );
  const handleLogout = useCallback(() => triggerLogout(), [triggerLogout]);

  const { data, mutate: triggerFetchUsers } = useSWR(
    UsersApiEndpoints.GET_ALL,
    (key) => fetchClient(key).get(),
    {
      revalidateOnMount: false,
      onSuccess: () => {
        dispatch(successFetch());
      },
      onError: (err) => {
        dispatch(errorFetch("Error Fetch Users"));
        exceptionServerHandler(err);
      },
    },
  );
  const handleFetchUsers = useCallback(() => {
    dispatch(loadingFetch());
    triggerFetchUsers();
  }, [triggerFetchUsers, dispatch]);
  const bodyCells = useMemo(() => {
    const handleOnClickEdit = (el: ApiUser) => {
      setEditModal({ open: true, data: el });
    };
    return (
      (((data as Record<string, unknown>)?.data || {}) as GetAllUsersReponse)
        ?.users || []
    )?.map((el) => ({
      ...el,
      actions: (
        <Button onClick={() => handleOnClickEdit(el)} variant='contained'>
          Edit
        </Button>
      ),
    }));
  }, [data]) as unknown as Record<string, unknown>[];

  const handleCloseEditModal = useCallback(() => {
    setEditModal({ open: false, data: {} });
  }, []);

  const handleOnSuccessUpdate = useCallback(() => {
    dispatch(loadingFetch());
    triggerFetchUsers();
    handleCloseEditModal();
  }, [dispatch, handleCloseEditModal, triggerFetchUsers]);

  return (
    <div className='bg-gray-700 h-dvh'>
      <div className='flex justify-end bg-black mb-3 p-5'>
        <Button
          loading={loadingLogout}
          variant='contained'
          color='error'
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
      <main className='py-3 px-10'>
        <Grid sx={{ mb: 2 }} container spacing={2}>
          <Grid size={{ xs: 12, sm: 6 }}>
            <Typography sx={{ fontSize: "2rem", fontWeight: 800 }}>
              User List
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, sm: 6 }}>
            <div
              className={cn(
                "flex h-full justify-end",
                isMobile && "justify-center",
              )}
            >
              <Button
                sx={{ height: "100%" }}
                loading={loading}
                variant='contained'
                color='primary'
                onClick={handleFetchUsers}
              >
                Fetch Users
              </Button>
            </div>
          </Grid>
        </Grid>

        {success && <Alert severity='success'>Success Fetch!</Alert>}
        {loading && <Alert severity='warning'>Fetching Data</Alert>}
        {Boolean(errMsg) && <Alert severity='error'>Error Fetch!</Alert>}

        <CTTable
          id='user-list-table'
          headCells={headCells}
          bodyCells={bodyCells}
          maxHeight={500}
          total={0}
        />
      </main>
      {editModal.open && (
        <EditFormModal
          data={editModal?.data}
          open={editModal?.open}
          onClose={handleCloseEditModal}
          onSuccessUpdate={handleOnSuccessUpdate}
        />
      )}
    </div>
  );
}
