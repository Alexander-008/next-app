import React from 'react'
import { productAction, productsAction } from "@/actions/products"
import Image from "next/image"
import AddCart from "@/components/AddCart"

//在构建时生成静态路径参数,用于 Next.js 的静态生成(SSG)
//动态路由生成静态参数
export async function generateStaticParams() {
  const result = await productsAction()
  return result.data.map(product => ({
    id: product.id + ''
  }))
}

export default async function Page({ params }: { params: Promise<{id: string}> }) {
    //获取动态参数id
     const {id}=await params;
    //  console.log(id)
    const res = await productAction(Number(id))
    const product = res.data
  return (
    <div className="container flex py-6">
      <div className="w-64">
        <h2 className="font-sans text-3xl leading-10 font-bold my-8">{product.name}</h2>
        <p className="leading-10">{product.description}</p>
      </div>
      <div className="h-[500px] flex-1 mx-10 bg-slate-50 p-4 rounded-lg shadow-md relative">
        <Image src={product.image} alt={product.name} fill priority sizes="300" style={{objectFit: 'cover'}} />
      </div>
      <AddCart product={product} />
    </div>
  )
}
