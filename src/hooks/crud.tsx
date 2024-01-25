import { useState } from "react";

import {
  MutateOptions,
  MutationFunction,
  UseQueryResult,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { AxiosError } from "axios";

import { useProgressMutation, useProgressQuery } from "src/hooks/progress.tsx";
import {
  Notification,
  useNotification,
} from "src/stores/general/notification.ts";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api.ts";
import { MessageResponse } from "src/types/response.ts";

export {
  useCrud,
  useCrudQuery,
  useCrudCreateMutation,
  useCrudUpdateMutation,
  useCrudDeleteMutation,
  useCrudCustomMutation,
  useCrudMutationF,
};

export type { MutationParams };

interface MutationParams {
  id?: number;
}

function useCrud<T>() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState(new URLSearchParams());
  const [search, setSearch] = useState("");
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [current, setCurrent] = useState<T>();

  return {
    page,
    setPage,
    search,
    setSearch,
    filters,
    setFilters,
    updateModalOpen,
    setUpdateModalOpen,
    createModalOpen,
    setCreateModalOpen,
    filterModalOpen,
    setFilterModalOpen,
    current,
    setCurrent,
  };
}

interface UseCrudQueryParams<E, T> {
  apiFunction: (params: GetApiFunctionParams<E>) => T;
  name: string;
  page: number;
  search: string;
  filters: URLSearchParams;
  keepPrevious: boolean;
  extras: E;
}

function useCrudQuery<E, T>({
  apiFunction,
  name,
  page,
  search,
  filters,
  keepPrevious,
  extras,
}: UseCrudQueryParams<E, T>) {
  const query = useQuery({
    keepPreviousData: keepPrevious,
    queryKey: [name, page, search, filters.toString(), extras],
    queryFn: () => {
      return apiFunction({
        params: {
          page: page,
          search: search !== "" ? search : undefined,
          ...Object.fromEntries(filters),
        },
        extras: extras,
      });
    },
  });

  useProgressQuery(query, name);
  return query as UseQueryResult<Awaited<T>>;
}

interface UseCrudMutationOptions<ResponseType> {
  successNotification?: Notification;
  errorNotification?: Notification;
  onSuccess?: (response: ResponseType) => void;
  onError?: (error: AxiosError) => void;
}

