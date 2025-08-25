import { Navbar} from "flowbite-react"
export default function myNavbar() {
    return (
        <Navbar className="flex justify-between items-center gap-x-6">
       <div className="flex items-center px-32">
         <a href="#">
          <img src="./src/assets/icon (1).svg" className="" alt="" />
         </a>
        </div>
        <ul className="list-none flex items-center justify-between gap-x-6 px-36">
          <li>
            <a href="#" className="font-HORIZONTAL font-bold py-2 px-3 text-[#A8AEBF] hover:text-purple-500">Movies</a>
          </li>
          <li>
            <a href="#" className="font-HORIZONTAL font-bold py-2 px-3 text-[#A8AEBF] hover:text-purple-500">TV Shows</a>
          </li>
          <li>
            <a href="#" className="font-HORIZONTAL font-bold py-2 px-3 text-[#A8AEBF] hover:text-purple-500">Suggest me</a>
          </li>
        </ul>
    </Navbar>
    );
}