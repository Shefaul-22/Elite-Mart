import Banner from "@/components/home/Banner";


import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";


export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="space-y-20">

       {/* <Test></Test>
      <p>{JSON.stringify(session)}</p> */}

      <section>
        <Banner></Banner>
      </section>

      
    </div>
  );
}
