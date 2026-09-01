import React from 'react'

function DataRenderer({success,data,errorMessage,render}:{
    success: boolean,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    data: any [],
    errorMessage: string | undefined,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    render: (data: any[])=>React.ReactNode,
}) {

    if(!success){
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-red-200 bg-red-50 p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                    <svg className="h-8 w-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">Oops! Something went wrong</h3>
                <p className="text-sm text-gray-600">{errorMessage || "An unexpected error occurred. Please try again later."}</p>
            </div>
        )
    }

    if(!data || !data.length){
        return (
            <div className="flex flex-col items-center justify-center rounded-xl border border-gray-200 bg-white p-10 text-center shadow-sm">
                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                    <svg className="h-8 w-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                    </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">No Data Found</h3>
                <p className="text-sm text-gray-500">There is nothing to display here at the moment.</p>
            </div>
        )
    }

  return (
    <div>
      {render(data)};
    </div>
  )
}

export default DataRenderer
