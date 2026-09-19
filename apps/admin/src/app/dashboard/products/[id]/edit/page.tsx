export default async function EditProduct({params}:{params:Promise<{id:string}>}){const {id}=await params;return <div className="card"><h1>Edit product {id}</h1></div>}
