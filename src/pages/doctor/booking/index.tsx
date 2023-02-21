import { NextPage } from 'next';
import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { BookingListFilter } from 'src/interface/booking';
import { defaultPagingProps } from 'src/models/interface';
import BookingList from 'src/screens/Doctor/BookingList';
import { objectHelper } from 'src/utils';

interface DoctorBookingPageProps {
	filters: BookingListFilter;
}

const DoctorBookingPage: NextPage<DoctorBookingPageProps> = ({ filters }) => {
	return (
		<>
			<DoctorWrapper>
				<TableUtilProvider>
					<BookingList filters={filters} />
				</TableUtilProvider>
			</DoctorWrapper>
		</>
	);
};

DoctorBookingPage.getInitialProps = async (ctx): Promise<DoctorBookingPageProps> => {
	return {
		filters: objectHelper.getObjectWithDefault<Partial<BookingListFilter>>(ctx.query, {
			...defaultPagingProps,
			id: '',
			status: '',
		}),
	};
};

export default DoctorBookingPage;
