import FormItem from "@ui/formitem";
import { RadioGroup } from "@ui/radio";
import { Checkbox } from "antd";

type FilterComponentProps = { 
  options: Option[];
  type: string;
  name: string;
  label: string;
}

type Option = {
  label: string;
  value: string | number;
}
const CheckboxGroup = Checkbox.Group;

const FilterComponent = ({options,type,name,label}:FilterComponentProps)=>{
  return(
    <>
    <h3 className="font-medium uppercase bg-[#d5e0e6] py-2 px-5">{label}</h3>
      { type === 'radio' ? <RadioGroup className="my-3 flex flex-col" options={options} spaceProps={{direction: 'vertical'}} />:<CheckboxGroup className="my-3 flex flex-col" options={options}/>
      }
    </>
  )
}
export default FilterComponent;