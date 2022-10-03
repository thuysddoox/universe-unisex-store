import { Typography } from 'antd';
import { TitleProps } from 'antd/lib/typography/Title';


/* eslint-disable-next-line */
export interface TextProps {
    className?: string;
}

export function Text(props: any) {
  return <Typography.Text {...props} />;
}

export function Title(props: TitleProps) {
  return <Typography.Title {...props} />;
}

export default Text;
