import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import { GetUser } from "@/Components/lib/action/GetUser.action";
import UserCard from "./components/UserCard";


export default async function Page({searchParams}:{
  searchParams: Promise<{
    [key:string]:string
  }>
}) {

  //  const {data}=await api.products.getByName('Wireless Bluetooth Headphones');
  //  console.log(data);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const session=await auth();
  const{page,pageSize,filter,search}=await searchParams;


  const {success, data, message}=await GetUser({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || "",
    search: search || ""
  })

  const {user=[]}=data || {};

  return (
    <div>
      <div className="mx-auto mt-8 w-full max-w-4xl px-4">
        <div className="space-y-4">
            <DataRenderer success={success} errorMessage={message} data={user} 
             render={(user)=><div className="grid grid-cols-4">
                 {user.map((users) => <UserCard name={users.name?.trim() || "Unknown User"} image={users.image ?? ""} id={users._id.toString()} key={users._id.toString()} />)}
             </div>}/>
        </div>
       </div>

    </div>
    

  );
}