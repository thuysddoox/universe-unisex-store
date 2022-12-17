type CardStatisticProps = {
  name: string;
  value: string;
  icon?: React.ReactElement | React.ReactNode;
  className?: string;
};
const CardStatistic = ({ icon, name, value, className }: CardStatisticProps) => {
  return (
    <>
      <div className={`${className} px-4 sm:px-6 py-8 bg-white flex items-center justify-between shadow`}>
        <div className="text-center">
          {name === 'ALL RATE' ? (
            +value === 0 ? (
              <h3 className="italic text-sm py-2">No reviews yet</h3>
            ) : (
              <h3 className="text-2xl">{value}/5</h3>
            )
          ) : (
            <h3 className="text-2xl">{value?.toString()}</h3>
          )}
          <h5 className="uppercase text-gray-700">{name}</h5>
        </div>
        {icon}
      </div>
    </>
  );
};
export default CardStatistic;
