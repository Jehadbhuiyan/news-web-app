'use client';

import { authClient } from "@/lib/auth-clinet";
import Link from "next/link";
import React from "react";

const ButtonClick =  () => {
    
    const {data: session } = authClient.useSession();
    const user = session?.user;

    const logouthendel = async ()=>{
        await authClient.signOut();
    }
   
    return (
        <div className="flex gap-2">
            { user ? <><button onClick={logouthendel} className="btn btn-error">Log Out</button></> :  <><Link href={'/signin'}>
          <button className="btn">সাইন ইন</button>
        </Link><Link href={'/signup'}>
            <button className="btn bg-red-600 text-white">সাইন আপ</button>
          </Link></>}
        </div>
    );
};

export default ButtonClick;