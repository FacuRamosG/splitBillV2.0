export const SelectBar = ({integrants}) => {
    return (       

    <form className="">
    <label htmlFor="countries" className="text-sm font-medium text-gray-900 dark:text-white">Select an integrant</label>
    <select id="countries" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        {integrants.map((integrant, index) => (
            <option key={index} value={integrant}>{integrant}</option>
        ))}
    </select>
    </form>


    )
}