import React from 'react'

function Input_box({ label, placeholder, onChange }) {
    return (
        <div>
            <div className='text-sm font-medium text-left py-2'>
                {label}
            </div>
            <input onChange={onChange} type="text" placeholder={placeholder} className='w-full p-2 border rounded boder-slate-200' />
        </div>
    )
}

export default Input_box