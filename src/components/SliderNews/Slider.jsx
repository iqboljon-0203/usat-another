// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'
import './Slider.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/pagination'
import { Link } from 'react-router-dom'
// import required modules
import { Navigation } from 'swiper/modules';
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SwiperCore from 'swiper';
import { Pagination } from 'swiper/modules';
SwiperCore.use([Pagination]);
import {fetchData} from '../../features/allNewsSlice';
export default function App({child,paginationRef}) {
    
    const languageNew = useSelector((state) => state.acceptLanguage.language);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchData({
            language:languageNew,
            slug:child?child:"",
        }))
    }, [dispatch,languageNew,child])
    const { data } = useSelector((state) => state.allNews)
    return (
        <>
            <Swiper
                 pagination={{
          el: paginationRef.current, // Bu yerda pagination elementini o'zimiz belgilaymiz
          clickable: true,
        }}
                slidesPerView={1}
                spaceBetween={20}
                navigation={{
                    prevEl: '.news_button_left',
                    nextEl: '.news_button_right',
                }}
                 onSwiper={(swiper) => {
          swiper.params.pagination.el = paginationRef.current; // Dynamic ravishda pagination elementini o'rnatamiz
          swiper.pagination.init();
          swiper.pagination.render();
          swiper.pagination.update();
        }}
                modules={[Navigation,Pagination]}
                className="mySwiper"
                style={{
                    display: 'flex',
                    alignItems: 'stretch',
                    justifyContent: 'space-between',
                }}
                breakpoints={{
                    1100: {
                        slidesPerView: 3,
                        spaceBetween: 20,
                    },
                    // Qo'shimcha breakpointlar
                    645: {
                        slidesPerView: 2,
                        spaceBetween: 20,
                    },
                    640: {
                        slidesPerView: 1,
                        spaceBetween: 20,
                    },
                }}
            >
                {data &&
                    data.map((item) => (
                        
                        <SwiperSlide style={{height:"auto"}} key={item.id}>
                            <li className="slider_news_item">
                                <div className='content'>
                                    <div style={{paddingTop:"56.25%"}} className="relative w-full mb-5">
                                    <img
                                        loading="lazy"
                                        src={item.photo}
                                        className='absolute top-0 left-0 rounded-xl w-full h-full object-contain'
                                        alt="News info image"
                                    ></img>
                                </div>
                                <div className="slider_news_info">
                                    <Link
                                        
                                        to={`/news/${item.category&&item.category?.slug}/${item.slug}`}
                                    >
                                        <h1 className="slider_news_info_title">
                                            {item.title}
                                        </h1>
                                    </Link>
                                    <p className="slider_news_info_text">
                                        {item.summary&&item?.summary
                                            .split(' ')
                                            .slice(0, 25)
                                            .join(' ') + '...'}
                                    </p>

                                </div>
                                </div>
                                          
                            </li>
                        </SwiperSlide>
                    ))}
            </Swiper>
        </>
    )
}
