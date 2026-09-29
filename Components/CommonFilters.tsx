"use client";

import React from 'react';
import queryString from 'query-string';
import { useRouter, useSearchParams } from 'next/navigation';

interface Filters{
    name: string,
    value: string,
}

function CommonFilters({filter,defaultFilter}: {filter: Filters[], defaultFilter: string}) {
    
    const router=useRouter();
    const searchParams=useSearchParams();
    const currentFilter=searchParams.get("filter") || defaultFilter || "";

    const handleChange=(e: React.ChangeEvent<HTMLSelectElement>)=>{
        const selectedValue=e.target.value;
        const currentQuery=queryString.parse(window.location.search);
                const updateQuery={...currentQuery, filter: selectedValue || ""};
        
                const url=queryString.stringifyUrl({
                    url: window.location.pathname,
                    query: updateQuery
                },{skipEmptyString: true, skipNull: true})
        
                router.push(url);
    }

  return (
    <div>
        <select 
            value={currentFilter}
        onChange={handleChange}
        className='rounded-xl text-gray-300 px-4 py-2 bg-transparent border-none outline-none cursor-pointer hover: bg-blue-50'>
            {filter.map(f=>(
                <option key={f?.value} value={f.value}>{f.name}</option>
            ))}
        </select>
    </div>
  )
}

export default CommonFilters