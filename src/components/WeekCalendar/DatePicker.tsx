import dateFnsGenerateConfig from 'rc-picker/lib/generate/dateFns';
import generatePicker from 'antd/lib/date-picker/generatePicker';

export const DatePicker = generatePicker<Date>(dateFnsGenerateConfig);

export default DatePicker;
