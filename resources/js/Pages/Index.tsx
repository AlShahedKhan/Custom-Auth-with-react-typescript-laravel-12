export default function Index({ posts }) {
    console.log('Posts:', posts); // Log posts to the console
    return (
        <>
            <h1>My Super Blog</h1>
            <hr/>
            { posts && posts.map( (item) => (
                <div key={item.id}>
                    <h2>{item.title}</h2>
                    <small>{item.date}</small> {/* Show the date here */}
                    <p>{item.body}</p>
                </div>
            )) }
        </>
    )
}
