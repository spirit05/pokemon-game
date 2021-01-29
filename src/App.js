import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Layout from "./components/Layout/Layout";

import bg2 from './img/bg2.jpg';

const App = () => {
  const title = "This is title";
  const descr = "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam ex ducimus asperiores ipsum rem voluptatibus a nesciunt?";

  return (
    <>
      <Header 
        title="This is title header"
        descr="This is Description Header!"
      />
      <Layout 
        id="1"
        title={title}
        descr={descr}
        urlBg={bg2}
      />
      <Layout 
        id="2"
        title={title}
        descr={descr}
        colorBg="#e4c90a"
      />
      <Layout 
        id="3"
        title={title}
        descr={descr}
        urlBg={bg2}
      />
      <Footer />
    </>
  )
}

export default App;
