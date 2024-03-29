import './Posts.scss'
import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

const Post = (props) => {
    const {articleTitle, content, id} = props;
    return <div className="post-section">
        <Link to={`/posts/${id}`}>
            <div className="post-background">
                <div className="post-warpper">
                    <div className="post-image">
                        <img src="https://static.wikia.nocookie.net/minecraft-earth/images/9/90/Diamond_block_0.png/revision/latest?cb=20191115051338" alt="test"/>
                    </div>
                    <div className="post-content">
                        <div className="post-title">{articleTitle}</div>
                        <div className="post-desc">
                            <p>{content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
}
export const Posts = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchAllData = async () => {
            try {
                const response = await fetch('http://localhost:3800/articles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const jsonData = await response.json();
                console.log(jsonData.data)
                setData(jsonData.data)
            } catch (error) {
                console.log(error)
            }
        };
        fetchAllData();
    }, []);
    return <>
        <div className="posts">
            <div className="page-title">Posts</div>
            {data?data.map((postData,index) =>{
                return <Post articleTitle={postData.title} content={postData.content} id={postData.id} key={index}/>
            }):"loading"}
        </div>
    </>
}
