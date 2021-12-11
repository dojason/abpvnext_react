import request from "@/utils/request";
import {  GetClientListInput } from "./data";

export async function queryClients(params?: GetClientListInput): Promise<any> {
  const api ='api/identity-server/clients';
  return request(api, {
    method: 'GET',
    params,
  });
}
