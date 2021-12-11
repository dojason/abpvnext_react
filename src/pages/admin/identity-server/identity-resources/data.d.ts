import { ExtensibleObject, PagedAndSortedResultRequestDto,ExtensibleEntityDto } from '@/services/data';

export interface CreateIdentityResourceDto extends ExtensibleObject {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  claims: string[];
}

export interface GetIdentityResourceListInput extends PagedAndSortedResultRequestDto {
  filter: string;
}

export interface IdentityClaimDto {
  identityResourceId: string;
  type: string;
}

export interface IdentityResourceWithDetailsDto extends ExtensibleEntityDto<string> {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  userClaims: IdentityClaimDto[];
  properties: Record<string, string>;
}

export interface UpdateIdentityResourceDto extends ExtensibleObject {
  name: string;
  displayName: string;
  description: string;
  enabled: boolean;
  required: boolean;
  emphasize: boolean;
  showInDiscoveryDocument: boolean;
  claims: string[];
}
