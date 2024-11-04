import CategoryList from "./ListCategory";
import FormCategory from "./FormCategory";

function Home() {
    return (
        <>
            <h1 className='text-soft-red text-2xl'>Home Page</h1>
            {/* <TableBase/> */}
            <CategoryList/>
            <FormCategory/>
        </>
    )
}

export default Home;