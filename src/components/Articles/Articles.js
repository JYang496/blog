import './Articles.scss'
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

export const Articles = () => {
  const { articleId } = useParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchSingleData = async () => {
      try {
        const response = await fetch(`http://localhost:3800/articles/${articleId}`);
        if (!response.ok) {
          throw new Error('Fetch single data: network response was not ok');
        }
        const jsonData = await response.json();
        console.log(jsonData.data)
        setData(jsonData.data)
      } catch (error) {
        console.log(error)
      }
    };
    fetchSingleData();
  }, [articleId]);
  return <>
    <div className="page-title">{data?data.title:`loading title`}</div>
    <p className="content-meta">Feb 14, 2024</p>
    <article>
      {data?data.content:`loading content`}
    </article>
  </>
}
