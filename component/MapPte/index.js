import dynamic from "next/dynamic";

const MapPteWithNoSSR = dynamic(() => import("./MapPte"), {
  ssr: false,
});

export default MapPteWithNoSSR;
