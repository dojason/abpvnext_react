import request from "@/utils/request";
import {  GetTemplateDefinitionListInput } from "./data";

export async function queryTemplatesDefinitions(params?: GetTemplateDefinitionListInput): Promise<any> {
  const api ='api/text-template-management/template-definitions';
  return request(api, {
    method: 'GET',
    params,
  });
}
