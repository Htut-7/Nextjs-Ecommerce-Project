"use client";

import React, { useEffect, useState } from 'react'
import Input from './Input'
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';
import { useDebounce } from 'use-debounce';

function SearchInput() {

    const searchParams=useSearchParams();
    const [search,setSearch]=useState(searchParams.get('search') || "");
    const router=useRouter();
    const [searchDebounce]=useDebounce(search,300);

    useEffect(()=>{
        const currentQuery=queryString.parse(window.location.search);
        const updateQuery={...currentQuery, search: searchDebounce}

        const url=queryString.stringifyUrl({
            url: window.location.pathname,
            query: updateQuery,
        },{skipEmptyString: true, skipNull: true}
        );
        router.push(url);
    },[router,searchDebounce])

  return (
    <div>
      <Input type='text' placeholder='Search Products...' 
        onChange={(e)=>setSearch(e.target.value)} value={search}
        className='h-12 rounded-xl border-slate-200 pl-12 pr-4 shadow-none focus:border-black focus:ring-2 focus:ring-slate-200'
      />
    </div>
  )
}

export default SearchInput
