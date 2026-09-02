import { auth } from "@/auth";
import DataRenderer from "@/Components/DataRenderer";
import { GetTags } from "@/Components/lib/action/GetTags.action";
import TagInfoCard from "@/Components/TagInfoCard";


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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {success, data, message, detail}=await GetTags({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    filter: filter || "",
    search: search || ""
  })

  const {tags=[]}=data || {};

  return (
    <div>
      <div className="mx-auto mt-8 w-full max-w-4xl px-4">
        <div className="space-y-4">
            <DataRenderer success={success} errorMessage={message} data={tags} 
             render={(tags)=><div className="grid grid-cols-4">
                 {tags.map((tag) => <TagInfoCard name={tag.name} count={tag.messages} id={tag._id.toString()} key={tag._id.toString()} />)}
             </div>}/>
        </div>
       </div>

    </div>
    

  );
}