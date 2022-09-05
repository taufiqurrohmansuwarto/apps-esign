import { BellOutlined } from "@ant-design/icons";
import { Badge, Tooltip } from "antd";
import React from "react";

function BadgeNotifications() {
  return (
    <Tooltip title="Notifikasi">
      <Badge size="small" dot={3}>
        <BellOutlined />
      </Badge>
    </Tooltip>
  );
}

export default BadgeNotifications;
