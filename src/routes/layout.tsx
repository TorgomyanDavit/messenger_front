
function DefaultLayout({children}:{ children: React.ReactElement }) {
  
  return (
    <div className='outlet_container'>
      {children} 
    </div>
  )
}

export default DefaultLayout
