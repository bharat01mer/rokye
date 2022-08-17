import React, { Suspense } from "react";
import Layout from "../src/components/layout";
import { Preloader} from "../src/components/resuable"

import dynamic from "next/dynamic";

const Home = dynamic(() => import("../src/components/Home/Home"), {
  suspense: true,
});

const Index = () => {
  return (
    <Suspense fallback={<Preloader />}>
      <Layout title={"Home"} description={"Homepage of Royke Realty"}>
        <Home />
      </Layout>
    </Suspense>
  );
};

export default Index;
