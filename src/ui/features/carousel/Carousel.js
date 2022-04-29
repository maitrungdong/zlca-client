import React from 'react'

import inappWlcScreen0 from 'ui/assets/images/inapp-welcome-screen-0.jpg'
import inappWlcScreen1 from 'ui/assets/images/inapp-welcome-screen-01.jpg'
import inappWlcScreen2 from 'ui/assets/images/inapp-welcome-screen-02.jpg'
import inappWlcScreen3 from 'ui/assets/images/inapp-welcome-screen-03.png'
import inappWlcScreen4 from 'ui/assets/images/inapp-welcome-screen-04.jpg'
import quickMsgOnboard from 'ui/assets/images/quick-message-onboard.png'
import vanishOnBoard from 'ui/assets/images/vanish_onboard.png'

import { Navigation, Pagination, Autoplay } from 'swiper'

import { Swiper, SwiperSlide } from 'swiper/react'

import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const slideContents = [
  {
    image: quickMsgOnboard,
    title: 'Nhắn tin nhiều hơn, soạn ít hơn',
    description:
      'Sử dụng Tin Nhắn Nhanh để lưu sẵn các tin nhắn thường dùng và gửi nhanh trong hội thoại bất kỳ.',
  },
  {
    image: vanishOnBoard,
    title: 'Tin nhắn tự xoá',
    description:
      'Từ giờ tin nhắn đã có thể tự động tự xóa sau khoảng thời gian nhất định.',
  },
  {
    image: inappWlcScreen0,
    title: 'Gọi nhóm và làm việc hiệu quả với Zalo Group Call',
    description: 'Trao đổi công việc mọi lúc mọi nơi.',
  },
  {
    image: inappWlcScreen4,
    title: 'Trải nghiệm xuyên suốt',
    description:
      'Kết nối và giải quyết công việc trên mọi thiết bị với dữ liệu luôn được đồng bộ',
  },
  {
    image: inappWlcScreen3,
    title: 'Gửi File nặng?',
    description: 'Đã có Zalo PC "xử" hết.',
  },
  {
    image: inappWlcScreen2,
    title: 'Chat nhóm với đồng nghiệp',
    description: 'Tiện lợi hơn, nhờ các công cụ hỗ trợ chat trên máy tính.',
  },
  {
    image: inappWlcScreen1,
    title: 'Giải quyết công việc hiệu quả hơn, lên đến 40%',
    description: 'Với Zalo PC.',
  },
]

const Carousel = () => {
  return (
    <div className="slide-show">
      <div className="slide-show__container">
        <div className="slide-header">
          <div className="slide-header__title">
            Chào mừng đến với <span>Zalu Chat!</span>
          </div>
          <p className="slide-header__desc">
            Khám phá những tiện ích hỗ trợ làm việc và trò chuyện cùng người
            thân, bạn bè được tối ưu hoá cho máy tính của bạn.
          </p>
        </div>

        <div className="hello">
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            autoplay={{ delay: 2000 }}
          >
            {slideContents.map((slide, idx) => {
              return (
                <SwiperSlide key={idx} className="slide">
                  <div className="slide__img">
                    <img src={slide.image} alt={slide.title} />
                  </div>
                  <p className="slide__title">{slide.title}</p>
                  <span className="slide__desc">{slide.description}</span>
                </SwiperSlide>
              )
            })}
          </Swiper>
        </div>
      </div>
    </div>
  )
}

export default Carousel
