import { Empty as AntdEmpty, EmptyProps } from "antd"

export const Empty = (props: EmptyProps) => {
  return <AntdEmpty image={AntdEmpty.PRESENTED_IMAGE_SIMPLE} {...props} />;
};