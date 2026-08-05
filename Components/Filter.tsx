"use client";

import React, { useState } from 'react'
import Button from './Button'
import { useRouter, useSearchParams } from 'next/navigation';
import queryString from 'query-string';


function Filter() {

    const searchParams =useSearchParams();
    const router=useRouter();
    const [filter,setFilter]=useState(searchParams.get("filter") || "");

    const handleFilter=(filterType:string)=>{
        if(filterType===filter){
            setFilter('');
        }else{
            setFilter(filterType);
        }

        const currentQuery=queryString.parse(window.location.search);
        const updateQuery={...currentQuery, filter: filterType===filter ? "" : filterType};

        const url=queryString.stringifyUrl({
            url: window.location.pathname,
            query: updateQuery
        },{skipEmptyString: true, skipNull: true})

        router.push(url);
    }
    
  return (
   <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
  <Button
    onClick={() => handleFilter("men")}
    variant={filter === "men" ? "primary" : "secondary"}
  >
    Men
  </Button>

  <Button
    onClick={() => handleFilter("women")}
    variant={filter === "women" ? "primary" : "secondary"}
  >
    Women
  </Button>

  <Button
    onClick={() => handleFilter("shoe")}
    variant={filter === "shoe" ? "primary" : "secondary"}
  >
    Shoes
  </Button>
</div>
  )
}

export default Filter
