const footer = ({props}) =>{
    return ( <div className='fixed-bottom border bg-light border-success'>
       <div className='row'>
         <div className='col-sm '>
           <div className='appheadercitytext'>
             <a
               href={
                 "https://www.google.com/search?q=meaning: " +
                 props.Place_name
               }
               title={"Search google for " + props.Place_name}
               target='_blank' rel="noreferrer"
             >
               Google -  {props.Place_name ? props.Place_name : "No place"}{" "}
             </a>
           </div>
         </div>
         <div className='col-sm'>
           <a
             className='appheadercitytext'
             href='https://nzhistory.govt.nz/culture/maori-language-week/1000-maori-place-names'
           >
             1000 Maori Place Names
           </a>
         </div>
       </div>
     </div>
   );
 };
 
 export default footer;