interface UseCrudDeleteMutationOptions<MessageResponse> {
  successNotification?: Notification;
  errorNotification?: Notification;
  onSuccess?: (response: MessageResponse) => void;
  onError?: (error: AxiosError) => void;
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////
interface UseCrudMutationOptionsF<ResponseType, MessageResponse> {
  successNotification?: Notification;
  errorNotification?: Notification;
  onSuccess?: (response: ResponseType | MessageResponse) => void;
  onError?: (error: AxiosError) => void;
  customName?: string;
}

type ApiFunctionType<KindType, SchemaType, E> = KindType extends "create"
  ? CreateApiFunctionParams<SchemaType, E>
  : KindType extends "update"
  ? UpdateApiFunctionParams<SchemaType, E>
  : KindType extends "delete"
  ? DeleteApiFunctionParams<E>
  : PostApiFunctionParams<SchemaType, E>;

function useCrudMutationF<
  KindType extends "create" | "update" | "delete" | "custom",
  ResponseType,
  SchemaType,
  E,
>(
  apiFunction: (
    params: ApiFunctionType<KindType, SchemaType, E>,
  ) => Promise<ResponseType>,
  name: string,
  kind: KindType,
  options?: UseCrudMutationOptionsF<ResponseType, MessageResponse>,
) {
  const queryClient = useQueryClient();
  const addNotification = useNotification((state) => state.addNotification);

  const crudCreateMutationF = useMutation<
    ResponseType,
    AxiosError,
    ApiFunctionType<KindType, SchemaType, E>
  >({
    mutationFn: apiFunction as MutationFunction<
      ResponseType,
      ApiFunctionType<KindType, SchemaType, E>
    >,
    onSuccess: async (response: ResponseType | MessageResponse) => {
      if (options?.successNotification) {
        addNotification(options.successNotification);
      } else {
        addNotification({
          message: "Operación exitosa",
          code: "",
        });
      }
      await queryClient.invalidateQueries({ queryKey: [name] });
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      if (options?.errorNotification) {
        addNotification(options.errorNotification);
      } else {
        addNotification({
          message: "Error",
          code: "",
        });
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  function mutate(
    variables: ApiFunctionType<KindType, SchemaType, E>,
    options?: MutateOptions<
      ResponseType,
      AxiosError<unknown, any>,
      ApiFunctionType<KindType, SchemaType, E>,
      unknown
    >,
  ) {
    if (!crudCreateMutationF.isLoading) {
      crudCreateMutationF.mutate(variables, options);
    }
  }

  useProgressMutation(crudCreateMutationF, `${name}${options?.customName}`);
  return {
    ...crudCreateMutationF,
    mutate,
  };
}

/////////////////////////////////////////////////////////////////////////////////////////////////////////

function useCrudCreateMutation<SchemaType, ResponseType>(
  apiFunction: (data: SchemaType) => Promise<ResponseType>,
  name: string,
  options?: UseCrudMutationOptions<ResponseType>,
) {
  const queryClient = useQueryClient();
  const addNotification = useNotification((state) => state.addNotification);

  const crudCreateMutation = useMutation({
    mutationFn: apiFunction,
    onSuccess: async (response: ResponseType) => {
      if (options?.successNotification) {
        addNotification(options.successNotification);
      } else {
        addNotification({
          message: "Operación exitosa",
          code: "",
        });
      }
      await queryClient.invalidateQueries({ queryKey: [name] });
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      if (options?.errorNotification) {
        addNotification(options.errorNotification);
      } else {
        addNotification({
          message: "Error",
          code: "",
        });
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  useProgressMutation(crudCreateMutation, `${name}CreateMutation`);
  return crudCreateMutation;
}

function useCrudUpdateMutation<SchemaType, ResponseType>(
  apiFunction: (id: string | number, data: SchemaType) => Promise<ResponseType>,
  name: string,
  options?: UseCrudMutationOptions<ResponseType>,
) {
  const queryClient = useQueryClient();
  const addNotification = useNotification((state) => state.addNotification);

  const crudUpdateMutation = useMutation({
    mutationFn: async (data: MutationParams & SchemaType) => {
      if (!data.id) {
        throw new Error(`${name} is undefined`);
      }
      return await apiFunction(data.id, data);
    },
    onSuccess: async (response: ResponseType) => {
      if (options?.successNotification) {
        addNotification(options.successNotification);
      } else {
        addNotification({
          message: "Operación exitosa",
          code: "",
        });
      }
      await queryClient.invalidateQueries({ queryKey: [name] });
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      if (options?.errorNotification) {
        addNotification(options.errorNotification);
      } else {
        addNotification({
          message: "Error",
          code: "",
        });
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  useProgressMutation(crudUpdateMutation, `${name}UpdateMutation`);
  return crudUpdateMutation;
}

function useCrudDeleteMutation<T = number | string>(
  apiFunction: (params: T) => Promise<MessageResponse>,
  name: string,
  options?: UseCrudDeleteMutationOptions<MessageResponse>,
) {
  const queryClient = useQueryClient();
  const addNotification = useNotification((state) => state.addNotification);

  const crudDeleteMutation = useMutation({
    mutationFn: async (params?: T) => {
      if (!params) {
        throw new Error(`${name} is undefined`);
      }
      return await apiFunction(params);
    },
    onSuccess: async (response: MessageResponse) => {
      if (options?.successNotification) {
        addNotification(options.successNotification);
      } else {
        addNotification({
          message: "Operación exitosa",
          code: "",
        });
      }
      await queryClient.invalidateQueries({ queryKey: [name] });
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      if (options?.errorNotification) {
        addNotification(options.errorNotification);
      } else {
        addNotification({
          message: "Error",
          code: "",
        });
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  useProgressMutation(crudDeleteMutation, `${name}DeleteMutation`);
  return crudDeleteMutation;
}

function useCrudCustomMutation<SchemaType, ResponseType>(
  apiFunction: (id: string | number, data: SchemaType) => Promise<ResponseType>,
  name: string,
  customProgressId: string,
  options?: UseCrudMutationOptions<ResponseType>,
) {
  const queryClient = useQueryClient();
  const addNotification = useNotification((state) => state.addNotification);

  const crudCustomMutation = useMutation({
    mutationFn: async (data: MutationParams & SchemaType) => {
      if (!data.id) {
        throw new Error(`${name} is undefined`);
      }
      return await apiFunction(data.id, data);
    },
    onSuccess: async (response: ResponseType) => {
      if (options?.successNotification) {
        addNotification(options.successNotification);
      } else {
        addNotification({
          message: "Operación exitosa",
          code: "",
        });
      }
      await queryClient.invalidateQueries({ queryKey: [name] });
      if (options?.onSuccess) {
        options.onSuccess(response);
      }
    },
    onError: (error: AxiosError) => {
      const errorData: any = error.response?.data;
      if (errorData.error.message) {
        addNotification({
          message: errorData.error.message,
          code: errorData.error.code,
        });
        return;
      }
      if (options?.errorNotification) {
        addNotification(options.errorNotification);
      } else {
        addNotification({
          message: "Error",
          code: "",
        });
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  useProgressMutation(crudCustomMutation, customProgressId);
  return crudCustomMutation;
}
