import { HabitWrapperVertical } from '../../components/habitWrapperVertical';
import { habitWrapperData } from '../../data/homeStaticData';

const NewList = () => {
  return (
    <div>
      <div>
        <HabitWrapperVertical
          habitWrapperTitle="실시간 인기 습관"
          habitWrapperData={habitWrapperData}
        />
      </div>
    </div>
  );
};

export default NewList;
