import { Empty } from '@ui/empty';

const NoResults = ({ description }: { description?: string }) => {
  return (
    <div>
      <Empty description={description || 'No Data'} />
    </div>
  );
};

export default NoResults;
