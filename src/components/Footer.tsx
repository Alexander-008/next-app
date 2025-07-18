import React,{Fragment} from 'react'
import Link from 'next/link'
import {Title,NavList} from "@/lib/constants"
import { Separator } from '@radix-ui/react-separator'
async function Footer() {
  return (
    <div className='border-t mt-6'>
          <div className="container py-32 flex justify-between">
            <h2 className="text-2xl">
                <Link href="/">{Title}</Link>
            </h2>
            <div className="flex gap-10">
          {NavList.map((item, i) => (
            <Fragment key={item.title}>
              {i !== 0 && <Separator orientation="vertical" />}
              <div>
                <span>{item.title}</span>
                <ul className="m-4 space-y-3">
                  {item.list.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Fragment>
          ))}
        </div>
         </div>
    </div>
  )
}

export default Footer