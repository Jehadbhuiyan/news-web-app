import MainNews from "./component/MainNews";
import CardPage from "./component/Cardpage";
import Mostread from "./component/Mostread";

export default async function Home() {
  const res = await fetch('https://news-api-v2.vercel.app/api/news/sections');
  const data = await res.json()
  const newss = data.data
  const section = newss[0].articles
  // console.log(section)
  const othersection = newss.slice(1)
  return (
    <div >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* First section (2 columns) */}
        <div className="col-span-2 rounded-lg">
          
          {/* এই Flex container টি ভেতরের ২টি div কে পাশাপাশি আনবে */}
          <div className="flex flex-col md:flex-row gap-4">
          {/* <MainNews news={section}></MainNews> */}
          </div>
          <MainNews news = {section}></MainNews>
          {othersection.map((othertitle)=>(
            <div className ='py-2 mt-2 mb-1.5'  key={othertitle.curationId}>
              <h3 className='text-2xl font-bold border-b-red-800 border-b-2 mb-4 m-2'>{othertitle.title}</h3>

              <div className= 'grid grid-cols-3 gap-2'>
                {othertitle.articles.map(news => <CardPage key={news.id} news ={news}/>)}
              </div>

            </div>
          ))}
        </div>

        {/* Second section (1 column) */}
        <div className="col-span-1 rounded-lg">
          {/* ডান পাশের কনটেন্ট */}
        <Mostread></Mostread>
        </div>

      </div>
    </div>
  );

}