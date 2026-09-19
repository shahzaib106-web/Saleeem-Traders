export default async function CustomerDetail({params}:{params:Promise<{id:string}>}){const {id}=await params;return <div className="card"><h1>Customer {id}</h1></div>}
