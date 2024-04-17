import sadcat from '../assets/sadcat.png'

const NotFound = () => {
    return (<div className="flex flex-col w-full h-full items-center justify-center">
        <div className='mb-10'>
            <img src={sadcat} width={200} h={200} className='p-4 ml-2' alt={'Ooops...'}/>
            <h1 className='text-xl text-indingo-800'>Oops... Nothing here</h1>
            </div>
        </div>);
}

export default NotFound;