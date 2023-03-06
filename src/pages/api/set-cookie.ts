import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';
import { ENV_VARIABLES } from 'src/constants/env';

const cors = Cors({
	origin: ENV_VARIABLES.CALL_URL,
	methods: ['GET', 'POST', 'PUT', 'DELETE'],
});

export default function handler(req: NextApiRequest, res: NextApiResponse) {
	return new Promise((resolve, reject) => {
		cors(req, res, () => {
			const { token } = req.body;

			// Set the "access-token" in a cookie with a domain of ".localhost"
			res.setHeader('Set-Cookie', `access-token=${token}; Domain=.localhost; Path=/; HttpOnly;`);
			res.status(200).json({ success: true });
		});
	});
}
