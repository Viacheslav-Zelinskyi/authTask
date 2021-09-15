import { Table, Button } from "antd";
import { useEffect, useState } from "react";
import {
  getUsersArr,
  deleteUsersFetch,
  blockUser,
  unblockUser,
} from "../../api";

const UsersPage = () => {
  const [hasSelected, setSelected] = useState(false);
  const [selectedId, setSelectedId] = useState();
  const [users, setUsers] = useState();

  const select = {
    onChange: (selectedRowKeys, selectedRows) => {
      if (selectedRowKeys.length > 0) setSelected(true);
      else setSelected(false);
      setSelectedId(selectedRows.map((it) => it.social_id));
    },
  };
  useEffect(() => {
    getUsersArr().then((i) => setUsers(i));
  }, []);

  return (
    <div>
      <h1>Users</h1>
      <Button
        type="primary"
        disabled={!hasSelected}
        style={{ margin: "5px" }}
        onClick={() => unblockUser(selectedId)}
      >
        Unblock
      </Button>
      <Button
        type="primary"
        disabled={!hasSelected}
        danger
        style={{ margin: "5px" }}
        onClick={() => blockUser(selectedId)}
      >
        Block
      </Button>
      <Button
        type="primary"
        disabled={!hasSelected}
        danger
        style={{ margin: "5px" }}
        onClick={() => deleteUsersFetch(selectedId)}
      >
        Delete
      </Button>
      <Table rowSelection={select} columns={columns} dataSource={users} />
    </div>
  );
};

export default UsersPage;

const columns = [
  {
    title: "ID",
    dataIndex: "social_id",
    sorter: (a, b) => (a.social_id < b.social_id ? -1 : 1),
  },
  {
    title: "Name",
    dataIndex: "name",
    sorter: (a, b) => (a.name < b.name ? -1 : 1),
  },
  {
    title: "Social network",
    dataIndex: "social_network",
    filters: [
      { text: "Facebook", value: "facebook" },
      { text: "Google", value: "google" },
    ],
    onFilter: (value, record) => record.social_network.indexOf(value) === 0,
    sorter: (a, b) => (a.social_network < b.social_network ? -1 : 1),
  },
  {
    title: "First log in",
    dataIndex: "firstlogin",
    sorter: (a, b) => (a.firstlogin < b.firstlogin ? -1 : 1),
  },
  {
    title: "Last log in",
    dataIndex: "lastlogin",
    sorter: (a, b) => (a.lastlogin < b.lastlogin ? -1 : 1),
  },
  {
    title: "Status",
    dataIndex: "status",
    filters: [
      { text: "Active", value: "Active" },
      { text: "Blocked", value: "Blocked" },
    ],
    onFilter: (value, record) => record.status.indexOf(value) === 0,
    sorter: (a, b) => (a.status < b.status ? -1 : 1),
  },
];
