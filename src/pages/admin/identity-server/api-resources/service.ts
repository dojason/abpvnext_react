import request from "@/utils/request";
import {  GetApiResourceListInput,CreateApiResourceDto,ApiResourceWithDetailsDto,UpdateApiResourceDto } from "./data";
import { PagedResultDto } from '@/services/data';

export async function queryApiResource(params?: GetApiResourceListInput): Promise<any> {
  const api ='api/identity-server/api-resources';
  return request(api, {
    method: 'GET',
    params,
  });
}

export async function createApiResource(params?: CreateApiResourceDto): Promise<any> {
  const api ='api/identity-server/api-resources';
  return request(api, {
    method: 'POST',
    params,
  });
}

export async function deleteApiResource(id: string): Promise<any> {
  const api ='api/identity-server/api-resources';
  return request(api, {
    method: 'DELETE',
    id,
  });
}

export async function getApiResource(id: string): Promise<ApiResourceWithDetailsDto> {
  const api =`/api/identity-server/api-resources/${id}`;
  return request(api, {
    method: 'GET',
    id,
  });
}

export async function getAllApiResource(): Promise<ApiResourceWithDetailsDto[]> {
  const api =`api/identity-server/api-resources/all`;
  return request(api, {
    method: 'GET',
  });
}

export async function getListApiResource(input: GetApiResourceListInput): Promise<PagedResultDto<ApiResourceWithDetailsDto>> {
  const api =`api/identity-server/api-resources/all`;
  return request(api, {
    method: 'GET',
    input,
  });
}

export async function updateApiResource(id: string, input: UpdateApiResourceDto): Promise<PagedResultDto<ApiResourceWithDetailsDto>> {
  const api =`/api/identity-server/api-resources/${id}`;
  return request(api, {
    method: 'PUT',
    input,
  });
}
