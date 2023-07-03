import SvgContact from './SvgContact';
import FormContact from './FormContact';

function BlockContact() {
  return (
    <section className="pt-[65px] flex flex-wrap pb-[80px] px-[3%]  w-full bg-gradient-to-r from-cyan-400 to-blue-700 justify-evenly">
      <SvgContact />
      <FormContact />
    </section>
  );
}
export default BlockContact;
