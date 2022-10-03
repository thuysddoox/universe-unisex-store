import { Empty } from "@ui/empty";

const NoResults = ({description}:{description?: string})=>{
  return (
    <div>
      <Empty description={'false'} />;
      <h3>{description || 'No Data'}</h3>
    </div>
  )
}

export default NoResults;