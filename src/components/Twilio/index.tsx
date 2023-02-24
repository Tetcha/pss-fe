import { NextPage } from 'next';
import * as React from 'react';
import twilio from 'twilio';

interface TwilioVideoCallProps {
	token: any;
	room: any;
}

const TwilioVideoCall: NextPage<TwilioVideoCallProps> = () => {
	return <></>;
};

TwilioVideoCall.getInitialProps = async (ctx): Promise<TwilioVideoCallProps> => {
	const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
	const room = await client.video.rooms.create({ uniqueName: 'WAS' });
	const token = new twilio.jwt.AccessToken(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN, '', {
		identity: 'user',
	});

	return { token, room };
};

export default TwilioVideoCall;
