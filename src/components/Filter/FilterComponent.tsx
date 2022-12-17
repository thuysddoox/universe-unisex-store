import FormItem from '@ui/formitem';
import { RadioGroup } from '@ui/radio';
import { Select } from '@ui/select';
import { Checkbox } from 'antd';
import { options } from '../Statistic/Chart/index';
import { SafeAny } from '@interfaces/common';

type FilterComponentProps = {
  options: Option[];
  type: string;
  name: string;
  label: string;
  onChange: SafeAny;
  filter?: SafeAny;
};

type Option = {
  label: string;
  value: string | number;
};
const CheckboxGroup = Checkbox.Group;

const FilterComponent = ({ options, type, name, label, onChange, filter }: FilterComponentProps) => {
  return (
    <>
      <h3 className="font-medium uppercase bg-[#d5e0e6] py-2 px-5">{label}</h3>
      {type === 'radio' ? (
        <RadioGroup
          onChange={(e) => onChange(name, e?.target?.value)}
          className="my-3 flex flex-col"
          options={options}
          value={filter?.[name] ?? ''}
          spaceProps={{ direction: 'vertical' }}
        />
      ) : type === 'checkbox' ? (
        <CheckboxGroup
          value={filter?.[name] ?? []}
          onChange={(value) => onChange(name, value)}
          className="my-3 flex flex-col"
          options={options}
        />
      ) : (
        <Select
          defaultActiveFirstOption
          // value={filter?.[name]}
          onChange={(value) => onChange(name, value)}
          borderradius={0}
          options={options}
          value={filter?.[name] ?? 'All'}
        />
      )}
    </>
  );
};
export default FilterComponent;
