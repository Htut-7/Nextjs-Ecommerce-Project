import { auth } from "@/auth";
import Hero from "@/Components/Hero";


export default async function Page() {

  //  const {data}=await api.products.getByName('Wireless Bluetooth Headphones');
  //  console.log(data);
  const session=await auth();
  console.log(session);

  return (
    <>
     
      <Hero/>
    </>
    

  );
}