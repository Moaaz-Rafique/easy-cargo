import Booking from './Components/Booking';
import BookingDeets from './Components/BookingDeets';
import Navbar from './Components/Navbar';
//import './App.css'
import { Routes, Route } from "react-router-dom"; //to connect our app with the browser url
import Bill from './Components/Bill';
import BookType from './Components/BookType';
import Customer from './Components/Customer';
import Login from './Components/Reg';
import RouteF from './Components/Route';
import Vendor from './Components/Vendor';
import ShowBooking from './Components/Edits/ShowBooking';
import UpdateBooking from './Components/Edits/UpdateBooking';
import ShowBookingDeets from './Components/Edits/ShowBookingDeets';
import UpdateDetails from './Components/Edits/UpdateDetails';
import ShowBill from './Components/Edits/ShowBill';
import UpdateBill from './Components/Edits/UpdateBill';
import ShowBookingType from './Components/Edits/ShowBookingType';
import UpdateBookingType from './Components/Edits/UpdateBookingType';
import ShowVendor from './Components/Edits/ShowVendor';
import UpdateVendor from './Components/Edits/UpdateVendor';
import ShowCustomer from './Components/Edits/ShowCustomer';
import UpdateCustomer from './Components/Edits/UpdateCustomer';
import ShowRoute from './Components/Edits/ShowRoute';
import UpdateRoute from './Components/Edits/UpdateRoute';
// import Home from './Components/pages/Home';
import HeroSection from './Components/pages/HeroSection';
//  import HeroSection from './Components/pages/HeroSection';
 import Cards from './Components/pages/Cards';
 import About from './Components/pages/About';
 import Services from './Components/pages/Services';

//  Uploading Pages
import UploadExcelFile from './Components/UploadExcelFile';


function App() {
  
  return <>
  
 <Navbar/>
 
  <Routes>
    
  {/* <Route path='/' element={<Home/>}/> */}
  <Route path='/' element={<HeroSection/>}/>
  <Route path='/about' element={<About/>}/>
  <Route path='/services' element={<Services/>}/>
  <Route path='/cc' element={<Cards/>}/>
  
    <Route path='/Booking' element={<Booking/>}/>
    <Route path='/updateBooking' element={<UpdateBooking/>}/>
    <Route path='/showBooking' element={<ShowBooking/>}/>

    <Route path='/BookingDetails' element={<BookingDeets/>}/>
    <Route path='/editDeets' element={<ShowBookingDeets/>}/>
    <Route path='/updateDetails' element={<UpdateDetails/>}/>

    <Route path='/Bill' element={<Bill/>} />
    <Route path='/showBill' element={<ShowBill/>} />
    <Route path='/updateBill' element={<UpdateBill/>} />

    <Route path='/BType' element={<BookType/>} />
    <Route path='/showType' element={<ShowBookingType/>} />
    <Route path='/updateType' element={<UpdateBookingType/>} />

    <Route path='/cust' element={<Customer/>}/>
    <Route path='/showCust' element={<ShowCustomer/>}/>
    <Route path='/updateCust' element={<UpdateCustomer/>}/>


    <Route path='/login' element={ <Login/>}/>

    <Route path='/route' element={<RouteF/>}/>
    <Route path='/showRoute' element={<ShowRoute/>}/>
    <Route path='/updateRoute' element={<UpdateRoute/>}/>

    <Route path='/vendor' element={<Vendor/>}/>
    <Route path='/showVendor' element={<ShowVendor/>}/>
    <Route path='/updateVendor' element={<UpdateVendor/>}/>

    {/* Upload File */}
    <Route path='/uploadExcelFile' element={<UploadExcelFile/>}/>
    

  </Routes> 
  {/* <Footer/> */}
  </>
}

export default App;
