import { useEffect } from 'react';
import BlockSlider from '../components/BlockSlider';
import BlockContact from '../components/BlockContact';
import BlockHello from '../components/BlockHello';
import Layout from '../components/Layout';

function IndexPage() {
  useEffect(() => {
    const initTE7 = async () => {
      const { initTE } = await import('tw-elements');
      const { Carousel } = await import('tw-elements');
      initTE({ Carousel });
    };
    initTE7();
  }, []);
  return (
    <Layout title="Книга добрых дел">
      <main>
        <BlockHello />
        <BlockSlider />
        <BlockContact />
      </main>
    </Layout>
  );
}

export default IndexPage;
