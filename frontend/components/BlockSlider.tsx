/* eslint-disable react/no-array-index-key */
import { arrFraze } from '../utils/constants/start-page-bonus';
import CaruselMy from './Carusel';
import icon from '../public/assets/img/ok.png';

function BlockSlider() {
  return (
    <section className="pt-[65px] pb-[80px] px-[3%]  w-full bg-indigo-50">
      <h3 className="font-bold text-3xl antialiased mb-[65px] font-sans text-center text-blue-950">
        Жизнь дана на добрые дела...
      </h3>
      <div className="flex  w-full flex-wrap justify-evenly items-center gap-5">
        <div className="w-[40%]">
          <CaruselMy />
        </div>
        <div>
          <h5 className="font-bold text-xl antialiased mb-[25px] font-sans text-start text-blue-950">
            Открой для себя наши возможности:
          </h5>
          <ul className="block">
            {arrFraze.map((item, ind) => (
              <li key={ind} className="block-slider-text">
                <img className="w-6 h-6 mr-2" src={icon.src} alt="icon" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
export default BlockSlider;
