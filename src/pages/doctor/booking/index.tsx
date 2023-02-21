import { NextPage } from 'next';
import { DoctorWrapper } from 'src/components/wrappers/doctorWrapper';
import { TableUtilProvider } from 'src/contexts/TableUtilContext';
import { BookingSlotListFilter } from 'src/interface/slots';
import { defaultPagingProps } from 'src/models/interface';
import BookingList from 'src/screens/Doctor/BookingList';
import { useStoreDoctor } from 'src/store';
import { objectHelper } from 'src/utils';

interface DoctorBookingPageProps {
	filters: BookingSlotListFilter;
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
		filters: objectHelper.getObjectWithDefault<Partial<BookingSlotListFilter>>(ctx.query, {
			...defaultPagingProps,
			id: '',
			status: '',
		}),
	};
};

export default DoctorBookingPage;
