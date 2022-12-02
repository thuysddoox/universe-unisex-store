import TableJob from '@components/Table/TableJob';
import Button from '@ui/button';

const ManageJobs = () => {
  return (
    <>
      <Button
        borderradius={'3px'}
        size="small"
        borderless={true}
        bgColor="rgba(16, 185, 129,1)"
        textcolor="#fff"
        className="font-medium my-4"
        bordercolor={'rgba(16, 185, 129,1)'}
      >
        Add +
      </Button>
      <TableJob />
    </>
  );
};
export default ManageJobs;
