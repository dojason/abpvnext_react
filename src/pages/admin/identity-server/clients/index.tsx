import React, { Component, useEffect, useRef, useState } from 'react';
import { PageHeaderWrapper, GridContent } from '@ant-design/pro-layout';
import { Badge, Button, Card, Col, Dropdown, Form, Input, Menu, Row, Select } from 'antd';
import { Dispatch, connect } from 'dva';
import { ClientWithDetailsDto, GetClientListInput } from './data.d';
import { ConnectState } from '@/models/connect';
import { useLocale, ConnectProps, useAccess, Access } from 'umi';
import { LanguageDto } from '@/pages/admin/localization/language/data';
import LanguageManagement from '@/pages/admin/localization/language/permissionName';
import { DownOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import ProTable, { ActionType, ProColumns } from '@ant-design/pro-table';
import _ from 'lodash';
import { useModel } from '@@/plugin-model/useModel';

const { Search } = Input;

interface IClientProps extends ConnectProps
{
  clients?: ClientWithDetailsDto[];
  isloading:boolean;
}

const Clients :React.FC<IClientProps> = (props)=>
{
  const { dispatch, clients,isloading } = props;
  const actionRef = useRef<ActionType>();
  const access = useAccess();
  const intl = useLocale("LanguageManagement");
  const { initialState } = useModel("@@initialState");
  const { localization } = initialState!;
  const [form] = Form.useForm();
  const [clientListInput, handleGetClientListInput] = useState<GetClientListInput>();
  useEffect(() => {
    dispatch({
      type:'identityClient/getIdentityClient',
      payload:clientListInput,
    });
  },[]);

  const queryHandler = ()=> {
    dispatch({
      type:'identityClient/getIdentityClient',
      payload:clientListInput,
    });
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
      dataIndex: 'clientName',
    }, {
      title: intl("CultureName"),
      dataIndex: 'clientName',
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
      <Card style={{ marginBottom: 10 }}>
        <Form initialValues={clientListInput} form={form} layout="vertical">
          <Row gutter={24}>
            <Col span={24}>
              <Search
                placeholder={intl("Filter")}
                enterButton={intl("Refresh")}
                onSearch={handleGetClientListInput}
              />
            </Col>
          </Row>
        </Form>
      </Card>
      <ProTable<ClientWithDetailsDto>
        headerTitle={intl("Languages")}
        actionRef={actionRef}
        search={false}
        loading={isloading}
        rowKey="id"
        pagination={true}
        dataSource={clients}
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

const mapStateToProps =({ identityClient,loading }:ConnectState) =>{
  return {
    clients:identityClient.clients,
    isloading:loading.effects["identityClient/getIdentityClient"]
}};``
export default connect(
  mapStateToProps
)(Clients);
