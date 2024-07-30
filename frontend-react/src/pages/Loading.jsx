import { Spinner } from '@nextui-org/react'

function Loading() {
  return (
    <div className='absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center bg-gray-800/30 z-50'>
        <Spinner color="secondary" size="lg" />
    </div>
  )
}

export default Loading