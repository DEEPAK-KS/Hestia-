import React, { useState } from 'react'
import { HiMagnifyingGlass, HiMiniXMark } from 'react-icons/hi2';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchProductsByFilters, setFilters } from '../../redux/slice/productsSlice'

const SearchBar = () => {
const [searchTerm,setSearchTerm] = useState("");
const [isOpen, setisOpen] = useState(false);

const handleSearchToggle = () => {
    setisOpen(!isOpen)
}

const handleSearch = (e) =>{
    e.preventDefault();
    dispatch(setFilters({search: searchTerm}))
    dispatch(fetchProductsByFilters({search: searchTerm}))
    navigate(`/collections/all?search=${searchTerm}`)
    setisOpen(false);
};

const dispatch = useDispatch();
const navigate = useNavigate();

  return (
    <div className={`flex items-center justify-center w-full transition-all duration-300 ${isOpen?"absolute top-0 left-0 w-full bg-white h-24 z-50" : "w-auto"}`}>
        {isOpen ? ( <form onSubmit={handleSearch} className='relative flex items-center justify-center w-full'>
            <div className='relative w-1/2'>
                <input className='bg-gray-100 px-4 py-2 pl-2 pr-2 rounded-lg focus:outline-none w-full placeholder:text-gray-700' type="text" placeholder='Serach' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}/>
            {/* Search Button */}
            <button type='submit' className='absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800'>
                <HiMagnifyingGlass className='h-6 w-6'/>
            </button>
            </div>
            {/* Close Button */}
            <button typr='button' className='absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800' onClick={handleSearchToggle}>
                <HiMiniXMark className='h-6 w-6 '/>
            </button>
        </form> ) : (
            <button className='-bottom-0.5' onClick={handleSearchToggle}>
                <HiMagnifyingGlass className='h-6 w-6'/>
            </button>
        )}
    </div>
  )
}

export default SearchBar