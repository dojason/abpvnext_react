import request from "@/utils/request";
import { CreateIdentityResourceDto, GetIdentityResourceListInput } from './data';

export async function createIdentityResource(params?: CreateIdentityResourceDto): Promise<any> {
  const api ='api/identity-server/identity-resources';
  return request(api, {
    method: 'POST',
    params,
  });
}

export async function getIdentityResourceList(params?: GetIdentityResourceListInput): Promise<any> {
  const api ='api/identity-server/identity-resources';
  return request(api, {
    method: 'GET',
    params,
  });
}

