import * as React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';

interface IntroduceProps {}

const Introduce: React.FunctionComponent<IntroduceProps> = () => {
	return (
		<>
			<div className="w-full h-auto mt-10 flex justify-center">
				<div className="w-full h-auto max-w-container flex justify-center">
					<div className="flex gap-5 flex-col text-center justify-center items-center">
						<h1 className="">Lý do bạn nên chọn PSYCH</h1>
						<p className="text-lg">
							Mang đến cho bạn nụ cười tự tin, khỏe đẹp là mục tiêu của chúng tôi hướng đến. Hãy lựa
							chọn nha khoa Smile Center để hoàn thiện nụ cười rạng rỡ của bạn vì chúng tôi cam kết
							với bạn rằng:
						</p>
						<div className="w-full justify-around flex gap-4">
							<div className="w-full flex  items-center">
								<LazyLoadImage
									src="/assets/images/Intro/intro.png"
									className="w-full h-full max-w-[178px] max-h-[178px]"
								/>
								<h1 className="uppercase text-xl">đội ngũ chuyên nghiệp</h1>
							</div>
							<div className="w-full flex  items-center">
								<LazyLoadImage
									src="/assets/images/Intro/intro.png"
									className="w-full h-full max-w-[178px] max-h-[178px]"
								/>
								<h1 className="uppercase text-xl">Hiệu Quả VƯỢT TRỘI</h1>
							</div>
							<div className="w-full flex  items-center">
								<LazyLoadImage
									src="/assets/images/Intro/intro.png"
									className="w-full h-full max-w-[178px] max-h-[178px]"
								/>
								<h1 className="uppercase text-xl">bảo mật thông tin</h1>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Introduce;
