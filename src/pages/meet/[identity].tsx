import React, { useEffect, useRef, useState } from 'react';
import { LocalVideoTrack, Room, RemoteParticipant, createLocalTracks, connect } from 'twilio-video';
import { toast } from 'react-toastify';
import { NextPage, NextPageContext } from 'next';
import { createRoomToken } from 'src/api/twilio';
import { http } from 'src/config/axios';

interface MeetPageProps {
	roomName: string;
	identity: string;
}

const MeetPage: NextPage<MeetPageProps> = ({ roomName, identity }) => {
	const [room, setRoom] = useState<Room>();
	const [localTrack, setLocalTrack] = useState<LocalVideoTrack>();
	const [remoteParticipants, setRemoteParticipants] = useState<RemoteParticipant[]>([]);
	const [warning, setWarning] = useState('');

	const localVideoRef = useRef<HTMLVideoElement>(null);
	const remoteVideoRefs = useRef<HTMLVideoElement[]>([]);

	const participantDisconnected = (participant: RemoteParticipant) => {
		setRemoteParticipants((prevParticipants) =>
			prevParticipants.filter((p) => p.sid !== participant.sid),
		);
		toast.info(`${participant.identity} has left the room.`);
	};

	const connectToRoom = async (token: string) => {
		try {
			const tracks = await createLocalTracks({ video: true });
			setLocalTrack(tracks[0] as LocalVideoTrack);

			const room = await connect(token, {
				name: roomName,
				tracks: [tracks[0]],
			});

			setRoom(room);

			room.on('participantConnected', (participant) => {
				setRemoteParticipants((prev) => [...prev, participant]);
				toast(`${participant.identity} has joined the room`);
			});

			room.on('participantDisconnected', (participant) => {
				setRemoteParticipants((prev) => prev.filter((p) => p.sid !== participant.sid));
			});

			room.on('disconnected', () => {
				setLocalTrack(undefined);
				setRemoteParticipants([]);
				setRoom(undefined);
			});
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		createRoomToken(identity, roomName).then((res) => {
			const token = res.data.token;
			connectToRoom(token);
		});
		return () => {
			room?.disconnect();
		};
	}, [roomName]);

	// Re-render if participants change

	React.useEffect(() => {
		room?.participants.forEach((participant) => {
			participant.on('trackSubscribed', (track) => {
				if (track.kind === 'video') {
					setRemoteParticipants((prev) => [...prev, participant]);
				}
			});
		});
	}, [room]);

	React.useEffect(() => {
		room?.participants.forEach((participant) => {
			participant.on('trackUnsubscribed', (track) => {
				if (track.kind === 'video') {
					participantDisconnected(participant);
				}
			});
		});
	}, [remoteParticipants]);

	useEffect(() => {
		if (localTrack && localVideoRef.current) {
			localTrack.attach(localVideoRef.current);
			localVideoRef.current.muted = true;
		}
	}, [localTrack]);

	useEffect(() => {
		const remoteTracks = remoteParticipants.flatMap((participant) =>
			Array.from(participant.videoTracks.values()),
		);
		remoteTracks.forEach((track, index) => {
			if (remoteVideoRefs.current[index] && track.track) {
				track.track.attach(remoteVideoRefs.current[index]);
			}
		});

		const remoteIdentities = remoteParticipants.map((p) => p.identity);
		if (remoteIdentities.length > new Set(remoteIdentities).size) {
			setWarning('Warning: Duplicate identity detected.');
		} else {
			setWarning('');
		}
	}, [remoteParticipants]);

	return (
		<div>
			<h2>Local</h2>
			<video ref={localVideoRef} autoPlay={true} width="320" height="240" />
			{remoteParticipants.map((participant, index) => {
				const remoteTracks = Array.from(participant.videoTracks.values());
				return (
					<div key={participant.sid}>
						<h2>Remote {index + 1}</h2>
						{remoteTracks.map((track, i) => (
							<video
								key={i}
								ref={(el) => (remoteVideoRefs.current[index * 10 + i] = el!)}
								autoPlay={true}
								width="320"
								height="240"
							/>
						))}
					</div>
				);
			})}
			<p>{warning}</p>
		</div>
	);
};

MeetPage.getInitialProps = async (ctx: NextPageContext): Promise<MeetPageProps> => {
	const identity = (ctx.query?.identity as string) || '';

	const roomName = (ctx.query?.roomName as string) || 'ASD-ZCD-ASD';

	return { roomName, identity };
};

export default MeetPage;
