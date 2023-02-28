import { NextApiRequest, NextApiResponse } from 'next';
import Cors from 'cors';

const cors = Cors({
	origin: 'http://localhost:3001',
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
