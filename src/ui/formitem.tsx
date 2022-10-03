import { Form as AntdForm, FormItemProps } from 'antd';

export function FormItem(props: FormItemProps) {
  return <AntdForm.Item {...props} />;
}

export default FormItem;
