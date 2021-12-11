import React, { Component, useEffect, useRef } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Badge, Button, Dropdown, Menu } from 'antd';
import { Dispatch, connect } from 'dva';
import { ConnectState } from '@/models/connect';
import { ApiResourceWithDetailsDto } from '@/pages/admin/identity-server/api-resources/data';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { LanguageDto } from '@/pages/admin/localization/language/data';
import LanguageManagement from '@/pages/admin/localization/language/permissionName';
import { DownOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Access, useAccess } from '@@/plugin-access/access';
import { useLocale } from '@@/plugin-abp-locale/locale';
import { ClientWithDetailsDto } from '@/pages/admin/identity-server/clients/data';

interface IApiResource
{
  dispatch:Dispatch;
  apiSources:ApiResourceWithDetailsDto[];

}
const ApiResources :React.FC<IApiResource> = (props)=>
{
  const { dispatch, apiSources } = props;
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const intl = useLocale("LanguageManagement"); //LanguageManagement

  useEffect(() => {
    dispatch({
      type:'apiResource/getApiResource',
      payload:null,
    });
  },[]);

  const columns: ProColumns<LanguageDto>[] = [
    {
      title: intl("Actions"),
      render: (_, record) =>
        <Dropdown
          overlay={
            <Menu
              selectedKeys={[]}
            >
              {
                access[LanguageManagement.Edit] ?
                  <Menu.Item key="edit"
                             onClick={() => handleEdit(record)}>{intl("Edit")}
                  </Menu.Item> : null
              }
              {
                access[LanguageManagement.Delete] ?
                  <Menu.Item key="remove"
                             onClick={() => handlDeleteUser(record.id)}>{intl("Delete")}
                  </Menu.Item> : null
              }
            </Menu>
          }
        >
          <Button type="primary">
            <SettingOutlined /> {intl("Actions")} <DownOutlined />
          </Button>
        </Dropdown>
    },
    {
      title: intl("DisplayName"),
      dataIndex: 'displayName',
    }, {
      title: intl("CultureName"),
      dataIndex: 'cultureName',
    }, {
      title: intl("UiCultureName"),
      dataIndex: 'uiCultureName',
    }, {
      title: intl("IsEnabled"),
      dataIndex: 'isEnabled',
      render: (text, record) => {
        return record.isEnabled ? <Badge status="success" text={intl("Yes")} /> : <Badge status="default" text={intl("No")} />
      }
    },
  ];

  return (
    <>
      <ProTable<ApiResourceWithDetailsDto>
        headerTitle={intl("Languages")}
        actionRef={actionRef}
        search={false}
        rowKey="id"
        pagination={false}
        dataSource={apiSources}
        toolBarRender={() => [
          <Access accessible={access[LanguageManagement.Create]}>
            <Button icon={<PlusOutlined />} type="primary" >
              {intl("CreateNewLanguage")}
            </Button>
          </Access>
        ]}
        columns={columns}
      />
    </>
  );
};
const mapStateToProps =({ apiResource }:ConnectState) =>{
  return {
    apiSources:apiResource.apiResources
}};
export default connect(mapStateToProps)(ApiResources);;
