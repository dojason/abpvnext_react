import { ExtensibleEntityDto, ExtensibleObject,PagedAndSortedResultRequestDto } from '@/services/data';

export interface ApiResourceClaimClaimDto {
  apiResourceId: string;
  type: string;
}

export interface ApiResourceWithDetailsDto extends ExtensibleEntityDto<string> {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  userClaims: ApiResourceClaimClaimDto[];
  properties: Record<string, string>;
  scopes: ApiScopeDto[];
  secrets: ApiSecretDto[];
}

export interface ApiScopeClaimDto {
  apiResourceId: string;
  name: string;
  type: string;
}

export interface ApiScopeDto {
  apiResourceId: string;
  name: string;
  displayName: string;
  description: string;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  userClaims: ApiScopeClaimDto[];
}

export interface ApiSecretDto {
  apiResourceId: string;
  type: string;
  value: string;
  description: string;
  expiration?: string;
}

export interface CreateApiResourceDto extends ExtensibleObject {
  name: string;
  displayName: string;
  description: string;
  claims: string[];
}

export interface GetApiResourceListInput extends PagedAndSortedResultRequestDto {
  filter: string;
}

export interface UpdateApiResourceDto extends ExtensibleObject {
  displayName: string;
  description: string;
  enabled: boolean;
  claims: string[];
  scopes: ApiScopeDto[];
  secrets: ApiSecretDto[];
}
