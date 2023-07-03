/* eslint-disable react/no-array-index-key */
import { useRouter } from 'next/router';
import { AUTH } from '../utils/constants/path';
import { arrSlideData } from '../utils/constants/start-page-bonus';

function BlockHello() {
  const router = useRouter();
  return (
    <section className="fone-block-hello pt-[150px] pb-[70px] flex flex-col w-full justify-center  items-center">
      <h2 className=" title-start ml-[4%] font-bold text-5xl antialiased font-sans text-blue-950">
        Сделай этот мир добрее
      </h2>
      <p className=" text-bold text-2xl  text-gray-800  text-center  mt-[20px] mb-[20px]">
        С нами - это очень просто
      </p>
      <div className="max-w-[80%]   my-[15px]">
        <div className="  flex items-start flex-wrap py-[20px]">
          {arrSlideData.map((item, idx) => (
            <div className="ag_courses_item" key={idx}>
              <div className=" ag_courses_item_link block  px-[40px] py-[35px] bg-violet-950 relative">
                <div className="ag_courses_item_bg" />
                <p className="ag_courses_item_title">{item.title}</p>
                <p className="ag_courses_item_date_box">
                  {item.text}
                  <span className="ag_courses_item_date">{item.item}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <button
        className="btn-start"
        onClick={() => router.push(AUTH)}
        type="button"
      >
        Регистрация / Вход
      </button>
    </section>
  );
}
export default BlockHello;
