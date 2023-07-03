import notFound from '../public/assets/img/notFound.png';

function NotFound(props: { title: string; text: string }) {
  const { title, text } = props;
  return (
    <div className="flex flex-col justify-center items-center gap-[30px] mt-[5%]">
      <img src={notFound.src} alt="not found" />
      <p className="text-[16px] font-bold text-blue-950 text-center">
        {title}
        <br />
        {text}
      </p>
    </div>
  );
}
export default NotFound;
