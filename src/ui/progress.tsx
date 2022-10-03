import { Progress as AntdProgress, ProgressProps } from 'antd';

export const Progress = (props: ProgressProps) => {
  return <AntdProgress {...props} />;
};
