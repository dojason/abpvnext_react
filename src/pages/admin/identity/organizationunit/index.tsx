import { PageHeaderWrapper } from '@ant-design/pro-layout';
import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Tree, Button, message, Tabs, Table } from 'antd';
import { useRequest } from '@umijs/hooks';
import { contextMenu, Menu, Item } from 'react-contexify';
import { getOrganizationUnits, deleteOrganizationUnit, getOrganizationunitUsers } from './service';
import { OrganizationUnitDto, CreateOrUpdateOrganizationUnitInput } from './data';
import { createTree } from '@/utils/utils';
import CreateOrUpdateForm from './components/createOrUpdateForm';
import 'react-contexify/dist/ReactContexify.min.css';
import PermissionManagement from '@/components/PermissionsManagement';
import { ConnectProps } from '@/models/connect';
import { GetPermissionListResultDto } from '@/services/data';
import { PlusOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;
const { DirectoryTree } = Tree;
const initEmptyOrganizationUnit: CreateOrUpdateOrganizationUnitInput = {
  displayName: "",
  parentId: "",
  id: "",
}
interface OrganizationUnitProps extends ConnectProps {
  permissions: GetPermissionListResultDto;
}
const OrganizationUnit: React.FC<OrganizationUnitProps> = ({ permissions, dispatch }) => {
  const [modalVisible, handleModalVisible] = useState<boolean>(false);

  const [organizations, setOrganizationUnit] = useState<OrganizationUnitDto[]>([]);
  const [organizationUnitItem, setOrganizationUnitItem] = useState<CreateOrUpdateOrganizationUnitInput>(initEmptyOrganizationUnit);
  const [permissionModalVisible, handlePermissionModalVisible] = useState<boolean>(false);

  const { run: doGetData } = useRequest(getOrganizationUnits, {
    manual: true,
    onSuccess: (result) => {
      setOrganizationUnit(result.items)
    }
  });
  useEffect(() => {
    doGetData();
  }, []);

  const treeData = createTree(organizations, "parentId", "id", null, "children", [{
    target: 'key',
    targetFunction(item: OrganizationUnitDto) {
      return item.id;
    },
  }, {
    target: 'title',
    targetFunction(item: OrganizationUnitDto) {
      return item.displayName;
    }
  }]);
  const treeRightClickHandler = async (info: any) => {
    info.event.persist();
    const { data } = info.node;
    await setOrganizationUnitItem({ displayName: data.displayName, parentId: data.parentId, id: data.id })
    contextMenu.show({
      id: 'rightMenu',
      event: info.event,
    });
  }
  const handleAddChildren = async () => {
    await setOrganizationUnitItem({ ...initEmptyOrganizationUnit, parentId: organizationUnitItem.id! })
    await handleModalVisible(true)
  }
  const { run: doDeleteItem } = useRequest(deleteOrganizationUnit, {
    manual: true,
    onSuccess: () => {
      message.success("????????????!");
    }
  });
  const { run: doGetOrganizationUnitUsers } = useRequest(getOrganizationunitUsers, {
    manual: true,
  });
  const handleCreate = async () => {
    await setOrganizationUnitItem(initEmptyOrganizationUnit)
    await handleModalVisible(true)
  }

  const handleDeleteItem = async () => {
    await doDeleteItem(organizationUnitItem.id!);
    await doGetData();
  }
  const RightClientMenu = () => (
    <Menu style={{ zIndex: 1000 }} id="rightMenu">
      <Item key="edit" onClick={() => handleModalVisible(true)}>
        ??????
      </Item>
      <Item onClick={() => handlePermissionModalVisible(true)} >
        ??????
   </Item>
      <Item onClick={handleAddChildren} >
        ???????????????
     </Item>

      <Item onClick={handleDeleteItem}>
        ??????
      </Item>
    </Menu>
  );
  const organizationUnitUserTableColumns = [
    {
      title: '??????',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => <Button icon="close-circle" type="primary">??????</Button>,
    },
    {
      title: '?????????',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '????????????',
      dataIndex: 'addedTime',
      key: 'addedTime',
    },
  ];
  const organizationUnitRoleTableColumns = [
    {
      title: '??????',
      dataIndex: 'action',
      key: 'action',
      render: (text: any, record: any) => <Button icon="close-circle" type="primary">??????</Button>,
    },
    {
      title: '??????',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '????????????',
      dataIndex: 'addedTime',
      key: 'addedTime',
    },
  ]
   const selectTree = async (selectedKeys: any[],info:any) => {
    const { data } = info.node;
    doGetOrganizationUnitUsers(data.id,{})
    await setOrganizationUnitItem({ displayName: data.displayName, parentId: data.parentId, id: data.id })
  }

  return (
    <PageHeaderWrapper>
      <Row gutter={24}>
        <Col span={8}>
          <Card title="???????????????" extra={<Button   icon={<PlusOutlined />} onClick={handleCreate} type="primary">???????????????</Button>}>
            <DirectoryTree
              onSelect={selectTree}
              treeData={treeData}
              onRightClick={treeRightClickHandler}
            />
            <RightClientMenu />
          </Card>
        </Col>
        <Col span={16}>
          <Card title="????????????">
            <Tabs type="card" >
              <TabPane tab="????????????" key="member">
                {
                  organizationUnitItem.id === "" ? (<p>????????????????????????</p>) :
                    (<><Col style={{ textAlign: 'right' }}>
                      <Button icon={<PlusOutlined />} type="primary">??????????????????</Button>
                    </Col>
                      <Table
                        dataSource={
                          []
                        }
                        columns={organizationUnitUserTableColumns} />
                    </>)

                }
              </TabPane>
              <TabPane tab="??????" key="role">
                {
                  organizationUnitItem.id === "" ? (<p>??????????????????</p>) :
                    (<div>   <Col style={{ textAlign: 'right' }}>
                      <Button icon={<PlusOutlined />} type="primary">????????????</Button>
                    </Col>
                      <Table
                        dataSource={
                          []
                        }
                        columns={organizationUnitRoleTableColumns} />
                    </div>)
                }
              </TabPane>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <CreateOrUpdateForm
        onSubmit={() => doGetData()}
        onCancel={() => handleModalVisible(false)}
        visible={modalVisible}
        organizationUnit={organizationUnitItem}
      />
      <PermissionManagement
        providerKey={organizationUnitItem.id!}
        providerName='O'
        onCancel={() => handlePermissionModalVisible(false)}
        modalVisible={permissionModalVisible}
      />
    </PageHeaderWrapper>
  )
}
export default OrganizationUnit;
