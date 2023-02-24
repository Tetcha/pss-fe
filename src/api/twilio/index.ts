import { http } from 'src/config/axios';

export const createRoomToken = async (identity: string, roomName: string) => {
	return await http.post('/twilio/token', { user_identity: identity, room_name: roomName });
};
