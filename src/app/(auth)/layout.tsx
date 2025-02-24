

 const AuthLayout = ({ children }: { children: React.ReactNode }) => {
   return (
      <>
  
      <div className="flex flex-col items-center justify-between px-4 py-6 mx-auto h-screen">
        <div className="w-full bg-white rounded-lg shadow mt-0 max-w-xl">
          {children}
        </div>
       </div>
       </>
    );
}

export default AuthLayout