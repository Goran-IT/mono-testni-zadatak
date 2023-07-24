import React, { useState } from 'react'

export type OptionType = {
    value: string;
  };
  
type DropDownProps={
    onChange:(option:OptionType) => void;
    defaultValue?: OptionType;
    options:OptionType[];
}

////
const DropDown = ({onChange,defaultValue,options}:DropDownProps) => {
    const [selector,setSelector]=useState<boolean>(false)
    const [activeOption, setActiveOption] = useState<OptionType | null>(
        defaultValue ? defaultValue : null
      );

    const openSelector=()=>{
        setSelector(!selector)
    }

  return (
    <div className='selector' >
       <h2 onClick={()=>openSelector()}>Show: {activeOption ? activeOption.value:"4"}</h2>
       <div className='selector-dropdown'>
        {selector && (<>
            {options.map((option)=>{
                return <div
                onClick={()=>{
                    onChange(option);
                    openSelector();
                    setActiveOption(option);
                }}
                className='selector-option'
                key={option.value}
                >{option.value}</div>
            })}
        </>)}
       </div>

    </div>
  )
}

export default DropDown