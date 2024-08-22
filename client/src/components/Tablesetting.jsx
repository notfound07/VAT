import React from 'react'
import { useParams } from 'react-router-dom';
import { tableset } from './Restraunts';

export default function Tablesetting() {
    const params = useParams();
  const bname = params.bname;
  const branches = tableset.filter(branch => branch.bname === bname);
  return (
    <div>
        {branches.map((item,index)=>
        {
            return(
                <div className='container-desc' key={index}>
                    {item.bname}
                </div>
            )
        })}
        </div>
  )
}
