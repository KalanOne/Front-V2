import { http } from "src/api/api";
import {
  CreateApiFunctionParams,
  DeleteApiFunctionParams,
  GetApiFunctionParams,
  IdApiExtras,
  PostApiFunctionParams,
  UpdateApiFunctionParams,
} from "src/types/api";
import { MessageResponse, PaginatedResponse } from "src/types/response";

import {
  ProviderCreateData,
  ProviderResponse,
  ProviderStatusData,
  ProviderUpdateData,
} from "../types/providerTypes";

export {
  getProviders,
  createProvider,
  updateProvider,
  deleteProvider,
  providerStatus,
};

async function getProviders(
  params: GetApiFunctionParams,
): Promise<PaginatedResponse<ProviderResponse>> {
  return await http<PaginatedResponse<ProviderResponse>>({
    method: "GET",
    path: "provider",
    params: params.params,
  });
}

async function createProvider(
  params: CreateApiFunctionParams<ProviderCreateData>,
): Promise<ProviderResponse> {
  return await http<ProviderResponse>({
    method: "POST",
    path: `provider`,
    data: params.data,
  });
}

async function updateProvider(
  params: UpdateApiFunctionParams<ProviderUpdateData>,
): Promise<ProviderResponse> {
  return await http<ProviderResponse>({
    method: "PUT",
    path: `provider/${params.id}`,
    data: params.data,
  });
}

async function deleteProvider(
  params: DeleteApiFunctionParams,
): Promise<MessageResponse> {
  return await http<MessageResponse>({
    method: "DELETE",
    path: `provider/${params.id}`,
  });
}

async function providerStatus(
  params: PostApiFunctionParams<ProviderStatusData>,
) {
  return await http<MessageResponse>({
    method: "PUT",
    path: `provider/${params.id}/status`,
    data: params.data,
  });
}
