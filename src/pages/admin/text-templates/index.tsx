import React, { Component, useEffect, useRef } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Badge, Button, Dropdown, Menu } from 'antd';
import { Dispatch, connect } from 'dva';
import {  TemplateDefinitionDto } from './data.d';
import { ConnectState } from '@/models/connect';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import { Access, useAccess } from '@@/plugin-access/access';
import { useLocale } from '@@/plugin-abp-locale/locale';
import { LanguageDto } from '@/pages/admin/localization/language/data';
import TextTemplateManagement from '@/pages/admin/text-templates/permissionName';
import { DownOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { ClientWithDetailsDto } from '@/pages/admin/identity-server/clients/data';

interface ITextTemplatesProps
{
  dispatch:Dispatch;
  TemplateDefinitions?: TemplateDefinitionDto[];
}

const TextTemplates :React.FC<ITextTemplatesProps> = (props)=>
{
  const { dispatch, TemplateDefinitions } = props;
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const intl = useLocale("LanguageManagement");

  useEffect(() => {
    dispatch({
      type:'textTemplate/getTextTemplatesDefinitions',
      payload:null,
    })
  },[]);

  const handleEdit = (record:LanguageDto)=>{

  }

  const handlDeleteUser = (id:string)=>{

  }

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
                access[TextTemplateManagement.Edit] ?
                  <Menu.Item key="edit"
                             onClick={() => handleEdit(record)}>{intl("Edit")}
                  </Menu.Item> : null
              }
              {
                access[TextTemplateManagement.Delete] ?
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
      <ProTable<TemplateDefinitionDto>
        headerTitle={intl("文本模版")}
        actionRef={actionRef}
        search={false}
        rowKey="id"
        pagination={true}
        dataSource={TemplateDefinitions}
        toolBarRender={() => [
          <Access accessible={access[TextTemplateManagement.Create]}>
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

const mapStateToProps =({ textTemplate }:ConnectState) =>{
  return {
    TemplateDefinitions:textTemplate.TemplateDefinitions
  }};
export default connect(
  mapStateToProps
)(TextTemplates);
