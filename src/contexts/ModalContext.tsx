import * as React from 'react';

export interface IModalItem {
	value: any;
	priority: number;
	isOpen: boolean;
}

export interface IModalContext {
	modal: Record<string, IModalItem>;
	handleModal: (key: string, value: any) => void;
	handleOpenModal: (key: string) => void;
	handleCloseModal: (key: string) => void;
	handleDestroy: () => void;
}

export const ModalContext = React.createContext<IModalContext>({
	modal: {},
	handleModal: () => {},
	handleOpenModal: () => {},
	handleCloseModal: () => {},
	handleDestroy: () => {},
});

interface ModalProviderProps extends React.PropsWithChildren {}

export const ModalProvider: React.FunctionComponent<ModalProviderProps> = ({ children }) => {
	const [modal, setModal] = React.useState<Record<string, IModalItem>>({});

	const handleModal = (key: string, value: any) => {
		setModal((prev) => ({
			...prev,
			[key]: {
				priority: Object.keys(prev).length + 1,
				value,
				isOpen: false,
			},
		}));
	};

	const handleOpenModal = (key: string) => {
		setModal((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				isOpen: true,
			},
		}));
	};

	const handleCloseModal = (key: string) => {
		setModal((prev) => ({
			...prev,
			[key]: {
				...prev[key],
				isOpen: false,
			},
		}));
	};

	const handleDestroy = () => {
		setModal({});
	};

	return (
		<ModalContext.Provider
			value={{
				modal,
				handleModal,
				handleOpenModal,
				handleCloseModal,
				handleDestroy,
			}}
		>
			<div className="relative z-0">{children}</div>

			{Object.keys(modal).map((key, index) => {
				const { value, isOpen, priority } = modal[key];

				if (!isOpen) {
					return null;
				}

				return (
					<div
						className={`fixed w-full h-screen inset-0 z-[${10 + priority}]`}
						key={`modeal-${key}-${index}`}
					>
						<div className="relative w-full h-full ">
							<div className={`h-full w-full absolute inset-0 `} key={key}>
								{value}
							</div>
						</div>
					</div>
				);
			})}
		</ModalContext.Provider>
	);
};

export const useModalContext = () => React.useContext(ModalContext);
