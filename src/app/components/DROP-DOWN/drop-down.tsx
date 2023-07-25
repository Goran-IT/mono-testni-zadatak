import React, { useState } from 'react'

export type OptionType = {
    value: string;
    label:string;
  };
  
type DropDownProps={
    onChange:(option:OptionType) => void;
    defaultValue?: OptionType;
    options:OptionType[];
    placeholder?:string;
}

////
const DropDown = ({onChange,defaultValue,options,placeholder}:DropDownProps) => {
    const [selector,setSelector]=useState<boolean>(false)
    const [activeOption, setActiveOption] = useState<OptionType | null>(
        defaultValue ? defaultValue : null
      );

    const openSelector=()=>{
        setSelector(!selector)
    }

  return (
    <div className='selector' >
       <h2 onClick={()=>openSelector()}>{placeholder}: {activeOption ? activeOption.value:""}</h2>
       <div className='selector__dropdown'>
        {selector && (<>
            {options.map((option)=>{
                return <div
                onClick={()=>{
                    onChange(option);
                    openSelector();
                    setActiveOption(option);
                }}
                className='selector__option'
                key={option.value}
                >{option.value}</div>
            })}
        </>)}
       </div>

    </div>
  )
}

export default DropDown